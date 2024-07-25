import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service/service.service';
import { IPokemon } from '../../model/detalle.model';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {


  
  cards: IPokemon[] = [];

  constructor(private apiService: ServiceService) { }

  ngOnInit(): void {
    // Obtener datos de Pokémon para dos cartas
    for (let i = 0; i < 2; i++) {
      const randomId = Math.floor(Math.random() * 151) + 1; // IDs del 1 al 151
      this.apiService.getPokemon(randomId).subscribe(
        (pokemon: IPokemon) => {
          this.cards.push(pokemon);
        },
        (error) => {
          console.error('Error fetching Pokémon data', error);
        }
      );
    }

  }
}
