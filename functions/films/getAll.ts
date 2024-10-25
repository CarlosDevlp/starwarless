import { APIGatewayProxyEvent } from "aws-lambda";
import { StarWarsFilmService } from "../../shared/services/starwars-films.service";
import { apiResponse } from "../../shared/helpers/api-response";
import { HttpStatus } from "../../shared/enum/http-status";

export async function handler(event: APIGatewayProxyEvent) {
    const films= await StarWarsFilmService.instance.getFilms();
    const filmsFromDB= await StarWarsFilmService.instance.getFilmsFromDB();
    
    return apiResponse(
        HttpStatus.OK,
        'Films found successfully!',
        [
            ...filmsFromDB,
            ...films
        ]
    );
}