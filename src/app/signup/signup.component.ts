import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
  constructor(public authService: AuthService) {}
  public name: string;
  public email: string;
  public password: string;
  public confirmPassword: string;
  ngOnInit() {}

  signUp() {
    // tslint:disable-next-line:max-line-length
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(this.email) && this.password !== this.confirmPassword) {
      window.alert('The email and password are incorrect!.');
    } else {
      if (!re.test(this.email)) {
        window.alert('The email are incorrect!.');
      } else if (this.password !== this.confirmPassword) {
        window.alert('The password are incorrect!.');
      } else {
        this.authService.SignUp(this.email, this.password);
      }
    }
  }
}
