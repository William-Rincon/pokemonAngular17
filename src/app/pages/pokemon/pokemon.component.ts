import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ServiceService } from '../../service/service.service';
import {   PokemonCard, Result } from '../../model/pokemon.model';
import { IPokemon } from '../../model/detalle.model'


@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css'
})


export class PokemonComponent  implements OnInit{
 
  pokemonList: PokemonCard[] = []; // Usa la nueva interfaz PokemonCard
  pokemon: IPokemon | undefined;
  private _apiService = inject(ServiceService);
  private _router = inject(Router)
  private route = inject(ActivatedRoute);

 
  ngOnInit(): void {
    // Obtener lista de Pokémon
    this._apiService.getPokemons().subscribe(
      (data: Result[]) => {
        console.log(data);
        // Mapea los datos a la nueva interfaz PokemonCard
        this.pokemonList = data.map(result => ({
          name: result.name,
          url: result.url,
          weight: undefined, // Inicialmente undefined
          imageUrl: undefined, // Inicialmente undefined
          imagenUrl: undefined, // Inicialmente undefined
          height: undefined, // Inicialmente undefined
          id: undefined, // Inicialmente undefined
          
        }));

        // Iterar sobre cada Pokémon para obtener detalles adicionales
        this.pokemonList.forEach(pokemon => {
          // Obtener detalles adicionales de cada Pokémon para mostrar en la carta
          this._apiService.getPokemon(pokemon.name).subscribe(
            (pokemonData: IPokemon) => {
              // Asignar los detalles obtenidos al Pokémon correspondiente en la lista
              pokemon.id = pokemonData.id;
              pokemon.weight = pokemonData.weight;
              pokemon.height = pokemonData.height;
              pokemon.imageUrl = pokemonData.sprites.front_default;
              pokemon.imagenUrl = pokemonData.sprites.front_shiny;
            },
            (error) => console.error(`Error fetching details for ${pokemon.name}`, error)
          );
        });
      },
      (error) => console.error('Error fetching Pokémon list', error)
    );

    // Obtener detalles de un Pokémon específico si el ID está en la URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this._apiService.getPokemon(id).subscribe(
        (data: IPokemon) => this.pokemon = data,
        (error) => console.error('Error fetching Pokémon data', error)
      );
    }
  }

  navigateToPokemonDetails(id: string | number): void {
    this._router.navigate(['/pokemon', id]);
  }
}