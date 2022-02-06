import {
  Component,
  OnInit,
} from '@angular/core';

import {
  ConfirmationService,
  MessageService,
} from 'primeng/api';

import { ProductActionService } from '@product-manager/services';
import { SharedStateService } from '@shared/modules';

class Product {
  id?: number;
  status?: string;
  sort?: number;
  user_created?: string;
  date_created?: string;
  user_updated?: string;
  date_updated?: string;

  sku?: string;
  productName?: string;
  description?: string;
  productPrice?: string;
  subcategoryId?: number;
  productImage?: any;
  size?: any;
  depth?: any;
  width?: any;
  comments?: any;

  code?: string;
  name?: string;

  price?: number;
  quantity?: number;
  inventoryStatus?: string;
  category?: string;
  image?: string;
  rating?: number;

  constructor() {
    this.id = -1;
    this.price = 0;
    this.quantity = 0;
    this.inventoryStatus = '';
    this.category = '';
    this.image = '';
    this.rating = 0;
    this.name = '';
  }
}

@Component({
  selector: 'product-list-table',
  templateUrl: './product-list-table.component.html',
  styleUrls: ['./product-list-table.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class ProductListTableComponent implements OnInit {
  productDialog: boolean = false;

  products: Product[] = [new Product()];

  product: Product = new Product();

  selectedProducts!: Product[] | null;

  submitted: boolean = false;

  statuses: any[] = [];

  event!: Event;

  stateTemp;
  constructor(
    private productService: ProductActionService,
    private stateService: SharedStateService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.stateTemp = this.stateService.stateTemp;
  }

  ngOnInit() {
    this.productService.onGetProductList('');

    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' },
    ];
  }

  handleInput(event: Event) {
    // this.event = (event.target as HTMLInputElement).value;
  }

  openNew() {
    this.product = new Product();
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter(
          (val) => !this.selectedProducts?.includes(val)
        );
        this.selectedProducts = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Products Deleted',
          life: 3000,
        });
      },
    });
  }

  editProduct(product: Product) {
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter((val) => val.id !== product.id);
        this.product = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    this.product.name = '';
    this.product.id = -1;

    if (this.product.name.trim()) {
      if (this.product.id) {
        this.products[this.findIndexById(this.product.id.toString())] =
          this.product;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Updated',
          life: 3000,
        });
      } else {
        this.product.id = Number(this.createId());
        this.product.image = 'product-placeholder.svg';
        this.products.push(this.product);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Created',
          life: 3000,
        });
      }

      this.products = [...this.products];
      this.productDialog = false;
      this.product = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id?.toString() == id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}
