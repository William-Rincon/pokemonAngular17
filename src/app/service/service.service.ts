import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IPokemon } from '../model/detalle.model';
import { Result } from '../model/pokemon.model';





@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private _http= inject(HttpClient)
  private urlBase: string = 'https://pokeapi.co/api/v2/';


  getPokemons(): Observable<Result[]> {
    return this._http.get<{ results: Result[] }>(`${this.urlBase}/pokemon?limit=151`) 
      .pipe(
        map(res => res.results)
      );
  }

  getPokemon(id: string | number): Observable<IPokemon> {
    return this._http.get<IPokemon>(`${this.urlBase}/pokemon/${id}`);
  }

  
  }




