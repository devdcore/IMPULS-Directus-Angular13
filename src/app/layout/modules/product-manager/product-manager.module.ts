import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedManagerModule } from '@shared/modules';

//common
import {
  ProductBrandComponent,
  ProductHeaderComponent,
  ProductSidenavComponent,
  ProductToolbarComponent,
} from './pages/';
//Detail
import {
  ProductDetailButtonsComponent,
  ProductDetailComponent,
  ProductDetailDocumentsComponent,
  ProductDetailFormComponent,
  ProductDetailInfoComponent,
  ProductDetailToolbarComponent,
} from './pages/';
//List
import {
  ProductListComponent,
  ProductListToolbarComponent,
} from './pages/';
import {
  ProductListTableComponent,
} from './pages/product-list/components/product-list-table/product-list-table.component';
import { ProductManagerRoutingModule } from './product-manager-routing.module';
//Main
import { ProductManagerComponent } from './product-manager.component';

@NgModule({
  declarations: [
    //Main
    ProductManagerComponent,

    //Common
    ProductBrandComponent,
    ProductToolbarComponent,
    ProductSidenavComponent,
    ProductHeaderComponent,

    //List
    ProductListComponent,
    ProductListToolbarComponent,

    // Detail
    ProductDetailComponent,
    ProductDetailButtonsComponent,
    ProductDetailInfoComponent,
    ProductDetailFormComponent,
    ProductDetailToolbarComponent,
    ProductDetailDocumentsComponent,
    ProductListTableComponent,
  ],
  imports: [CommonModule, ProductManagerRoutingModule, SharedManagerModule],
})
export class ProductManagerModule {}
