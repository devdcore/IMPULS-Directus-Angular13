import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import {
  HomePageComponent,
  LoginPageComponent,
  RegisterPageComponent,
  ResetPageComponent,
} from '@landing-manager/pages/';

import { LandingManagerComponent } from './landing-manager.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: '',
    component: LandingManagerComponent,
    children: [
      { path: 'home', component: HomePageComponent },
      { path: 'login', component: LoginPageComponent },
      { path: 'register', component: RegisterPageComponent },
      { path: 'reset', component: ResetPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingManagerRoutingModule {}
