import { Injectable } from '@angular/core';
import Swal, {  SweetAlertOptions } from 'sweetalert2';
import { IConfirmBox } from '../../models/common.model';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  // public showAlert(errorType: SweetAlertType, msg: string, title = '') {
  //   return Swal.fire({ type: errorType, title, html: msg, });
  // }

  public showAlert(errorType: any, msg: string, title = '') {
    return Swal.fire(title, msg, errorType);
  }

  public showConfirmation(data: SweetAlertOptions) {
    return Swal.fire(data);
  }
}
