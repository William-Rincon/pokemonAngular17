import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../service/service.service';
import { IPokemon } from '../../model/detalle.model';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {
  pokemon: IPokemon | undefined;
  private _apiService = inject(ServiceService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this._apiService.getPokemon(id).subscribe(
        (data: IPokemon) => {
          this.pokemon = data;
        },
        (error) => console.error('Error fetching Pokémon data', error)
      );
    }
  }
}