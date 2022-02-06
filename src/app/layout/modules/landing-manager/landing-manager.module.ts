import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  HomePageComponent,
  HomeSidebarComponent,
  LandingFooterComponent,
  LandingHeaderComponent,
  LoggedMessageComponent,
  LoginFormComponent,
  LoginPageComponent,
  RegisterFormComponent,
  RegisterPageComponent,
  RequestFormComponent,
  ResetFormComponent,
  ResetPageComponent,
} from '@landing-manager/pages/';
import { SharedManagerModule } from '@shared/modules';

import { LandingManagerRoutingModule } from './landing-manager-routing.module';
import { LandingManagerComponent } from './landing-manager.component';
import {
  HomeImageComponent,
} from './pages/home-page/components/home-image/home-image.component';
import {
  HomeMenuComponent,
} from './pages/home-page/components/home-sidebar/components/home-menu/home-menu.component';

@NgModule({
  declarations: [
    LandingManagerComponent,

    HomePageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ResetPageComponent,
    LandingHeaderComponent,
    LandingFooterComponent,
    LoginFormComponent,
    ResetFormComponent,
    RequestFormComponent,
    RegisterFormComponent,
    LoggedMessageComponent,
    HomeSidebarComponent,
    HomeMenuComponent,
    HomeImageComponent,
  ],
  imports: [CommonModule, SharedManagerModule, LandingManagerRoutingModule],
})
export class LandingManagerModule {}
