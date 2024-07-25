import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PokemonComponent } from './pages/pokemon/pokemon.component';
import { PokemonDetailsComponent } from './pages/pokemon-details/pokemon-details.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'pokemon', component: PokemonComponent },
    { path: 'pokemon/:id', component: PokemonDetailsComponent },
    // { path: 'contact', component: ContactComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
