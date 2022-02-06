import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { SharedStateService } from '../../';
import {
  LandingActionService,
} from '../../../../../layout/modules/landing-manager/services/landing.action.service';
import {
  mainMenu,
  MenuEntity,
} from './navigation-data.component';

@Component({
  selector: 'navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss'],
})
export class NavigationMenuComponent implements OnInit {
  TEMPLATE_LOGIC = {
    isBuilder: false,
  };

  mainMenu : MenuEntity[] = mainMenu;
  currentRoute: string;

  stateTemp;
  constructor(
    private stateService: SharedStateService,
    private router: Router,
    private landingActionService: LandingActionService
  ) {

      this.stateTemp = this.stateService.stateTemp;
      this.currentRoute = router.url;

  }

  seeBuilder(): void {
    this.TEMPLATE_LOGIC.isBuilder = !this.TEMPLATE_LOGIC.isBuilder;
  }

  ngOnInit(): void {}

  isActive(route: string, paths: MenuEntity[] | undefined) : boolean {

    if (paths) {

      let existing = false;
      paths.forEach(element => {

        (this.currentRoute.includes(element.path)) ? existing = true : null

      })

      if (existing) return true
    }

    return this.currentRoute.includes(route)

  }

  onLogout() {

    this.landingActionService.onLogout();


  }

}
