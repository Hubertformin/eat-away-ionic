import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Storage} from '@ionic/storage';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    constructor(private storage: Storage, private router: Router) {}

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const authUser = await this.storage.get('user');
        if (authUser) {
            return true;
        } else {
            this.router.navigate(['/auth']);
            return false;
        }
    }
}
