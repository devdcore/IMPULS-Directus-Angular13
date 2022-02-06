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
  DirectusPasswordResetDto,
} from '@shared/modules';

@Component({
  selector: 'reset-form',
  templateUrl: './reset-form.component.html',
  styleUrls: ['./reset-form.component.scss'],
})
export class ResetFormComponent implements OnInit {
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
    this.stateService.state.subscribe((state) => (this.stateTemp = state));
    this.currentURL = window.location.protocol + '//' + window.location.host;
    this.onFillForm();
    console.log({ form: this.formControlGetter });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.onPasswordReset();
  }

  handleSubmit(e: any) {
    e.preventDefault();
    console.log(e);
    this.onPasswordReset();
  }

  handleKeyUp(e: any) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.onPasswordReset();
    }
  }

  onFillForm() {
    this.form = this.formBuilder.group({
      token: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passwordRepeat: ['', [Validators.required]],
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

  onPasswordReset() {
    let resetForm = new DirectusPasswordResetDto();
    resetForm.token = this.form.value.token;
    resetForm.password = this.form.value.password;
    this.actionService.onPasswordReset(resetForm);
  }

  onResetError() {
    this.stateTemp.angularError = new AngularError();
  }
}
