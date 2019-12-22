import { Injectable } from '@angular/core';
// import { ErrorDialogComponent } from '../components/error-dialog/error-dialog.component';
// import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AppConstants } from '../helpers/constants/constants';


@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  closeResult: string;

  constructor() { }

  public formatErrorData(error: any) {
    const status = error.status;
    switch (status) {
      case 404:
        return { type: 'error', status: status, msg: AppConstants.Messages.Error404 };
        break;
      case 400:
        const errors = error.error.message;
        let errMsg = '';
        if (Array.isArray(errors)) {
          errMsg = errors.join('<br>');
        } else {
          errMsg = errors;
        }
        return { type: 'error', status: status, msg: errMsg };
        break;
      case 401:
        return { type: 'error', status: status, msg: 'Not Authenticated.' };
        break;
      case 500:
        return { type: 'error', status: status, msg: AppConstants.Messages.Error500 };
        break;
      default:
        return { type: 'error', status: status, msg: AppConstants.Messages.Error404 };
        break;
    }
  }


}
