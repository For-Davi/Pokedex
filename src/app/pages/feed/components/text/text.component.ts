import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent {

  @Output() setPokemonFilter = new EventEmitter()
  arrayPokemonFilter: any[]=[]

  constructor(){}

  getPokemonFilter(value: Event){
    this.arrayPokemonFilter.push(value)
    this.setPokemonFilter.emit(this.arrayPokemonFilter)
  }
}
