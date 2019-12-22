import { FileUploadComponent } from '../modules/uploads/file-upload/file-upload.component';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

export class CanDeactivateUploadRedirect implements CanDeactivate<FileUploadComponent> {
    constructor() {
    }

    canDeactivate(target: FileUploadComponent, currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState: RouterStateSnapshot): Promise<boolean> {
        return target.hasChanges();
    }
}