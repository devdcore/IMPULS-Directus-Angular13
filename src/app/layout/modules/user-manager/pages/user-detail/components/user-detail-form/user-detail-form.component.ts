import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';

import {
  AccessEnvironmentService,
  AgencyEntity,
  RoleEntity,
  SharedModalService,
  SharedStateService,
  UserEntity,
} from '@shared/modules';
import { UserActionService } from '@user-manager/services';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'user-detail-form',
  templateUrl: './user-detail-form.component.html',
  styleUrls: ['./user-detail-form.component.scss'],
})
export class UserDetailFormComponent implements OnInit {
  form!: FormGroup;
  file!: File;
  selectedFile!: File;

  userSelected: UserEntity = new UserEntity();
  roleSelected: RoleEntity = new RoleEntity();
  agencySelected: AgencyEntity = new AgencyEntity();

  roleOptions = [new RoleEntity()];
  typeOptions = [
    { id: 'corporate', name: 'Corporate' },
    { id: 'agency', name: 'Agency' },
  ];

  stateTemp;
  constructor(
    private stateService: SharedStateService,
    private actionService: UserActionService,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private env: AccessEnvironmentService,
    private modalService: SharedModalService
  ) {
    this.stateTemp = this.stateService.stateTemp;
    this.onGetRolesList();
    this.onFillForm();
  }

  ngOnInit(): void {
    if (!this.userSelected.id) {
      console.log('none');
    }
  }

  onSubmit() {
    this.validateInput();
  }

  handleSubmit(e: any) {
    e.preventDefault();
    console.log(e);
    // this.onLogin();
  }

  handleKeyUp(e: any) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.validateInput();
    }
  }

  onFillForm() {
    this.userSelected = this.stateTemp.userControl.userSelected;
    this.roleSelected = this.stateTemp.userControl.userSelected
      .role as RoleEntity;
    this.agencySelected = this.stateTemp.userControl.userSelected
      .agencyId as AgencyEntity;

    this.stateTemp.userControl.userForm = this.formBuilder.group({
      id: [this.userSelected?.id],
      status: [this.userSelected?.status],
      first_name: [this.userSelected?.first_name],
      last_name: [this.userSelected?.last_name],
      email: [this.userSelected?.email],
      role: [this.roleSelected?.name],
      userType: [this.userSelected?.userType],
      phone: [this.userSelected?.phone],
      agencyId: [this.agencySelected?.name],
    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.stateTemp.userControl.userForm.controls;
  }

  //convenience getter for easy access to form fields
  get formControlGetter(): { [key: string]: AbstractControl } {
    return this.stateTemp.userControl.userForm.controls;
  }

  validateInput() {}

  getReadOnly(): boolean {
    return this.actionService.getReadOnly();
  }

  onChange(event: any) {
    this.file = event.target.files[0];
    console.log({ file: this.file });
  }

  onPatchValueUser(item: string) {}

  processFile(imageInput: any) {
    console.log(imageInput.target);
    // this.file = imageInput.files[0];
    // const reader = new FileReader();

    // reader.addEventListener('load', (event: any) => {
    //   this.selectedFile = new ImageSnippet(event.target.result, file);

    //   this.imageService.uploadImage(this.selectedFile.file).subscribe(
    //     (res) => {},
    //     (err) => {}
    //   );
    // });

    // reader.readAsDataURL(file);
  }

  onFileSelected(event: any) {
    console.log(event);
    const temp = event.target.files[0];
    console.log({ temp });
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    const fd = new FormData();
    // fd.append('image', this.selectedFile, this.selectedFile.)
    // this.http.post()
  }

  // onPatchValueUser(filedName: string) {
  //   this.actionService.onPatchValueUser(filedName);
  // }

  onGetRolesList() {
    this.actionService.onGetRolesList();
  }

  onFilterRole(item: string) {
    this.roleOptions = this.stateTemp.userControl.userRoleList.filter((x) => {
      return x.group == item;
    });
    this.stateTemp.userControl.userForm.patchValue({
      role: '',
    });
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
