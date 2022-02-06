import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { LandingActionService } from '@landing-manager/services';
import {
  SharedStateService,
  SharedStorageService,
} from '@shared/modules';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  stateTemp;
  constructor(
    private stateService: SharedStateService,
    private actionService: LandingActionService,
    private sharedStorageService: SharedStorageService,
    private router: Router
  ) {
    this.stateTemp = this.stateService.stateTemp;

   // this.sharedStorageService.onGetCurrentSession();
    console.log({ isLogged: this.stateTemp.accessControl.isLogged });

    console.log()
    // !this.stateTemp.accessControl.isLogged
    //   ? this.router.navigate(['./landing-manager/login'])
    //   : null;
  }

  ngOnInit(): void {

    console.log("HOME");

  }
}
