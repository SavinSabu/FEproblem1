import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageLayoutComponent } from './common/home-page-layout/home-page-layout.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'find-falcon' },
  { path: 'find-falcon', component: HomePageLayoutComponent, children: [
    { path: '', loadChildren: () => import('./modules/search-falcon/search-falcon.module').then(m => m.SearchFalconModule) }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
