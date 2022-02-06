import {
  Component,
  OnInit,
} from '@angular/core';

// services
import {
  AccessStateService,
} from '@shared/modules/access-manager/services/access.state.service';

@Component({
  selector: 'loader',
  templateUrl: './loader-img.component.html',
  styleUrls: ['./loader-img.component.scss'],
})
export class LoaderImgComponent implements OnInit {
  stateTemp;

  loaderText = {
    message: 'Por favor esperar...',
  };

  loaderImg = './assets/img/common/loader/loader-spinner.gif';

  constructor(private stateService: AccessStateService) {
    this.stateTemp = this.stateService.stateTemp;
  }

  ngOnInit(): void {}
}
