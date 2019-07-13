import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router , public authServce: AuthService) {}

    canActivate() {
        if (this.authServce.isLoggedIn) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}
