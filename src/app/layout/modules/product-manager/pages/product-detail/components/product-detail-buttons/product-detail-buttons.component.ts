import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductActionService } from '@product-manager/services';
import { ProductDto, ProductEntity, SharedStateService } from '@shared/modules';

@Component({
  selector: 'product-detail-buttons',
  templateUrl: './product-detail-buttons.component.html',
  styleUrls: ['./product-detail-buttons.component.scss'],
})
export class ProductDetailButtonsComponent implements OnInit {
  TEMPLATE_TEXT = {
    viewButton: 'Edit this product',
    newButton: 'Save new product',
    editButton: 'Save existing product',
    archiveButton: 'Save new product',
  };

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

  onGetProductItem(params?: any) {
    let id = 0; //this.stateTemp.productControl.productSelected.id as number
    params = '?fields=*,userId.*,userId.role.*';
    this.actionService.onGetProductItem(id, params);
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

  onReturnProductList() {
    this.router.navigate(['product-manager/product-list']);
  }

  onSaveNewProduct() {
    let item = this.onFillProductDto();
    delete item.id;
    this.actionService.onSaveNewProduct(item);
  }

  onSaveExistingProduct() {
    let item = this.onFillProductDto();
    this.actionService.onSaveExistingProduct(item);
  }

  onFillProductDto() {
    let form: ProductEntity = this.stateTemp.productControl.productForm.value;
    let item = new ProductDto();

    item.id=form.id,
    item.status=form.status,
    item.sort= form.sort
    item.user_created=form.user_created,
    item.date_created=form.date_created,
    item.user_updated =form.user_updated,
    item.date_updated=form.date_updated,
    item.sku = form.sku,
    item.productName=form.productName,
    item.description=form.description,
    item.productPrice=form.productPrice,
    item.subcategoryId= form.subcategoryId,
    item.productImage=form.productImage,
    item.size=form.size,
    item.depth =form.depth,
    item.width = form.width,
    item.comments=form.comments

    ;

    return item;
  }

  onEditCurrentProduct() {
    this.stateTemp.productControl.productMode = 'edit';
  }

  onSaveChangeToEdit() {
    this.stateTemp.productControl.productMode = 'edit';
  }

  onArchiveCurrentProduct() {
    let form: ProductEntity = this.stateTemp.productControl.productForm.value;
    let item = new ProductDto();

    let newStatus: any = form.status == 'published' ? 'archived' : 'published';

    item.id = form.id;
    item.status = newStatus;

    this.actionService.onSaveExistingProduct(item);
  }
}
