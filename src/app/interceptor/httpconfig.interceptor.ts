import { Injectable } from '@angular/core';
import { ErrorHandlerService } from '../services/error-handler.service';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
// import { SpinnerService } from '../shared/services/spinner/spinner.service';
import { SweetAlertService } from '../services/sweet-alert/sweet-alert.service';
import { Router } from '@angular/router';



@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(public sweetAlertService: SweetAlertService,
        private errorHandlerService: ErrorHandlerService,
        // private spinnerService: SpinnerService, 
        private router: Router) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        if (!request.headers.has('Content-Type')) {
            // request = request.clone({ headers: request.headers.set('Content-Type', 'multipart/form-data') });
        }

        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
        this.showLoader();
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    this.hideLoader();
                    console.log('event--->>>', event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                if (!navigator.onLine) {
                    const data = {
                        reason: 'No Internet Connection!.',
                        status: error.status
                    };
                    this.hideLoader();
                    this.sweetAlertService.showAlert('error', 'No Internet Connection!.');
                    return throwError(error);
                } else {
                   // this.spinnerService.loaderCount = 1;
                    this.hideLoader();
                    const errorData = this.errorHandlerService.formatErrorData(error);
                    if (errorData.status === 404) {
                        // this.router.navigateByUrl('/not-found', { replaceUrl: true });
                        this.sweetAlertService.showAlert('error', errorData.msg);
                        // return new EmptyObservable();
                    } else if (errorData.status === 401) {
                        localStorage.removeItem('currentUser');
                        this.router.navigateByUrl('/login', { replaceUrl: true });
                    } else {
                        this.sweetAlertService.showAlert('error', errorData.msg);
                    }
                    return throwError(error);
                }

            }));
    }

    /**
     * Shows the Loader on the screen.
     */
    private showLoader(): void {
        // this.spinnerService.start();
        // this.spinnerService.incrementLoaderCount();
    }

    /**
     * hides the loader on the screen
     */
    private hideLoader(): void {
        // this.spinnerService.stop();
        // this.spinnerService.decrementLoaderCount();
    }


}
