import {
  Component,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'user-detail-agencies',
  templateUrl: './user-detail-agencies.component.html',
  styleUrls: ['./user-detail-agencies.component.scss'],
})
export class UserDetailAgenciesComponent implements OnInit {
  modal = document.querySelector('.modal');
  trigger = document.querySelector('.trigger');
  closeButton = document.querySelector('.close-button');

  constructor() {}

  ngOnInit(): void {}

  toggleModal() {
    this.modal?.classList.toggle('show-modal');
  }

  windowOnClick(event: any) {
    if (event.target === this.modal) {
      this.toggleModal();
    }
  }
}
