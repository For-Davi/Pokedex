import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupFeedComponent } from './group-feed/group-feed.component';

//Components

const routes: Routes = [
  {path:'',component:GroupFeedComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedRoutingModule { }
