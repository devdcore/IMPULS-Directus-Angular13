import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

// vendor
// import { NgSelectModule } from '@ng-select/ng-select';
// root
import { AccessControlRouting } from './access-manager-routing.module';
import { AccessControlRoot } from './access-manager.component';
// pages
import {
  AccessDeniedPage,
  ErrorItemPage,
  NotFoundPage,
} from './pages';
// component loader
import { LoaderImgComponent } from './pages/';

@NgModule({
  declarations: [
    // root
    AccessControlRoot,
    // redirect
    AccessDeniedPage,
    ErrorItemPage,
    NotFoundPage,
    // components
    LoaderImgComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AccessControlRouting,
  ],
  exports: [LoaderImgComponent],
})
export class AccessControlModule {}
