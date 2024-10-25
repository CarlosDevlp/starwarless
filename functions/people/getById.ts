import { APIGatewayProxyEvent } from "aws-lambda";
import { StarWarsPeopleService } from "../../shared/services/starwars-people.service";
import { PeopleESP } from "../../shared/entities/people";
import { apiResponse } from "../../shared/helpers/api-response";
import { HttpStatus } from "../../shared/enum/http-status";

export async function handler(event: APIGatewayProxyEvent) {
    const id=event?.pathParameters?.id || '0';
    let person: PeopleESP;
    try{
        try{
            person= StarWarsPeopleService.instance.toSpanish(
                await StarWarsPeopleService.instance.getPerson(id)
            );
        }catch(error){
            person= await StarWarsPeopleService.instance.getOnePeopleFromDB(id);
        }

        return apiResponse(
            HttpStatus.OK,
            'Person found successfully!',
            person
        );
    }catch(error){
        console.log('error found: ', error);
        return apiResponse(
            HttpStatus.NOT_FOUND,
            'Person not found!',
            null
        );
    }
    
}