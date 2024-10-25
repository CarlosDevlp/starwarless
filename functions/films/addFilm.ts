import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { FilmESP, FilmESPSchema } from '../../shared/entities/film';
import { StarWarsFilmService } from '../../shared/services/starwars-films.service';
import { apiResponse } from '../../shared/helpers/api-response';
import { HttpStatus } from '../../shared/enum/http-status';
import { z } from 'zod';


export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  try {
    const body = JSON.parse(event.body || '{}');
    const film: FilmESP= FilmESPSchema.parse(body);
    const data= await StarWarsFilmService.instance.addFilm(film);
    return apiResponse(
      HttpStatus.OK,
      'Film created successfully!',
      data
    );
  } catch (error) {
    //console.error('Error saving FilmESP:', error);
    const isClientError = error instanceof z.ZodError;
    
    return apiResponse(
      (isClientError?  HttpStatus.BAD_REQUEST: HttpStatus.INTERNAL_SERVER_ERROR),
      (isClientError? 'Attributes validation error': 'Error on saving Film'),
      null
    );
  }
};
