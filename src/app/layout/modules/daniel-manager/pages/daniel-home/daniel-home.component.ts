import {
  Component,
  OnInit,
} from '@angular/core';

import {
  DirectusLoginDTO,
  SharedStateService,
} from '@shared/modules';

import { LandingActionService } from '../../../';

@Component({
  selector: 'daniel-home',
  templateUrl: './daniel-home.component.html',
  styleUrls: ['./daniel-home.component.scss'],
})
export class DanielHomeComponent implements OnInit {
  stateTemp;
  constructor(
    private stateService: SharedStateService, 
    private landingActionService: LandingActionService) {
    this.stateTemp = this.stateService.stateTemp;
  }

  ngOnInit(): void {
    this.stateService.stateTemp.danielControl.userName = 'Daniel';
this.onLogin()
    
  }

  onLogin(){
    let loginForm:DirectusLoginDTO = new DirectusLoginDTO() 
    this.landingActionService.onLogin(loginForm)
  }
}
