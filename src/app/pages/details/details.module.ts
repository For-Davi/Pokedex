import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { PokedexDetailsComponent } from './components/pokedex-details/pokedex-details.component';



@NgModule({
  declarations: [
    GroupDetailsComponent,
    PokedexDetailsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DetailsModule { }
