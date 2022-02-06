import { NgModule } from '@angular/core';
import { UserDetailComponent, UserListComponent } from '@user-manager/pages';
import { RouterModule, Routes } from '@angular/router';

import { UserManagerComponent } from './user-manager.component';

const routes: Routes = [
  { path: '', redirectTo: 'user-list', pathMatch: 'full' },

  {
    path: '',
    component: UserManagerComponent,
    children: [
      { path: 'user-list', component: UserListComponent },
      { path: 'user-detail', component: UserDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagerRoutingModule {}
