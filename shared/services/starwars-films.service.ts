import { DynamoDBDocumentClient, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { Film, FilmESP } from "../entities/film";
import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from 'uuid';
import { DBConnectionService } from "./db-connection.service";


export class StarWarsFilmService {
    private static _instance: StarWarsFilmService;
    public static get instance(): StarWarsFilmService {
        if (!StarWarsFilmService._instance) {
            StarWarsFilmService._instance = new StarWarsFilmService();
        }
        return StarWarsFilmService._instance;
    }
    private STAR_WARS_API_URL: string = process.env.STAR_WARS_API_URL || '';
    private FILMS_TABLE = process.env.FILMS_TABLE || 'FilmESPTable';
    private db: DynamoDBDocumentClient;
    private constructor() {
        //console.log('process.env.MODE created - mode', process.env.MODE);
        if(process.env?.MODE!='test'){
            this.db= DBConnectionService.instance.dynamoDBDocumentClient;
        }
    }

    public async getFilms(): Promise<FilmESP[]> {
        const response = await fetch(this.STAR_WARS_API_URL+'/films/');
        const data:any = await response.json();
        return this.toSpanishList(data?.results as Film[]);
    }

    public async getFilm(id: string): Promise<FilmESP> {
        try{
            const response = await fetch(this.STAR_WARS_API_URL+'/films/'+id);
            const data:any = await response.json();
            //console.log('data is: ', data);
            if(data?.detail){
                throw new Error(data?.detail);
            }
            return this.toSpanish(data as Film);
        }catch(error){
            throw new Error(error?.detail || error?.message || error);
        }
    }

    public async getOneFilmFromDB(id: string): Promise<FilmESP> {
        try{
            const data:any = await this.db.send(new GetCommand({
                TableName: this.FILMS_TABLE,
                Key: { id }
            }));
            console.log('- getOneFilmFromDB - data is: ', data?.Item);
            if(!data?.Item){
                throw new Error('Item not found');
            }
            return data?.Item || {};
        }catch(error){
            throw new Error(error?.detail || error?.message || error);
        }
    }

    public async getFilmsFromDB(): Promise<FilmESP[]> {
        try{
            const data:any = await this.db.send(new ScanCommand({
                TableName: this.FILMS_TABLE,  // Name of your DynamoDB table
            }));
            //return this.parseFilms(data?.Items || []); //TODO: uncomment if its not working
            return data?.Items || [];
        }catch(error){
            throw new Error(error?.detail || error?.message || error);
        }
    }

    public async addFilm(film: FilmESP){
        console.log('table is: ', this.FILMS_TABLE);
        const data={ id: uuidv4(),...film};
        await this.db.send(new PutCommand({
            TableName: this.FILMS_TABLE,  // Name of your DynamoDB table
            Item: data
        }));
        return data
    }

    
    private parseFilm(item: any): FilmESP {
        return {
          id: item.id.S,  // String type
          titulo: item.titulo.S,  // String type
          episodio: parseInt(item.episodio.N),  // Number type
          resumen: item.resumen.S,  // String type
          director: item.director.S,  // String type
          productor: item.productor.S,  // String type
          fecha_lanzamiento: item.fecha_lanzamiento.S,  // String type (date)
        };
    }
    private parseFilms(items: any[]): FilmESP[] {
        return items.map((item) => this.parseFilm(item));
    }

    toSpanish(f: Film): FilmESP {
        return {
            titulo: f.title,
            episodio: f.episode_id,
            resumen: f.opening_crawl,
            director: f.director,
            productor: f.producer,
            fecha_lanzamiento: f.release_date
        };
    }

    toSpanishList(films: Film[]): FilmESP[] {
        return films.map((f: Film) => this.toSpanish(f));
    }
}