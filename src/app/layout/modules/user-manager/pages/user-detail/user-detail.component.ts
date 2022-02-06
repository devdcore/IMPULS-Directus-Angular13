import { Component, OnInit } from '@angular/core';

import { SharedStateService } from '@shared/modules';

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  stateTemp;
  constructor(private stateService: SharedStateService) {
    this.stateTemp = this.stateService.stateTemp;
  }
  ngOnInit(): void {}
}
