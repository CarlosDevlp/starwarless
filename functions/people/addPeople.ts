import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { PeopleESP, PeopleESPSchema } from '../../shared/entities/people';
import { StarWarsPeopleService } from '../../shared/services/starwars-people.service';
import { z } from 'zod';
import { apiResponse } from '../../shared/helpers/api-response';
import { HttpStatus } from '../../shared/enum/http-status';

export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  try {
    // Parse body
    const body = JSON.parse(event.body || '{}');
    const person: PeopleESP = PeopleESPSchema.parse(body);
    const data= await StarWarsPeopleService.instance.addPerson(person);

    return apiResponse(
      HttpStatus.OK,
      'People created successfully!',
      data
    );
  } catch (error) {
    //console.error('Error saving People:', error);
    const isClientError = error instanceof z.ZodError;
    return apiResponse(
      (isClientError?  HttpStatus.BAD_REQUEST: HttpStatus.INTERNAL_SERVER_ERROR),
      (isClientError? 'Attributes validation error': 'Error on saving Person'),
      null
    );
  }
};
