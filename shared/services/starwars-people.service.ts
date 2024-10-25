import { DynamoDBDocumentClient, GetCommand, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { Film, FilmESP } from "../entities/film";
import { People, PeopleESP } from "../entities/people";
import { DBConnectionService } from "./db-connection.service";
import { v4 as uuidv4 } from 'uuid';

export class StarWarsPeopleService {
    private static _instance: StarWarsPeopleService;
    public static get instance(): StarWarsPeopleService {
        if (!StarWarsPeopleService._instance) {
            StarWarsPeopleService._instance = new StarWarsPeopleService();
        }
        return StarWarsPeopleService._instance;
    }
    private STAR_WARS_API_URL: string = process.env.STAR_WARS_API_URL || '';    
    private PEOPLE_TABLE = process.env.PEOPLE_TABLE || 'FilmESPTable';
    private db: DynamoDBDocumentClient;

    private constructor() {
        if(process.env?.MODE!='test'){
            this.db= DBConnectionService.instance.dynamoDBDocumentClient;
        }
    }

    public async getPeople(): Promise<PeopleESP[]> {
        const response = await fetch(this.STAR_WARS_API_URL+'/people/');
        const data: any = await response.json();
        return this.toSpanishList(data?.results as People[]);
    }

    public async getPerson(id: string): Promise<People> {
        try{
            const response = await fetch(this.STAR_WARS_API_URL+'/people/'+id);
            const data:any = await response.json();
            if(data?.detail){
                throw new Error(data?.detail);
            }
            return data as People;
        }catch(error){
            throw new Error(error?.detail || error?.message || error);
        }
    }

    public async getOnePeopleFromDB(id: string): Promise<PeopleESP> {
        try{
            const data:any = await this.db.send(new GetCommand({
                TableName: this.PEOPLE_TABLE,
                Key: { id }
            }));
            //console.log('- getOnePeopleFromDB - data is: ', data?.Item);
            if(!data?.Item){
                throw new Error('Item not found');
            }
            return data?.Item || {};
        }catch(error){
            throw new Error(error?.detail || error?.message || error);
        }
    }

    public async getPeopleFromDB(): Promise<PeopleESP[]> {
        try{
            const data:any = await this.db.send(new ScanCommand({
                TableName: this.PEOPLE_TABLE,  // Name of your DynamoDB table
            }));
            //return this.parsePeople(data?.Items || []);
            return data?.Items || [];
        }catch(error){
            throw new Error(error?.detail || error?.message || error);
        }
    }

    public async addPerson(people: PeopleESP){
        console.log('table is: ', this.PEOPLE_TABLE);
        const data={ id: uuidv4(),...people};
        await this.db.send(new PutCommand({
            TableName: this.PEOPLE_TABLE,  // Name of your DynamoDB table
            Item: data
        }));
        return data
    }

    /*parsePeople(items: any[]): PeopleESP[] {
        return items.map((item) => ({
          id: item.id.S,  
          titulo: item.titulo.S, 
          episodio: parseInt(item.episodio.N),  
          resumen: item.resumen.S,  
          director: item.director.S,
          productor: item.productor.S, 
          fecha_lanzamiento: item.fecha_lanzamiento.S, 
        }));
    }*/

    toSpanish(p: People): PeopleESP {
        return {
            nombre: p.name,
            altura: p.height,
            peso: p.mass,
            color_cabello: p.hair_color,
            color_piel: p.skin_color,
            color_ojos: p.eye_color,
            nacimiento: p.birth_year,
            genero: p.gender,
            planeta_natal: p.homeworld
        };
    }

    toSpanishList(people: People[]): PeopleESP[] {
        return people.map((p: People) => this.toSpanish(p));
    }

}