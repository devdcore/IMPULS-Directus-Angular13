import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DanielManagerRoutingModule } from './daniel-manager-routing.module';
import { DanielManagerComponent } from './daniel-manager.component';
import { DanielTextDirective } from './helpers/daniel-text.directive';
import { DanielHomeComponent } from './pages/daniel-home/daniel-home.component';
import { DanielHeaderComponent } from './pages/common/components/daniel-header/daniel-header.component';

@NgModule({
  declarations: [DanielManagerComponent, DanielTextDirective, DanielHomeComponent, DanielHeaderComponent],
  imports: [CommonModule, DanielManagerRoutingModule],
})
export class DanielManagerModule {}
