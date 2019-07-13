import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';


@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
  animations: [routerTransition()]
})
export class VerifyEmailComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
