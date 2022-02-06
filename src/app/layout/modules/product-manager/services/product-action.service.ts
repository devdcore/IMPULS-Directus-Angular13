import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// services
import { ProductApiService } from '@product-manager/services';
import {
  ProductDto,
  SharedStateService,
} from '@shared/modules';

@Injectable({
  providedIn: 'root',
})
export class ProductActionService {
  stateTemp;

  constructor(
    private stateService: SharedStateService,
    private apiService: ProductApiService,
    private router: Router
  ) {
    this.stateTemp = this.stateService.stateTemp;
  }

  onGetProductList(params?: any): void {
    // API CALL
    this.apiService.getProductList(params).subscribe({
      next: (data) => {
        console.log({
          onGetProductList: this.stateTemp.productControl.productList,
        });
      },
      error: (error) => {
        console.log;
        this.stateTemp.angularError = error;
      },
      complete: () => console.log('onGetProductList Complete'),
    });
  }

  onGetProductItem(id: number, params?: string): void {
    // API CALL
    this.apiService.getProductItem(id, params).subscribe({
      next: (data) => {
        console.log({
          onGetProductItem: this.stateTemp.productControl.productSelected,
        });
      },
      error: (error) => {
        console.log;
        this.stateTemp.angularError = error;
      },
      complete: () => console.log('onGetProductItem Complete'),
    });
  }

  onGetCurrenUser() {
    let temp = sessionStorage.getItem('currentUser');
    temp ? (this.stateTemp.accessControl.currentUser = JSON.parse(temp)) : null;
  }

  getReadOnly(): boolean {
    let result = true;

    if (
      this.stateTemp.productControl.productMode == 'edit' ||
      this.stateTemp.productControl.productMode == 'new'
    ) {
      result = false;
    }

    return result;
  }

  onSaveNewProduct(item: ProductDto) {
    // API CALL
    this.apiService.createProduct(item).subscribe({
      next: (data) => {
        console.log({
          onSaveNewProduct: this.stateTemp.productControl.productSelected,
          currentState: (this.stateTemp.productControl.productMode = 'view'),
        });
      },
      error: (error) => {
        console.log;
        this.stateTemp.angularError = error;
      },
      complete: () => console.log('onSaveNewProduct Complete'),
    });
  }
  onSaveExistingProduct(item: ProductDto) {
    // API CALL
    this.apiService.updateProduct(item).subscribe({
      next: (data) => {
        console.log({
          onSaveNewProduct: this.stateTemp.productControl.productSelected,
          currentState: (this.stateTemp.productControl.productMode = 'view'),
        });
      },
      error: (error) => {
        console.log;
        this.stateTemp.angularError = error;
      },
      complete: () => console.log('onSaveNewProduct Complete'),
    });
  }

  onArchiveCurrentProduct() {

  }
}
