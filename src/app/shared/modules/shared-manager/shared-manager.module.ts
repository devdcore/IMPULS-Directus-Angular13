import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import {
  ModalWindowComponent,
  NavigationBrandComponent,
  NavigationHeaderComponent,
  NavigationMenuComponent,
} from './components/';
import {
  NavigationSidebarComponent,
} from './components/navigation-sidebar/navigation-sidebar.component';
import { SharedRoutingModule } from './shared-manager-routing.module';
import { SharedPrimengModule } from './shared.primeng.module';

@NgModule({
  declarations: [
    NavigationMenuComponent,
    NavigationHeaderComponent,
    NavigationBrandComponent,
    NavigationSidebarComponent,
    ModalWindowComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedRoutingModule,
    // vendor
    SharedPrimengModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    // vendor
    SharedPrimengModule,
    // components
    NavigationMenuComponent,
    NavigationHeaderComponent,
    NavigationBrandComponent,
    NavigationSidebarComponent,
    // modal
    ModalWindowComponent,
  ],
  providers: [],
})
export class SharedManagerModule {}
