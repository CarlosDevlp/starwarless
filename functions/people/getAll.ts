import { APIGatewayProxyEvent } from "aws-lambda";
import { StarWarsPeopleService } from "../../shared/services/starwars-people.service";
import { apiResponse } from "../../shared/helpers/api-response";
import { HttpStatus } from "../../shared/enum/http-status";

export async function handler(event: APIGatewayProxyEvent) {
    const people= await StarWarsPeopleService.instance.getPeople();
    const peopleFromDB= await StarWarsPeopleService.instance.getPeopleFromDB();
    
    return apiResponse(
        HttpStatus.OK,
        'People found successfully!',
        [
            ...peopleFromDB,
            ...people
        ]
    );
}