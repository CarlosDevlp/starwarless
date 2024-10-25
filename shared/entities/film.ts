import { z } from "zod";

export interface Film{
    id?: string;
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    characters: string[];
    planets: string[];
    starships: string[];
    vehicles: string[];
    species: string[];
    created: string;
    edited: string;
    url: string;
}

export interface FilmESP{
    id?: string;
    titulo: string;
    episodio: number;
    resumen: string;
    director: string;
    productor: string;
    fecha_lanzamiento: string;
    //personajes: string[];
    //planetas: string[];
    //naves_estelares: string[];
    //vehiculos: string[];
    //especies: string[];
    //creado: string;
    //editado: string;
    //url: string;
}

export const FilmESPSchema = z.object({
    titulo: z.string(),
    episodio: z.number(),
    resumen: z.string(),
    director: z.string(),
    productor: z.string(),
    fecha_lanzamiento: z.string(),  // You can add additional validation for dates if needed
});
