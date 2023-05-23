import { RequestService } from './../../../services/request.service';
import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { PokemonDetails } from 'src/app/interfaces/pokemonDetails';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss']
})
export class GroupDetailsComponent implements OnInit {

  pokemonDetails:any[]= []
  description: any[] =[]

  constructor(private http:HttpClient,private route:ActivatedRoute, private requestService: RequestService){}
  
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
        console.log(this.pokemonDetails);
      })
  }

  

}
