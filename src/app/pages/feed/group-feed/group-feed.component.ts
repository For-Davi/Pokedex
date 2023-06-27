import { Component} from '@angular/core';
import { pokemonList } from 'src/app/interfaces/pokemonList';

@Component({
  selector: 'app-group-feed',
  templateUrl: './group-feed.component.html',
  styleUrls: ['./group-feed.component.scss']
})
export class GroupFeedComponent {
  
  arrayPokemonFilter:any[]=[]

  constructor(){}

  getPokemonFilter(value: Array<pokemonList>){
    this.arrayPokemonFilter = []
    this.arrayPokemonFilter = value
  }
}
