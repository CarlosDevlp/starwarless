import { APIGatewayProxyEvent } from 'aws-lambda';
import { handler } from '../../functions/films/addFilm'; 
import { mockSetup, mockStarWarsFilmService } from '../mocks/starwars-films.service.mock';

describe('POST => /Film ', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSetup();
  });

  it('should successfully add a film', async () => {
    const body = {
        titulo: "Star Wars: The Rise of Skywalker",
        episodio: 9,
        resumen: "The final battle between the Resistance and the First Order takes place.",
        director: "J.J. Abrams",
        productor: "Kathleen Kennedy",
        fecha_lanzamiento: "2019-12-20"
    };
    
    const event: APIGatewayProxyEvent = {
      body: JSON.stringify(body),
    } as any;

    const response = await handler(event);
    const data = JSON.parse(response.body).data;
    
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).message).toEqual('Film created successfully!');
    expect(data.id).not.toBeUndefined();
    delete data.id;
    expect(data).toEqual(body);
  });

  it('should return an error if the request body is missing or invalid', async () => {
    const event: APIGatewayProxyEvent = {
      body: '', 
    } as any;
    const response = await handler(event);
    expect(mockStarWarsFilmService.addFilm).not.toHaveBeenCalled();  // Should not call addFilm
    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body).message).toEqual('Attributes validation error');
  });
});
