import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { GroupFeedComponent } from '../feed/group-feed/group-feed.component';

const routes: Routes = [
  {path:'', component:GroupFeedComponent, pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedRoutingModule { }