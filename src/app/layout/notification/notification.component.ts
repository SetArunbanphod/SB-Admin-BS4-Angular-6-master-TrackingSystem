import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/shared';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  constructor(public db: DatabaseService) {}

  public notifyList: Observable<{}>;
  ngOnInit() {
    this.notifyList = this.db.getNotification();
    // this.notifyList.forEach(item => {
    //   console.log(item);
    // });
  }
  deleteNotification(key) {
    this.db.deleteNotifyByKey(key);
  }
}
