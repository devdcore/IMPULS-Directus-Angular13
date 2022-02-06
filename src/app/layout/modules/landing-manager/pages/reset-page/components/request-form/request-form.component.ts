import {
  Component,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { LandingActionService } from '@landing-manager/services';
import { SharedStateService } from '@shared-manager/services';
import {
  AngularError,
  DirectusLoginDTO,
  DirectusPasswordRequestDto,
} from '@shared/modules';

@Component({
  selector: 'request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss'],
})
export class RequestFormComponent implements OnInit {
  form!: FormGroup;
  dto!: DirectusLoginDTO;
  currentURL!: string;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';

  stateTemp;
  constructor(
    private formBuilder: FormBuilder,
    private actionService: LandingActionService,
    private stateService: SharedStateService
  ) {
    this.stateTemp = this.stateService.stateTemp;
    this.currentURL = window.location.protocol + '//' + window.location.host;
    this.onFillForm();
    console.log({ form: this.formControlGetter });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.onPasswordRequest();
  }

  handleSubmit(e: any) {
    e.preventDefault();
    console.log(e);
    this.onPasswordRequest();
  }

  handleKeyUp(e: any) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.onPasswordRequest();
    }
  }

  onFillForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  //convenience getter for easy access to form fields
  get formControlGetter(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onPasswordRequest() {
    let requestForm = new DirectusPasswordRequestDto();
    requestForm.email = this.form.value.email;
    this.actionService.onPasswordRequest(requestForm);
  }

  onRequestError() {
    this.stateTemp.angularError = new AngularError();
  }
}
