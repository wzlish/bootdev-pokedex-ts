import { Cache } from "./pokecache.js";

export class HttpError extends Error {
  httpCode: number;
  constructor(message: string, httpCode: number) {
    super(message);
    this.httpCode = httpCode;
  }
}

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #cache;

  constructor() {
    this.#cache = new Cache(Number(process.env["CACHE_REAP_INTERVAL"]) || 18e5);
  }

  async fetchLocations(pageURL?: string): Promise<Locations> {
    if (!pageURL || pageURL === "") {
      pageURL = `${PokeAPI.baseURL}/location-area/?offset=0&limit=20`;
    }
    const resource = this.#cache.get(pageURL);
    if (resource) {
      return resource as Locations;
    }
    try {
      const response = await fetch(pageURL);
      if (!response.ok) {
        throw new HttpError(
          `Response: ${response.statusText} (${response.status})`,
          response.status,
        );
      }
      const json = await response.json();
      this.#cache.add(pageURL, json as Locations);
      return json as Locations;
    } catch (e) {
      if (e instanceof HttpError) {
        throw e;
      } else {
        throw new Error(
          `Error with fetchLocations ('${pageURL}'): ${(e as Error).message}`,
        );
      }
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    locationName = `${PokeAPI.baseURL}/location-area/${locationName}`;
    const resource = this.#cache.get(locationName);
    if (resource) {
      return resource as Location;
    }
    try {
      const response = await fetch(locationName);
      if (!response.ok) {
        throw new HttpError(
          `Response: ${response.statusText} (${response.status})`,
          response.status,
        );
      }
      const json = await response.json();
      this.#cache.add(locationName, json as Locations);
      return json as Location;
    } catch (e) {
      if (e instanceof HttpError) {
        throw e;
      } else {
        throw new Error(
          `Error with fetchLocation ('${locationName}'): ${(e as Error).message}`,
        );
      }
    }
  }
}

// Locations:
export interface Locations {
  count: number;
  next: string;
  previous: any;
  results: Result[];
}

export interface Result {
  name: string;
  url: string;
}

// Specific Location:
export interface Location {
  encounter_method_rates: EncounterMethodRate[];
  game_index: number;
  id: number;
  location: Result;
  name: string;
  names: Name[];
  pokemon_encounters: PokemonEncounter[];
}

export interface EncounterMethodRate {
  encounter_method: EncounterMethod;
  version_details: VersionDetail[];
}

export interface EncounterMethod {
  name: string;
  url: string;
}

export interface VersionDetail {
  rate: number;
  version: Version;
}

export interface Version {
  name: string;
  url: string;
}

export interface Name {
  language: Language;
  name: string;
}

export interface Language {
  name: string;
  url: string;
}

export interface PokemonEncounter {
  pokemon: Pokemon;
  version_details: VersionDetail2[];
}

export interface Pokemon {
  name: string;
  url: string;
}

export interface VersionDetail2 {
  encounter_details: EncounterDetail[];
  max_chance: number;
  version: Version2;
}

export interface EncounterDetail {
  chance: number;
  condition_values: any[];
  max_level: number;
  method: Method;
  min_level: number;
}

export interface Method {
  name: string;
  url: string;
}

export interface Version2 {
  name: string;
  url: string;
}
