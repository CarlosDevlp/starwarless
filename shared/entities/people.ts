import { z } from 'zod';

export interface People{
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
    created: string;
    edited: string;
    url: string;
}



export interface PeopleESP{
    id?: string;
    nombre: string;
    altura: string;
    peso: string;
    color_cabello: string;
    color_piel: string;
    color_ojos: string;
    nacimiento: string;
    genero: string;
    planeta_natal: string;
    //peliculas: string[];
    //especies: string[];
    //vehiculos: string[];
    //naves_estelares: string[];
    //created: string;
    //edited: string;
    //url: string;   
}

export const PeopleESPSchema = z.object({
  nombre: z.string(),
  altura: z.string(),
  peso: z.string(),
  color_cabello: z.string(),
  color_piel: z.string(),
  color_ojos: z.string(),
  nacimiento: z.string(),
  genero: z.string(),
  planeta_natal: z.string(),
});
