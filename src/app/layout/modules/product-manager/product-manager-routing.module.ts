import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ProductListComponent,
  ProductDetailComponent,
} from '@product-manager/pages';

import { ProductManagerComponent } from './product-manager.component';

const routes: Routes = [
  { path: '', redirectTo: 'product-list', pathMatch: 'full' },

  {
    path: '',
    component: ProductManagerComponent,
    children: [
      { path: 'product-list', component: ProductListComponent },
      { path: 'product-detail', component: ProductDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductManagerRoutingModule {}
