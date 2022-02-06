import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { SharedStateService } from '@shared/modules';
import { UserActionService } from '@user-manager/services';

@Component({
  selector: 'user-list-table',
  templateUrl: './user-list-table.component.html',
  styleUrls: ['./user-list-table.component.scss'],
  providers: [MessageService],
})
export class UserListTableComponent implements OnInit {
  cols;
  stateTemp;
  constructor(
    private stateService: SharedStateService,
    private actionService: UserActionService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.stateTemp = this.stateService.stateTemp;
    this.cols = [
      { field: 'first_name', header: 'First name' },
      { field: 'last_name', header: 'Last name' },
      { field: 'email', header: 'Email' },
      { field: 'phone', header: 'Phone' },
      { field: 'userType', header: 'Type' },
    ];
  }

  ngOnInit(): void {}

  /* crud */

  /* TOSTER */
  addSingle() {
    this.messageService.add({
      severity: 'success',
      summary: 'Service Message',
      detail: 'Via MessageService',
    });
  }

  addMultiple() {
    this.messageService.addAll([
      {
        severity: 'success',
        summary: 'Service Message',
        detail: 'Via MessageService',
      },
      {
        severity: 'info',
        summary: 'Info Message',
        detail: 'Via MessageService',
      },
    ]);
  }

  clear() {
    this.messageService.clear();
  }
}
