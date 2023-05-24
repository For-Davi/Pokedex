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
  @Output() Details :any[]=[]
  
  constructor(private http: HttpClient, private router: Router, private service: RequestService){}
  
  // ngDoCheck(): void {
  //   if(this.pokemonFilter.length > 0){
  //     this.arraysPokemons.push(this.pokemonFilter[1])
      
  //   }
  // }
  
  
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['pokemonFilter'] && changes['pokemonFilter'].currentValue.length > 0){

      const novoValor = changes['pokemonFilter'].currentValue
      const velhoValor = changes['pokemonFilter'].previousValue

      this.arraysPokemons = []
      this.arraysPokemons = this.pokemonFilter[0]
      // console.log(this.arraysPokemons);
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

    this.service.detailsPokemon(id).subscribe(res=>{
      const details: PokemonDetails= {
        id: res.id,
        name: res.name,
        height: res.height,
        weight: res.weight,
        base_experience: res.base_experience,
        abilities:res.abilities,
        sprites: res.sprites,
        stats: res.stats,
        types: res.types,
        about: ''
      }
      this.Details.push(details)
    })
    this.router.navigate(['feed','details',id])
  }

}
