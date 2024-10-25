import { APIGatewayProxyEvent } from 'aws-lambda';
import { handler } from '../../functions/films/getById';  // Path to your handler
import { FilmESP } from '../../shared/entities/film';
import { mockStarWarsFilmService, mockFilm, mockFilmFromDB, mockSetup } from '../mocks/starwars-films.service.mock';


describe('GET => /Film/{id}', () => {
  beforeEach(() => {
    jest.clearAllMocks();  
    mockSetup();
  });

  it('should return a film from the external API', async () => {
    const filmId= '1';

    const film: FilmESP = {
      id: '1',
      titulo: 'A New Hope',
      episodio: 4,
      resumen: 'Rebel Alliance fights the Empire.',
      director: 'George Lucas',
      productor: 'Gary Kurtz',
      fecha_lanzamiento: '1977-05-25',
    };

    const event: APIGatewayProxyEvent = {
      pathParameters: { id: filmId },
    } as any;

    const response = await handler(event);
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).data).toEqual(film);
  });

  it('should return a film from the database if API call fails', async () => {
    const filmId= '2';

    const mockFilmFromDB: FilmESP = {
      id: '2',
      titulo: 'The Empire Strikes Back',
      episodio: 5,
      resumen: 'The Rebels suffer a defeat.',
      director: 'Irvin Kershner',
      productor: 'George Lucas',
      fecha_lanzamiento: '1980-05-21',
    };

    const event: APIGatewayProxyEvent = {
      pathParameters: { id: filmId },
    } as any;

    const response = await handler(event);

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).data).toEqual(mockFilmFromDB);
  });

  it('should return a 404 if no film is found in both API and database', async () => {
    const filmId= '99';
    
    const event: APIGatewayProxyEvent = {
      pathParameters: { id: filmId },
    } as any;

    const response = await handler(event);

    expect(response.statusCode).toBe(404);
    expect(JSON.parse(response.body).message).toEqual('Film not found!');
  });
});
