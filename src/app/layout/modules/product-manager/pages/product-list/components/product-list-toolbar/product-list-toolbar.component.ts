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
  selector: 'product-list-toolbar',
  templateUrl: './product-list-toolbar.component.html',
  styleUrls: ['./product-list-toolbar.component.scss'],
})
export class ProductListToolbarComponent implements OnInit {
  // isShowFilters = false;

  itemSelected: string = 'name';

  itemFields = [
    'id',
    'status',
    'sort',
    'user_created',
    'date_created',
    'user_updated',
    'date_updated',
    'name',
    'address',
    'suburb',
    'state',
    'country',
    'postalCode',
    'phone',
    'website',
    'facebook',
    'logoUrl',
    'logoBgColor',
    'logoImage',
    'textColor',
    'titleColor',
    'accentColor',
    'contrastColor',
    'userId',
    'productCommission',
    'agentCommission',
    'leadId',
  ];

  optionSelected: string = '_contains';

  optionSearch = [
    { code: '_eq', value: 'Equal to' },
    { code: '_neq', value: 'Not equal to' },
    { code: '_lt', value: 'Less than' },
    { code: '_lte', value: 'Less than or equal to' },
    { code: '_gt', value: 'Greater than' },
    { code: '_gte', value: 'Greater than or equal to' },
    { code: '_in', value: 'Matches any of the values' },
    { code: '_nin', value: "Doesn't match any of the values" },
    { code: '_null', value: 'Is null' },
    { code: '_nnull', value: 'Is not null' },
    { code: '_contains', value: 'Contains the substring' },
    { code: '_ncontains', value: "Doesn't contain the substring" },
    { code: '_starts_with', value: 'Starts with' },
    { code: '_nstarts_with', value: "Doesn't start with" },
    { code: '_ends_with', value: 'Ends with' },
    { code: '_nends_with', value: "Doesn't end with" },
    { code: '_between', value: 'Is between two values (inclusive)' },
    { code: '_nbetween', value: 'Is not between two values (inclusive)' },
    { code: '_empty', value: 'Is empty (null or falsy)' },
    { code: '_nempty', value: 'Is not empty (null or falsy)' },
  ];

  stateTemp;
  constructor(
    private stateService: SharedStateService,
    private actionService: ProductActionService,
    private router: Router
  ) {
    this.stateTemp = this.stateService.stateTemp;
  }

  ngOnInit(): void {}

  onSearchProduct() {
    let searchText = `&filter[${this.itemSelected}][${this.optionSelected}]=${this.stateTemp.productControl.productSearchString}`;
    this.stateTemp.productControl.productSearchString.length > 0
      ? this.actionService.onGetProductList(searchText)
      : this.actionService.onGetProductList('');
  }

  handleKeyUp(e: any) {
    if (e.keyCode === 13) {
      this.onSearchProduct();
    }
  }

  onGetProductList(params?: any) {
    params = `&fields=user_created.first_name, user_created.last_name,user_updated.first_name, user_updated.last_name,*,userId.*,leadId.*,leadId.userId.*,userId.role.*`;
    this.actionService.onGetProductList(params);
  }

  handleNew() {
    this.stateTemp.productControl.productMode = 'new';
    this.stateTemp.productControl.productSelected = new ProductEntity();

    console.log({ new: this.stateTemp.productControl.productSelected });
    this.router.navigate(['/product-manager/product-detail']);
  }

  filterOptions() {
    this.stateTemp.productControl.isShowFilters =
      !this.stateTemp.productControl.isShowFilters;
  }

}
