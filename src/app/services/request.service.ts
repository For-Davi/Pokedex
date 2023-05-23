import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../environments/environments';
import { Pokemon } from '../interfaces/pokemon';
import { PokemonDetails } from '../interfaces/pokemonDetails';


@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  loadInitialPokemons(offset:number, limit:number){
    return this.http.get<Pokemon>(`${environments.urlApi}/pokemon?offset=${offset}&limit=${limit}`)
  }

  detailsPokemon(id: number){
    return this.http.get<PokemonDetails>(`${environments.urlApi}/pokemon/${id}`)
  }
}
