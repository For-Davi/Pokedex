import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupFeedComponent } from './group-feed/group-feed.component';
import { TextComponent } from './components/text/text.component';
import { SearchComponent } from './components/search/search.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { PokedexComponent } from './components/pokedex/pokedex.component';
import { ListPokemonsComponent } from './components/list-pokemons/list-pokemons.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    GroupFeedComponent,
    TextComponent,
    SearchComponent,
    FavoritesComponent,
    PokedexComponent,
    ListPokemonsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ]
})
export class FeedModule { }
