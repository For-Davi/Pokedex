import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { CoverComponent } from './pages/index/cover/cover.component';
import { GroupFeedComponent } from './pages/feed/group-feed/group-feed.component';
import { GroupDetailsComponent } from './pages/details/group-details/group-details.component';

const routes: Routes = [
  {path:'', component:CoverComponent, pathMatch:'full'},
  {path: 'feed', component:GroupFeedComponent, loadChildren: () => import('./pages/feed/feed.module').then(m=> m.FeedModule)},
  {path: 'feed/details/:id',component: GroupDetailsComponent, loadChildren: () => import('./pages/details/details.module').then(m=> m.DetailsModule)}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
