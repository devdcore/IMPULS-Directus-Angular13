import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ProductActionService } from '@product-manager/services';
import {
  AccessEnvironmentService,
  ProductEntity,
  SharedStateService,
} from '@shared/modules';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'product-detail-form',
  templateUrl: './product-detail-form.component.html',
  styleUrls: ['./product-detail-form.component.scss'],
})
export class ProductDetailFormComponent implements OnInit {
  form!: FormGroup;
  file!: File;
  selectedFile!: File;

  productSelected!: ProductEntity;

  stateTemp;
  constructor(
    private stateService: SharedStateService,
    private actionService: ProductActionService,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private env: AccessEnvironmentService
  ) {
    this.stateTemp = this.stateService.stateTemp;

    this.getReadOnly();
    this.onFillForm();
  }

  ngOnInit(): void {
    if (!this.productSelected.id) {
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
    this.productSelected =
      this.stateService.stateTemp.productControl.productSelected;

    this.stateTemp.productControl.productForm = this.formBuilder.group({
      id: [this.productSelected.id],
      status: [this.productSelected.status],
      sort: [this.productSelected.sort],
      user_created: [this.productSelected.user_created],
      date_created: [this.productSelected.user_updated],
      user_updated: [this.productSelected.user_updated],
      date_updated: [this.productSelected.date_updated],

      sku: [this.productSelected.sku],
      productName: [this.productSelected.productName],
      description: [this.productSelected.description],
      productPrice: [this.productSelected.productPrice],
      subcategoryId: [this.productSelected.subcategoryId],
      productImage: [this.productSelected.productImage],
      size: [this.productSelected.size],
      depth: [this.productSelected.depth],
      width: [this.productSelected.width],
      comments: [this.productSelected.comments],
    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.stateTemp.productControl.productForm.controls;
  }

  //convenience getter for easy access to form fields
  get formControlGetter(): { [key: string]: AbstractControl } {
    return this.stateTemp.productControl.productForm.controls;
  }

  validateInput() {}

  getReadOnly(): boolean {
    return this.actionService.getReadOnly();
  }

  onChange(event: any) {
    this.file = event.target.files[0];
    console.log({ file: this.file });
  }

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
}
