import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import {
  SharedStateService,
  UserDto,
  UserEntity,
} from '@shared/modules';
import { UserActionService } from '@user-manager/services';

@Component({
  selector: 'user-detail-buttons',
  templateUrl: './user-detail-buttons.component.html',
  styleUrls: ['./user-detail-buttons.component.scss'],
})
export class UserDetailButtonsComponent implements OnInit {
  TEMPLATE_TEXT = {
    viewButton: 'Edit this user',
    newButton: 'Save new user',
    editButton: 'Save existing user',
    archiveButton: 'Save new user',
  };

  stateTemp;
  constructor(
    private stateService: SharedStateService,
    private actionService: UserActionService,
    private router: Router
  ) {
    this.stateTemp = stateService.stateTemp;

    if (!this.stateTemp.userControl.userSelected) {
      this.stateTemp.userControl.userSelected = new UserEntity();
      this.stateTemp.userControl.userMode = 'new';
    }
  }

  ngOnInit(): void {}

  onGetUserItem(params?: any) {
    let id = 0; //this.stateTemp.userControl.userSelected.id as number
    params = '?fields=*,userId.*,userId.role.*';
    this.actionService.onGetUserItem(id, params);
  }

  isUserFormValid() {
    let result = false;
    if (
      this.stateTemp.userControl.userForm.valid &&
      !this.stateTemp.userControl.userForm.pristine
    ) {
      result = true;
    }
    return result;
  }

  onReturnUserList() {
    this.router.navigate(['user-manager/user-list']);
  }

  onSaveNewUser() {
    let item = this.onFillUserDto();
    delete item.id;
    this.actionService.onSaveNewUser(item);
  }

  onSaveExistingUser() {
    let item = this.onFillUserDto();
    this.actionService.onSaveExistingUser(item);
  }

  onFillUserDto() {
    let form: UserEntity = this.stateTemp.userControl.userForm.value;
    let item = new UserDto();

    item.id = form.id as string;
    item.status = form.id as string;
    item.first_name = form.id as string;
    item.last_name = form.id as string;
    item.email = form.id as string;
    item.role = form.id as string;
    item.userType = form.id as string;
    item.phone = form.id as string;
    item.agencyId = form.id as string;
    // item.password = form.id as string;
    // item.location = form.id as string;
    // item.title = form.id as string;
    // item.description = form.id as string;
    // item.tags = form.id as string;
    // item.avatar = form.id as string;
    // item.language = form.id as string;
    // item.theme = form.id as string;
    // item.tfa_secret = form.id as string;
    // item.token = form.id as string;
    // item.last_access = form.id as string;
    // item.last_page = form.id as string;
    // item.provider = form.id as string;
    // item.external_identifier = form.id as string;
    // item.auth_data = form.id as string;
    // item.email_notifications = form.id as string;
    // item.confirmed = form.id as boolean;

    // item.name = form.name;
    // item.address = form.address;
    // item.suburb = form.suburb;
    // item.state = form.state;
    // item.country = form.country;
    // item.postalCode = form.postalCode;
    // item.phone = form.phone;
    // item.website = form.website;
    // item.facebook = form.facebook;
    // item.logoUrl = form.logoUrl;
    // item.logoBgColor = form.logoBgColor;
    // item.logoImage = form.logoImage;
    // item.textColor = form.textColor;
    // item.titleColor = form.titleColor;
    // item.accentColor = form.accentColor;
    // item.contrastColor = form.contrastColor;
    // item.userCommission = form.userCommission;
    // item.agentCommission = form.agentCommission;
    // item.logoType = form.logoType;

    return item;
  }

  onEditCurrentUser() {
    this.stateTemp.userControl.userMode = 'edit';
  }

  onSaveChangeToEdit() {
    this.stateTemp.userControl.userMode = 'edit';
  }

  onArchiveCurrentUser() {
    let form: UserEntity = this.stateTemp.userControl.userForm.value;
    let item = new UserDto();

    let newStatus: any = form.status == 'published' ? 'archived' : 'published';

    item.id = form.id;
    item.status = newStatus;

    this.actionService.onSaveExistingUser(item);
  }
}
