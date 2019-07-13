import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatabaseService } from 'src/app/shared';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { defineBase } from '@angular/core/src/render3';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
  constructor(private modalService: NgbModal, public router: Router, public db: DatabaseService) {
    if (this.db.role === 'admin') {
      this.router.navigate(['logs']);
    }
  }

  public carName: string;
  public carId: string;
  public gpsId: string;
  public nodeList: Observable<any[]>;
  public hightLevel: number;
  public lowLevel: number;
  public setting_id: string;

  addNodeModal(content) {
    this.modalService.open(content, { centered: true });
  }
  settingBox(setting, setting_id) {
    this.setting_id = setting_id;
    this.modalService.open(setting, { centered: true });
  }

  addNode() {
    const carData = {
      carName: this.carName,
      car_id: this.carId,
      nodeId: this.carId,
      gpsId: this.gpsId,
      description: 'Test version'
    };

    if (this.carName == null || this.carId == null || this.gpsId == null) {
      console.log('invalid data!');
    } else {
      this.db.addNewCar(carData);
    }
    this.modalService.dismissAll();
    this.carName = null;
    this.carId = null;
    this.gpsId = null;
  }
  ngOnInit() {
    this.nodeList = this.db.getNodeByUser();
  }

  setNotification() {
    if (this.hightLevel == null || this.lowLevel == null) {
      console.log('invalid data!');
    } else {
      if (this.setting_id != null) {
        const dataSetting = {
          car_id : this.setting_id,
          hightLevel : this.hightLevel,
          lowLevel: this.lowLevel
        };
        this.db.setNotification(dataSetting);
        this.setting_id = null;
      }
    }

    this.hightLevel = null;
    this.lowLevel = null;
    this.modalService.dismissAll();
  }
}
