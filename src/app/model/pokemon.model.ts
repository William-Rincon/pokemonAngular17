
export interface Pokemons {
    count:    number;
    next:     string;
    previous: null;
    results:  Result[];
}

export interface Result {
    name: string;
    url:  string;
}


export interface PokemonCard extends Result {
    weight?: number;
    imageUrl?: string;
    imagenUrl?: string;
    id?: number | string;
    height?:  number;
  }