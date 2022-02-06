import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import {
  AccessDeniedPage,
  ErrorItemPage,
  NotFoundPage,
} from '@shared/modules';

import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: 'landing-manager', pathMatch: 'full' },



  {
    path: '',
    component: AppComponent,
    children: [],
  },

  {
    path: 'daniel-manager',
    loadChildren: () =>
      import('./layout/modules/daniel-manager/daniel-manager.module').then(
        (m) => m.DanielManagerModule
      ),
  },



  {
    path: 'access-control',
    loadChildren: () =>
      import('./shared/modules/access-manager/access-manager.module').then(
        (m) => m.AccessControlModule
      ),
  },

  {
    path: 'landing-manager',
    loadChildren: () =>
      import('@landing-manager/landing-manager.module').then(
        (m) => m.LandingManagerModule
      ),
    // canActivateChild: [AuthGuard], canActivate: [AuthGuard]
  },

  {
    path: 'user-manager',
    loadChildren: () =>
      import('@user-manager/user-manager.module').then(
        (m) => m.UserManagerModule
      ),
    // canActivateChild: [AuthGuard], canActivate: [AuthGuard]
  },

  {
    path: 'product-manager',
    loadChildren: () =>
      import('@product-manager/product-manager.module').then(
        (m) => m.ProductManagerModule
      ),
    // canActivateChild: [AuthGuard], canActivate: [AuthGuard]
  },

  // {
  //   path: 'test-manager',
  //   loadChildren: () =>
  //     import('@test-manager/test-manager.module').then(
  //       (m) => m.TestManagerModule
  //     ),
  //   // canActivateChild: [AuthGuard], canActivate: [AuthGuard]
  // },

  { path: 'access-denied', component: AccessDeniedPage },
  { path: 'error', component: ErrorItemPage },
  { path: '**', redirectTo: 'notfound' },
  { path: 'notfound', component: NotFoundPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
