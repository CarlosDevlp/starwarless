import { APIGatewayProxyEvent } from 'aws-lambda';
import { handler } from '../../functions/films/getAll';
import { mockSetup } from '../mocks/starwars-films.service.mock';


describe('GET => /Film', () => {
  beforeEach(() => {
    jest.clearAllMocks();  
    mockSetup();
  });

  it('should return all available films successfully', async () => {
    const event: APIGatewayProxyEvent = {} as any;
    const response = await handler(event);
    
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).data?.length).toBeGreaterThan(0);
  });

  it('should return a success message and 200 code', async () => {
    const event: APIGatewayProxyEvent = {} as any;
    const response = await handler(event);

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).message).toEqual('Films found successfully!');
  });
});
