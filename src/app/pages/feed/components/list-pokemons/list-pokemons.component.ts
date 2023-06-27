import { RequestService } from './../../../../services/request.service';
import { Component, Input, OnInit, Output, DoCheck, SimpleChanges, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from 'src/app/interfaces/pokemon';
import { pokemonList } from 'src/app/interfaces/pokemonList';
import { Router } from '@angular/router';
import { PokemonDetails } from 'src/app/interfaces/pokemonDetails';

@Component({
  selector: 'app-list-pokemons',
  templateUrl: './list-pokemons.component.html',
  styleUrls: ['./list-pokemons.component.scss']
})
export class ListPokemonsComponent implements OnInit , OnChanges{

  @Input() public offset:number = 0
  @Input() public limit:number = 20
  @Input() public pokemonFilter: any[]=[]

  arraysPokemons:any[] = []
  
  constructor(private http: HttpClient, private router: Router, private service: RequestService){}
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['pokemonFilter'] && changes['pokemonFilter'].currentValue.length > 0){

      this.arraysPokemons = []
      this.arraysPokemons = this.pokemonFilter[0]
      this.pokemonFilter = []
    }
  }

  ngOnInit(): void {
    this.offset = Math.floor(Math.random()*200)
    this.service.loadInitialPokemons(this.offset, this.limit).subscribe((response:Pokemon)=>{
      response.results.map((res)=>{
        this.http.get<any>(res.url).subscribe((resData:any)=>{
          const pokemon: pokemonList = {
            id : resData.id,
            name: resData.name,
            height: resData.height,
            weight: resData.weight,
            types: resData.types,
            image: resData.sprites.other.dream_world.front_default
          }
          this.arraysPokemons.push(pokemon)
        })
      })
    })
  }

   
  goDetails(id:number):void{
    this.router.navigate(['feed','details',id])
  }

}
