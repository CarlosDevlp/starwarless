import { APIGatewayProxyEvent } from "aws-lambda";
import { StarWarsFilmService } from "../../shared/services/starwars-films.service";
import { FilmESP } from "../../shared/entities/film";
import { apiResponse } from "../../shared/helpers/api-response";
import { HttpStatus } from "../../shared/enum/http-status";


export async function handler(event: APIGatewayProxyEvent) {
    const id = event?.pathParameters?.id || '0';
    let film: FilmESP;
    try{
        try{
            film= await StarWarsFilmService.instance.getFilm(id);
        }catch(error){
            film= await StarWarsFilmService.instance.getOneFilmFromDB(id);
        }
        return apiResponse(
            HttpStatus.OK,
            'Film found successfully!',
            film
        );
    }catch(error){
        //console.log('error found: ', error);
        return apiResponse(
            HttpStatus.NOT_FOUND,
            'Film not found!',
            null
        );
    }
}