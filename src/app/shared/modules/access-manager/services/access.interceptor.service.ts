import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

// vendor
import {
  Observable,
  throwError,
} from 'rxjs';
import {
  catchError,
  tap,
} from 'rxjs/operators';

// models
import {
  AngularError,
  DirectusErrorArray,
  HttpErrorModel,
  NestErrorResponse,
  StrapiErrorResponse,
} from '@shared-manager/models';
// data
import { errorListHttp } from '@shared/modules/access-manager/helpers/data';

import { AccessApiService } from '../';
// services
import { AccessStateService } from './';

@Injectable({
  providedIn: 'root',
})
export class AccessInterceptorService implements HttpInterceptor {
  // private isRefreshing = false;
  // private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  stateTemp;

  constructor(
    private stateService: AccessStateService,
    private apiService: AccessApiService
  ) {
    this.stateTemp = this.stateService.stateTemp;
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = req;

    console.log('INTERCEPTOR');

    let currentSessionText = sessionStorage.getItem('currentSession');

    this.stateTemp.accessControl.currentSession = currentSessionText
      ? JSON.parse(currentSessionText)
      : null;

    this.stateTemp.accessControl.accessToken = this.stateTemp.accessControl
      .currentSession
      ? this.stateTemp?.accessControl?.currentSession?.data?.access_token
      : null;

    this.stateTemp.accessControl.refreshToken = this.stateTemp.accessControl
      .currentSession
      ? this.stateTemp?.accessControl?.currentSession?.data?.refresh_token
      : null;

    /*******************************************************
     * CREATE HEADERS
     */

    //  accessToken = null
    let authorization = this.stateTemp.accessControl.authorization;

    // `"Authorization": accessToken ? Bearer ${ accessToken } : "",` : ''

    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        this.stateTemp.accessControl.accessToken &&
        this.stateTemp.accessControl.authorization
          ? `Bearer ${this.stateTemp.accessControl.accessToken}`
          : '',
    });

    console.log({ headers });

    const clone = req.clone({
      headers,
    });

    /*******************************************************
     * ACTIVATE LOADER ICON
     */

    this.stateTemp.accessControl.isLoading = true;

    return next.handle(clone).pipe(
      tap((event: HttpEvent<any>) => this.handleSuccess(event)),
      catchError((error: HttpErrorResponse) => {
        let lang = this.stateTemp.accessControl.currentLanguage;

        if (
          error instanceof HttpErrorResponse &&
          !authReq.url.includes('auth/login') &&
          error.status === 401
        ) {
          console.log('special case 401');
          //  return this.handle401Error(authReq, next);
          this.apiService.refresh().subscribe({
            next: (data) => {
              data;
            },
            error: console.log,
            complete: console.log,
          });
        }

        if (error instanceof DOMException) {
          this.stateTemp.angularError = this.domExceptionToAngularError(
            error,
            lang
          );
        }

        if (error instanceof DirectusErrorArray) {
          this.stateTemp.angularError = this.directusResponseToAngularError(
            error,
            lang
          );
        }

        if (error instanceof HttpErrorResponse) {
          console.log('Error detected...', error);
          this.stateTemp.angularError = this.directusResponseToAngularError(
            error,
            lang
          );
        }

        if (error instanceof StrapiErrorResponse) {
          this.stateTemp.angularError = this.strapiErrorResponseToAngularError(
            error,
            lang
          );
        }

        if (error instanceof NestErrorResponse) {
          this.stateTemp.angularError = this.nestErrorResponseToAngularError(
            error,
            lang
          );
        }

        this.stateTemp.accessControl.isLoading = false;
        return throwError(this.stateTemp.angularError);
      })
    );
  }

  /*******************************************************
   * HANDLE REQUESTS
   */

  handleSuccess(event: any) {
    this.stateTemp.angularError = new AngularError();
    if (event instanceof HttpResponse) {
      this.stateTemp.accessControl.isLoading = false;
    }
    this.stateTemp.accessControl.isTokenActive = true;
    return event;
  }

  httpErrorResponseToAngularError(
    error: HttpErrorResponse,
    lang: string
  ): AngularError {
    let angularError = new AngularError();
    angularError.active = false;
    angularError.locale = lang;
    angularError.code = error.status;
    angularError.originalError = error;
    angularError.originalMessage = error.statusText;
    angularError.translatedMessage = this.httpErrorToSpanish(error.status);
    angularError.angularMessage =
      angularError.locale == 'es'
        ? angularError.translatedMessage
        : angularError.originalMessage;
    return angularError;
  }

  directusResponseToAngularError(
    error: HttpErrorResponse,
    lang: string
  ): AngularError {
    let angularError = new AngularError();
    angularError.active = false;
    angularError.locale = lang;
    angularError.code = error.status;
    angularError.originalError = error.error.errors[0];
    angularError.originalMessage = error.error.errors[0].message;
    angularError.translatedMessage = error.error.errors[0].message;
    return angularError;
  }

  domExceptionToAngularError(error: DOMException, lang: string): AngularError {
    let angularError = new AngularError();
    angularError.active = false;
    angularError.locale = lang;
    angularError.code = error.message;
    angularError.originalError = error;
    angularError.originalMessage = error.message;
    angularError.translatedMessage = error.message;
    angularError.angularMessage =
      angularError.locale == 'es'
        ? angularError.translatedMessage
        : angularError.originalMessage;
    return angularError;
  }

  strapiErrorResponseToAngularError(error: StrapiErrorResponse, lang: string) {
    let angularError = new AngularError();

    angularError.active = true;
    angularError.locale = lang;
    angularError.code = error.statusCode;
    angularError.originalMessage = error.message[0].messages[0].message;
    angularError.angularMessage =
      angularError.locale == 'es'
        ? angularError.translatedMessage
        : angularError.originalMessage;
    return angularError;
  }

  nestErrorResponseToAngularError(error: NestErrorResponse, lang: string) {
    let angularError = new AngularError();

    angularError.active = true;
    angularError.locale = lang;
    angularError.code = error.code;
    angularError.originalMessage = error.errors[0].message;
    angularError.translatedMessage = this.httpErrorToSpanish(error?.code);
    angularError.angularMessage =
      angularError.locale == 'es'
        ? angularError.translatedMessage
        : angularError.originalMessage;
    return angularError;
  }

  /***************************************************
   * TRANSLATE TO SPANISH ERROR MESSAGES
   */

  httpErrorToSpanish(error?: string | number | null): string {
    let result: HttpErrorModel = {
      errorCode: 0,
      errorName: 'Unknown',
      errorSpanishTranslation:
        'Error desconocido. Revise la conexion con el servidor',
      errorDef:
        'Error que no se puede traducir o el servidor está desconectado',
    };

    const translation: HttpErrorModel[] = errorListHttp.filter(
      (x: HttpErrorModel) => {
        return x.errorCode === error ? x : null;
      }
    );

    translation[0] ? (result = translation[0]) : result;

    return this.stateTemp.accessControl.currentLanguage === 'es'
      ? (result.errorSpanishTranslation as string)
      : '';
  }
}
