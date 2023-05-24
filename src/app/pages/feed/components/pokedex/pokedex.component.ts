import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnChanges{
  
  @Input() pokemonFilter:any[]=[]
  pokemonFilterArray: any[]= []
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['pokemonFilter']){
      const novoValor = changes['pokemonFilter'].currentValue

      this.pokemonFilterArray = novoValor
    }
  }
  
  reload(){
    window.location.reload()
  }


}
