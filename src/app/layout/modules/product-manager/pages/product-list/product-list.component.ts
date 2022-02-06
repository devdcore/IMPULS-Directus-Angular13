import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { ProductActionService } from '@product-manager/services';
import {
  ProductEntity,
  SharedStateService,
} from '@shared/modules';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  stateTemp;
  constructor(
    private stateService: SharedStateService,
    private actionService: ProductActionService,
    private router: Router
  ) {
    this.stateTemp = this.stateService.stateTemp;
    this.onGetProductList();
  }

  ngOnInit(): void {}

  onSearchProduct() {
    let searchText = `&filter[name][_contains]=${this.stateTemp.productControl.productSearchString}`;
    this.stateTemp.productControl.productSearchString.length > 0
      ? this.actionService.onGetProductList(searchText)
      : this.actionService.onGetProductList('');
    console.log('hola', searchText);
  }

  handleKeyUp(e: any) {
    if (e.keyCode === 13) {
      this.onSearchProduct();
    }
  }

  onGetProductList(params?: any) {
    params =
      '&fields=user_created.first_name, user_created.last_name,user_updated.first_name, user_updated.last_name,*,userId.*,leadId.*,leadId.userId.*,userId.role.*';
    this.actionService.onGetProductList(params);
  }

  handleNew() {
    this.stateTemp.productControl.productMode = 'new';
    this.stateTemp.productControl.productSelected = new ProductEntity();

    console.log({ new: this.stateTemp.productControl.productSelected });
    this.router.navigate(['/product-manager/product-detail']);
  }


}
