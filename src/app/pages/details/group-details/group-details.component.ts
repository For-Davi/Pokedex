import { RequestService } from './../../../services/request.service';
import { Component, OnChanges, OnInit, SimpleChange, Input, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Route } from '@angular/router';
import { PokemonDetails } from 'src/app/interfaces/pokemonDetails';
import { environments } from 'src/app/environments/environments';
import { pokemonList } from 'src/app/interfaces/pokemonList';
import { Router } from '@angular/router';


@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss']
})
export class GroupDetailsComponent implements OnInit, OnChanges  {

  pokemonDetails:any[]= []
  description: any[] =[]
  arraysPokemons: any =[]
  randomOffset: number = 0
  randomLimit: number = 5
  changePokemonDetails: any[]=[]
  

  constructor(private http:HttpClient,private route:ActivatedRoute, private requestService: RequestService, private router: Router){}
  
  ngOnChanges(changes: SimpleChanges): void {
    
  }
  
  ngOnInit(): void {
      
      const idPokemon = Number(this.route.snapshot.paramMap.get('id'))
      this.requestService.detailsPokemon(idPokemon).subscribe((res)=>{
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
          about: null,
          
        }

        this.requestService.descriptionPokemon(res.id).subscribe((res: any)=>{
          const aboutResponse = {about :res.flavor_text_entries[0].flavor_text}
          
          details.about = aboutResponse

        })
        this.pokemonDetails.push(details)
      })

      this.http.get<any>(`${environments.urlApi}/pokemon`).subscribe((res)=>{
       this.randomOffset = Math.floor(Math.random() * (res.count - 6))
       
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
            this.arraysPokemons.push(pokemon)
            
          })
         })
       })
      })
  }


  changeRouterId(value: any){
    console.log(value, 'VALOR QUE CHEGOU');
    console.log(this.pokemonDetails, 'VALOR QUE TINHA');
    this.pokemonDetails = value
  }

  goFeed():void{
    this.router.navigate(['feed'])
  }



  

   

}

