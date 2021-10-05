export interface AppState {
  pokemons: PokemonFeatures;
  showCount: number;
  pageNumber: number;
  sort: string;
  search: string;
}

export enum SortMethod {
  NAME = 'name',
  HEIGHT = 'height',
  WEIGHT = 'weight'
}

export interface Pokemons {
  [name: string]: pokemon;
}

export interface AppAction {
  type: string;
  payload: any;
}

export interface ApiResults {
  results: pokemon[];
}

export interface pokemon {
  name: string;
  url: string;
}

export interface PokemonFeatures {
  [name:string]: PokemonFeature;
}

export interface PokemonFeature {
  name: string;
  url?: string;
  imageUrl: string;
  height: number;
  weight: number;
  abilities: string[];
}