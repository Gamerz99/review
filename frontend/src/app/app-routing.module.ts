import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrendingComponent } from './trending/trending.component';
import { TopComponent } from './top/top.component';
import { SuggestionComponent } from './suggestion/suggestion.component';
import { AppDetailComponent } from './app-detail/app-detail.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'trending', component: TrendingComponent },
  { path: 'top', component: TopComponent },
  { path: 'suggestion', component: SuggestionComponent },
  { path: 'search/:title', component: SearchComponent },
  { path: ':title', component: AppDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
