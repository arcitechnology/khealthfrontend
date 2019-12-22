import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

export class CanDeactivateUploadRedirect implements CanDeactivate<FileUploadComponent> {
    constructor() {
    }

    canDeactivate(currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState: RouterStateSnapshot): Promise<boolean> {
        return target.hasChanges();
    }
}