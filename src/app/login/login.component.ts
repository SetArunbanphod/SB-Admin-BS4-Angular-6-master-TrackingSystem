import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { AuthService } from '../shared/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    constructor(
      public router: Router,
      public authService: AuthService
    ) {}
    public email: string;
    public password: string;

    ngOnInit() {}

    onLoggedin() {
        this.authService.SignIn(this.email, this.password);
    }
}
