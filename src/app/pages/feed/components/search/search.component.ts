import { pokemonList } from 'src/app/interfaces/pokemonList';
import { RequestService } from './../../../../services/request.service';
import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  valueInput: string = '' 
  offset: number = 1
  limit: number = 1
  arrayPokemonFilter: any[]=[]
  
  @Output() pokemonFilter = new EventEmitter<any>()

  constructor(private requestService:RequestService){}

  searchPokemon():void{
    this.valueInput.toLowerCase()
    this.requestService.inputPokemon(this.valueInput).subscribe((res: any)=>{
      
      const pokemon : pokemonList = {
        id : res.id,
        name: res.name,
        height: res.height,
        weight: res.weight,
        image: res.sprites.other.dream_world.front_default,
        types: res.types
      }
      
      this.arrayPokemonFilter = []
      this.arrayPokemonFilter.push(pokemon)
      this.pokemonFilter.emit(this.arrayPokemonFilter)
      this.valueInput = ''
       }
      )
    }
  }

