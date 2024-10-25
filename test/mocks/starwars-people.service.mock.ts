// test/starwars-films.service.mock.ts
import { StarWarsPeopleService } from '../../shared/services/starwars-people.service';
import { PeopleESP } from '../../shared/entities/people';


export const mockPerson: PeopleESP = {
    id: '1',
    nombre: 'Luke Skywalker',
    altura: '172',
    peso: '77',
    color_cabello: 'Blond',
    color_piel: 'Fair',
    color_ojos: 'Blue',
    nacimiento: '19BBY',
    genero: 'Male',
    planeta_natal: 'Tatooine',
};

export const mockPersonFromDB: PeopleESP = {
    nombre: 'Darth Vader',
    altura: '202',
    peso: '136',
    color_cabello: 'None',
    color_piel: 'White',
    color_ojos: 'Yellow',
    nacimiento: '41.9BBY',
    genero: 'Male',
    planeta_natal: 'Tatooine',
};

export const mockStarWarsPeopleService = {
  getPerson: jest.fn((id: string)=> {
    if (id === '1') {
        return Promise.resolve(mockPerson);
    }
    return Promise.reject(new Error('Person not found'));
  }),
  getOnePersonFromDB: jest.fn((id: string)=> {
    if (id === '2') {
        return Promise.resolve(mockPersonFromDB);
    }
    return Promise.reject(new Error('Person not found'));
  }),
  getPeopleFromDB: jest.fn(),
  getPeople: jest.fn(),
  addPerson: jest.fn((body: PeopleESP)=>{
    return Promise.resolve({id: '3',...body});
  }),
};

Object.defineProperty(StarWarsPeopleService, 'instance', {
    get: jest.fn(() => mockStarWarsPeopleService),
});



export const mockSetup = () => {
    mockStarWarsPeopleService.getPeopleFromDB.mockResolvedValue([mockPersonFromDB]);
    mockStarWarsPeopleService.getPeople.mockResolvedValue([mockPerson]);
};  