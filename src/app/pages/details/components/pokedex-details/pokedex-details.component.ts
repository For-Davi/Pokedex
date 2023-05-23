import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RequestService } from './../../../../services/request.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { environments } from 'src/app/environments/environments';
import { pokemonList } from 'src/app/interfaces/pokemonList';
import { PokemonDetails } from 'src/app/interfaces/pokemonDetails';


@Component({
  selector: 'app-pokedex-details',
  templateUrl: './pokedex-details.component.html',
  styleUrls: ['./pokedex-details.component.scss']
})
export class PokedexDetailsComponent implements OnInit{
  randomOffset:number = 0
  randomLimit:number = 5
  arraysPokemonsPokedexDetails: any[]=[]
  @Output() arraysPokemons = new EventEmitter<any>()

  constructor(private requestService:RequestService, private http: HttpClient, private router: Router, private route:ActivatedRoute){}
  
  ngOnInit(): void {

    this.http.get<any>(`${environments.urlApi}/pokemon`).subscribe((res)=>{
      this.randomOffset = Math.floor(Math.random()*200)

      this.requestService.loadInitialPokemons(this.randomOffset,this.randomLimit).subscribe((response)=>{
        response.results.map((res)=>{
          this.http.get<any>(res.url).subscribe((resData: any)=>{
            const pokemon: pokemonList = {
              id : resData.id,
              name: resData.name,
              height: resData.height,
              weight: resData.weight,
              types: resData.types,
              image: resData.sprites.other.dream_world.front_default
            }

            this.arraysPokemonsPokedexDetails.push(pokemon)
          })
        })
      })
    })
    
  }

  goDetails(id: number){

    
    this.requestService.detailsPokemon(id).subscribe((res)=>{
      
      const details: PokemonDetails = {
          id: res.id,
          name: res.name,
          height: res.height,
          weight: res.weight,
          base_experience: res.base_experience,
          abilities:res.abilities,
          sprites: res.sprites,
          stats: res.stats,
          types: res.types,
          about: null,
      }

      this.requestService.descriptionPokemon(res.id).subscribe((res:any)=>{
        const aboutResponse = {about: res.flavor_text_entries[0].flavor_text}

        details.about = aboutResponse
        
        const arrayDetails = []
        
        arrayDetails.push(details)
        this.arraysPokemons.emit(arrayDetails)

        this.router.navigate(['feed','details',id])
      })

      
    })
    
  }

  
  
}
