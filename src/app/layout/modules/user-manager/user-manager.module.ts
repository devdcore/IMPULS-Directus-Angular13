import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedManagerModule } from '@shared/modules';

//Common
import {
  UserBrandComponent,
  UserHeaderComponent,
  UserSidenavComponent,
  UserToolbarComponent,
} from './pages/';
// Detail
import { UserDetailComponent } from './pages/';
// List
import {
  UserListComponent,
  UserListToolbarComponent,
} from './pages/';
import {
  UserDetailAgenciesComponent,
} from './pages/user-detail/components/user-detail-agencies/user-detail-agencies.component';
import {
  UserDetailButtonsComponent,
} from './pages/user-detail/components/user-detail-buttons/user-detail-buttons.component';
import {
  UserDetailFormComponent,
} from './pages/user-detail/components/user-detail-form/user-detail-form.component';
import {
  UserDetailInfoComponent,
} from './pages/user-detail/components/user-detail-info/user-detail-info.component';
import {
  UserDetailToolbarComponent,
} from './pages/user-detail/components/user-detail-toolbar/user-detail-toolbar.component';
import { UserManagerRoutingModule } from './user-manager-routing.module';
//Main
import { UserManagerComponent } from './user-manager.component';
import { UserListTableComponent } from './pages/user-list/components/user-list-table/user-list-table.component';

@NgModule({
  declarations: [
    // Main
    UserManagerComponent,

    //Common
    UserBrandComponent,
    UserHeaderComponent,
    UserSidenavComponent,
    UserToolbarComponent,

    //List
    UserListComponent,
    UserListToolbarComponent,

    //Detail
    UserDetailComponent,
    UserDetailButtonsComponent,
    UserDetailFormComponent,
    UserDetailToolbarComponent,
    UserDetailInfoComponent,
    UserDetailAgenciesComponent,
    UserListTableComponent,
  ],
  imports: [CommonModule, SharedManagerModule, UserManagerRoutingModule],
})
export class UserManagerModule {}
