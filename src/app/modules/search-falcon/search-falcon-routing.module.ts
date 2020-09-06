import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FindingFalconComponent } from './components/finding-falcon/finding-falcon.component';
import { AuthGuard } from 'src/app/core/AuthGuard';
import { CatchedFalconComponent } from './components/catched-falcon/catched-falcon.component';

const routes: Routes = [
    { path: '', component: FindingFalconComponent, canActivate: [AuthGuard] },
    { path: 'success', component: CatchedFalconComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchFalconRoutingModule { }
