import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import {
  SharedStateService,
  UserEntity,
} from '@shared/modules';
import { UserActionService } from '@user-manager/services';

@Component({
  selector: 'user-list-toolbar',
  templateUrl: './user-list-toolbar.component.html',
  styleUrls: ['./user-list-toolbar.component.scss'],
})
export class UserListToolbarComponent implements OnInit {
  // isShowFilters = false;

  itemSelected: string = 'name';

  itemFields = ['id', 'first_name', 'last_name', 'email'];

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
    private actionService: UserActionService,
    private router: Router
  ) {
    this.stateTemp = this.stateService.stateTemp;
  }

  ngOnInit(): void {}

  onSearchUser() {
    let searchText = `&filter[${this.itemSelected}][${this.optionSelected}]=${this.stateTemp.userControl.userSearchString}`;
    this.stateTemp.userControl.userSearchString.length > 0
      ? this.actionService.onGetUserList(searchText)
      : this.actionService.onGetUserList('');
  }

  handleKeyUp(e: any) {
    if (e.keyCode === 13) {
      this.onSearchUser();
    }
  }

  onGetUserList(params?: any) {
    params = `&fields=user_created.first_name, user_created.last_name,user_updated.first_name, user_updated.last_name,*,userId.*,leadId.*,leadId.userId.*,userId.role.*`;
    this.actionService.onGetUserList(params);
  }

  handleNew() {
    this.stateTemp.userControl.userMode = 'new';
    this.stateTemp.userControl.userSelected = new UserEntity();

    console.log({ new: this.stateTemp.userControl.userSelected });
    this.router.navigate(['/user-manager/user-detail']);
  }

  filterOptions() {
    this.stateTemp.userControl.isShowFilters =
      !this.stateTemp.userControl.isShowFilters;
  }
}
