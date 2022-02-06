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
} from '@shared/modules';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
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
  }
  

  ngOnInit(): void {}

  onSubmit() {
    this.onLogin();
  }

  handleSubmit(e: any) {
    e.preventDefault();
    console.log(e);
    this.onLogin();
  }

  handleKeyUp(e: any) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.onLogin();
    }
  }

  onFillForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required]],
      otp: [''],
      mode: [''],
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

  onLogin() {
    let loginForm = new DirectusLoginDTO();
    loginForm.email = this.form.value.email;
    loginForm.password = this.form.value.password;
    // loginForm.otp = '';
    // loginForm.mode = '';
    this.actionService.onLogin(loginForm);
  }

  onLogout() {
    this.actionService.onLogout();
  }

  onResetError() {
    this.stateTemp.angularError = new AngularError();
  }
}
