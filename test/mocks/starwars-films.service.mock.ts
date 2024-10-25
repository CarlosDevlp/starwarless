// test/starwars-films.service.mock.ts
import { StarWarsFilmService } from '../../shared/services/starwars-films.service';
import { Film, FilmESP } from '../../shared/entities/film';


export const mockFilm: FilmESP = {
    id: '1',
    titulo: 'A New Hope',
    episodio: 4,
    resumen: 'Rebel Alliance fights the Empire.',
    director: 'George Lucas',
    productor: 'Gary Kurtz',
    fecha_lanzamiento: '1977-05-25',
  }

export const mockFilmFromDB: FilmESP = {
  id: '2',
  titulo: 'The Empire Strikes Back',
  episodio: 5,
  resumen: 'The Rebels suffer a defeat.',
  director: 'Irvin Kershner',
  productor: 'George Lucas',
  fecha_lanzamiento: '1980-05-21',
};


export const mockStarWarsFilmService = {
  getFilm: jest.fn((id: string)=> {
    if (id === '1') {
        return Promise.resolve(mockFilm);
    }
    return Promise.reject(new Error('Film not found'));
  }),
  getOneFilmFromDB: jest.fn((id: string)=> {
    if (id === '2') {
        return Promise.resolve(mockFilmFromDB);
    }
    return Promise.reject(new Error('Film not found'));
  }),
  getFilmsFromDB: jest.fn(),
  getFilms: jest.fn(),
  addFilm: jest.fn((body: FilmESP)=>{
    return Promise.resolve({id: '3',...body});
  }),
};

// Mock the actual implementation of StarWarsFilmService using Jest
/*jest.mock('../../shared/services/starwars-films.service', () => {
    return {
        StarWarsFilmService: {
          instance: mockStarWarsFilmService,  
        },
        StarWarsFilmService: jest.fn().mockImplementation(() => mockStarWarsFilmService),
    };  
});*/

// Mock the static `instance` property using a getter
Object.defineProperty(StarWarsFilmService, 'instance', {
    get: jest.fn(() => mockStarWarsFilmService),
});



export const mockSetup = () => {
    //mockStarWarsFilmService.getFilm.mockResolvedValue(mockFilm);
    //mockStarWarsFilmService.getOneFilmFromDB.mockResolvedValue(mockFilmFromDB);
    mockStarWarsFilmService.getFilmsFromDB.mockResolvedValue([mockFilmFromDB]);
    mockStarWarsFilmService.getFilms.mockResolvedValue([mockFilm]);
};  