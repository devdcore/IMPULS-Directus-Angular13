import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// vendor
import { Observable } from 'rxjs';
import { map, retry, tap } from 'rxjs/operators';

// models
import { ProductEntity } from '@shared-manager/models/';
import { ProductDto, SharedStateService } from '@shared/modules';
// root
import { AccessEnvironmentService } from '@shared/modules/access-manager/services';

interface OpportunityParams {
  limit: number;
}

/*************** */

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {
  stateTemp;

  constructor(
    private http: HttpClient,
    private env: AccessEnvironmentService,
    private stateService: SharedStateService,
    private router: Router
  ) {
    this.stateTemp = this.stateService.stateTemp;
  }

  getProductList(params?: string): Observable<ProductEntity[]> {
    this.stateTemp.clearErrorAndMessage();

    const url = `${this.env.apiUrl}/items/product_info/?meta=total_count&meta=filter_count${params}`;

    console.log({ url });

    let response = this.http.get<ProductEntity[]>(url).pipe(
      retry(3),
      map((data: any) => data),
      tap((data: any) => {
        this.stateTemp.productControl.productList = data.data.map(
          (temp: any) => {
            return {
              ...temp,
            };
          }
        );
        this.stateTemp.productControl.productTotalCount = data.meta.total_count;
        this.stateTemp.productControl.productFilterCount =
          data.meta.filter_count;
        console.log({ stateTempGetProductList: this.stateTemp });
      })
    );
    return response;
  }

  getProductItem(id: number, params?: string): Observable<ProductEntity> {
    console.log('start getProductItem');

    this.stateTemp.clearErrorAndMessage();
    const url = `${this.env.apiUrl}/items/product_info/${id}${params}`;

    console.log({ url });

    let response = this.http.get<ProductEntity>(url).pipe(
      map((data: any) => data.data),
      tap((data: any) => {
        console.log('Procesing.......');
        let temp = data;

        this.stateTemp.productControl.productSelected = temp;
        // console.log({data})
        // console.log({productSelected: this.stateTemp.productControl.productSelected})
      })
    );
    return response;
  }

  opportunityList(params?: OpportunityParams): Observable<any> {
    this.stateTemp.clearErrorAndMessage();

    const url = `${this.env.apiUrl}/auth/login`;
    let response = this.http.get<any>(url).pipe(map((data) => data));
    return response;
  }

  toogleStatusProductItem(id: number, status: string) {
    this.stateTemp.clearErrorAndMessage();
    const url = `${this.env.apiUrl}/items/product_info/${id}`;

    let body = {
      status: status == 'archived' ? 'published' : 'archived',
    };

    let response = this.http
      .patch<ProductEntity>(url, body)
      .pipe(map((data: any) => data.data));
    return response;
  }

  createProduct(item: ProductDto): Observable<ProductEntity> {
    console.log('start createProduct');

    this.stateTemp.clearErrorAndMessage();
    const url = `${this.env.apiUrl}/items/product_info/`;

    console.log({ url });

    let response = this.http.post<ProductEntity>(url, item).pipe(
      retry(3),
      map((data: any) => data.data),
      tap((data: any) => {
        console.log('Procesing.......');
        let temp = data;

        this.stateTemp.productControl.productSelected = temp;
        // console.log({data})
        // console.log({productSelected: this.stateTemp.productControl.productSelected})
      })
    );
    return response;
  }

  updateProduct(item: ProductDto): Observable<ProductEntity> {
    console.log('start createProduct');

    this.stateTemp.clearErrorAndMessage();
    const url = `${this.env.apiUrl}/items/product_info/${item.id}`;

    console.log({ url });

    let response = this.http.patch<ProductEntity>(url, item).pipe(
      retry(3),
      map((data: any) => data.data),
      tap((data: any) => {
        console.log('Procesing.......');
        let temp = data;

        this.stateTemp.productControl.productSelected = temp;
        // console.log({data})
        // console.log({productSelected: this.stateTemp.productControl.productSelected})
      })
    );
    return response;
  }
}
