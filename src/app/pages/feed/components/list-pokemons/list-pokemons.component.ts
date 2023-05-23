import { RequestService } from './../../../../services/request.service';
import { Component , Input, OnInit, Output} from '@angular/core';
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
export class ListPokemonsComponent implements OnInit {

  @Input() public offset:number = 0
  @Input() public limit:number = 20

  arraysPokemons:any[] = []
  @Output() Details :any[]=[]
  
  constructor(private http: HttpClient, private router: Router, private service: RequestService){}

  ngOnInit(): void {

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
      console.log(this.Details);
    })
    this.router.navigate(['feed','details',id])
  }

}
