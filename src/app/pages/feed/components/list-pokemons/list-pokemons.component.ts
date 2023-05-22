import { Component , Input, OnInit} from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environments } from 'src/app/environments/environments';
import { Pokemon } from 'src/app/interfaces/pokemon';
import { pokemonList } from 'src/app/interfaces/pokemonList';

@Component({
  selector: 'app-list-pokemons',
  templateUrl: './list-pokemons.component.html',
  styleUrls: ['./list-pokemons.component.scss']
})
export class ListPokemonsComponent implements OnInit {

  @Input() public offset:number = 0
  @Input() public limit:number = 20

  arraysPokemons:any[] = []
  
  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.http.get<Pokemon>(`${environments.urlApi}/pokemon?offset=${this.offset}&limit=${this.limit}`).subscribe((response:Pokemon)=>{
      response.results.map((res)=>{
        this.http.get<any>(res.url).subscribe((resData:any)=>{
          // console.log(resData);
          const pokemon: pokemonList = {
            id : resData.id,
            name: resData.name,
            height: resData.height,
            weight: resData.weight,
            types: resData.types,
            image: resData.sprites.front_default
          }
          this.arraysPokemons.push(pokemon)
          console.log(this.arraysPokemons[0].types[0].type.name);
        })
      })
    })
  }

  getClass(item: any){
    // return {
    //   'normal' : item.types[0].type.name === 'normal',
    //   'fighting' : item.types[0].type.name === 'fighting',
    //   'flying' : item.types[0].type.name === 'flying',
    //   'poison' : item.types[0].type.name === 'poison',
    //   'ground' : item.types[0].type.name === 'ground',
    //   'rock': item.types[0].type.name === 'rock',
    //   'bug' :item.types[0].type.name === 'bug',
    //   'ghost' : item.types[0].type.name === 'ghost',
    //   'steel' : item.types[0].type.name === 'steel',
    //   'fire' : item.types[0].type.name === 'fire',
    //   'water': item.types[0].type.name === 'water',
    //   'grass': item.types[0].type.name === 'grass',
    //   'eletric': item.types[0].type.name === 'eletric',
    //   'psychi' : item.types[0].type.name === 'psychi',
    //   'ice' : item.types[0].type.name === 'ice',
    //   'dragon' : item.types[0].type.name === 'dragon',
    //   'dark' : item.types[0].type.name === 'dark',
    //   'fairy' : item.types[0].type.name === 'fairy',
    //   'shadow' : item.types[0].type.name === 'shadow',
    //   'unknown' : item.types[0].type.name === 'unknown'
    // }

    if(item.types[0].type.name === 'normal'){
      return 'normal'
    } else if(item.types[0].type.name === 'fighting'){
      return 'fighting'
    } else if (item.types[0].type.name === 'flying'){
      return 'flying'
    } else{
      return
    }
  }

}
