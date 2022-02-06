import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductActionService } from '@product-manager/services';
import { ProductEntity, SharedStateService } from '@shared/modules';

@Component({
  selector: 'product-detail-toolbar',
  templateUrl: './product-detail-toolbar.component.html',
  styleUrls: ['./product-detail-toolbar.component.scss'],
})
export class ProductDetailToolbarComponent implements OnInit {
  stateTemp;
  constructor(
    private stateService: SharedStateService,
    private actionService: ProductActionService,
    private router: Router
  ) {
    this.stateTemp = stateService.stateTemp;

    if (!this.stateTemp.productControl.productSelected) {
      this.stateTemp.productControl.productSelected = new ProductEntity();
      this.stateTemp.productControl.productMode = 'new';
    }
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  onGetProductItem(params?: any) {
    let id = 0; //this.stateTemp.productControl.productSelected.id as number
    params = '?fields=*.*';
    this.actionService.onGetProductItem(id, params);
  }

  isEditMode(): boolean {
    let result = false;
    if (this.stateTemp.productControl.productMode == 'edit') {
      result = true;
    }
    return result;
  }

  isProductFormValid() {
    let result = false;
    if (
      this.stateTemp.productControl.productForm.valid &&
      !this.stateTemp.productControl.productForm.pristine
    ) {
      result = true;
    }
    return result;
  }

  handleEdit() {
    this.stateTemp.productControl.productMode = 'edit';
  }

  handleSave() {}

  // onReturnProductList() {
  //   this.router.navigate(['product-manager/product-list']);
  // }
}
