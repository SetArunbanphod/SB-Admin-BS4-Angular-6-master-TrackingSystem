import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatabaseService } from '../../shared';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nodes',
  templateUrl: './nodes.component.html',
  styleUrls: ['./nodes.component.scss'],
  animations: [routerTransition()]
})
export class NodesComponent implements OnInit {
  public paramMapnodeId: string;
  public nodeId: string;
  public gpsId: string;
  public nodeList: Observable<any[]>;
  batteryLevel: number;
  markersbox: Array<any> = [
    { lat: 16.743593, lng: 100.20413 },
    { lat: 16.74517, lng: 100.20469 },
    { lat: 16.74731, lng: 100.2053 },
    { lat: 16.74941, lng: 100.2039 },
    { lat: 16.75076, lng: 100.2031 },
    { lat: 16.75304, lng: 100.202 },
    { lat: 16.75639, lng: 100.201 },
    { lat: 16.75808, lng: 100.1998 },
    { lat: 16.75682, lng: 100.1953 },
    { lat: 16.75451, lng: 100.1958 },
    { lat: 16.753069, lng: 100.1961 },
    { lat: 16.75191, lng: 100.1962 },
    { lat: 16.75055, lng: 100.1968 },
    { lat: 16.74872, lng: 100.1975 },
    { lat: 16.74689, lng: 100.1982 },
    { lat: 16.74437, lng: 100.1995 },
    { lat: 16.74445, lng: 100.2001 },
    { lat: 16.74591, lng: 100.2023 },
    { lat: 16.7473, lng: 100.2044 }
  ];

  markersgps: Array<any> = [
    { lat: 16.743592, lng: 100.204147 },
    { lat: 16.745179, lng: 100.204666 },
    { lat: 16.747297, lng: 100.205314 },
    { lat: 16.749406, lng: 100.203961 },
    { lat: 16.750769, lng: 100.203099 },
    { lat: 16.753075, lng: 100.201987 },
    { lat: 16.756368, lng: 100.201001 },
    { lat: 16.758048, lng: 100.199838 },
    { lat: 16.75686, lng: 100.195425 },
    { lat: 16.754493, lng: 100.195803 },
    { lat: 16.753059, lng: 100.196057 },
    { lat: 16.751926, lng: 100.19622 },
    { lat: 16.750531, lng: 100.196749 },
    { lat: 16.748712, lng: 100.197491 },
    { lat: 16.746882, lng: 100.198292 },
    { lat: 16.7443002, lng: 100.199554 },
    { lat: 16.744433, lng: 100.20012 },
    { lat: 16.745899, lng: 100.202316 },
    { lat: 16.747249, lng: 100.204467 }
  ];

  gps: Observable<any[]>;

  marker_icon = {
    url: '../../../assets/images/marker_icon.svg',
    scaledSize: {
      width: 60,
      height: 60
    }
  };

  marker_iconBox = {
    url: '../../../assets/images/map-markerbox.svg',
    scaledSize: {
      width: 20,
      height: 20
    }
  };

  marker_iconGPS = {
    url: '../../../assets/images/map-markergps.svg',
    scaledSize: {
      width: 20,
      height: 20
    }
  };

  public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales'];
  public doughnutChartData: number[] = [2, 98];
  public doughnutChartType: string;
  public deleteNodeid: string;

  public notifyNodeId: string;
  public notifyCar: string;
  public notifyTemp: number;
  public notifyTime: string;
  public notifyMessage: string;
  public isNotify: boolean;
  @ViewChild('notification') templateRef: TemplateRef<any>;
  @ViewChild('lowBattery') lowBattery: TemplateRef<any>;

  public batteryNodeId: string;
  public battery: string;
  public batteryCar: string;
  public batteryTime: string;

  constructor(public route: ActivatedRoute, public modalService: NgbModal, public db: DatabaseService) {}
  notifyList: any = [];
  ngOnInit() {
    this.isNotify = true;
    this.paramMapnodeId = this.route.snapshot.paramMap.get('nodeId');
    this.doughnutChartType = 'doughnut';
    this.nodeList = this.db.findNodemcuBycar_id(this.paramMapnodeId);
    this.gps = this.db.findGpsBycar_id(this.paramMapnodeId);
    this.nodeList.subscribe(item => {
      const dataNo = item.find(data => data.notify === true);
      if (dataNo) {
        this.notificationFunction(dataNo);
      }
    });

    this.nodeList.subscribe(item => {
      const dataNo = item.find(data => data.battery <= 25);
      if (dataNo && dataNo.bStatus === true) {
        this.battery = dataNo.battery;
        this.batteryNodeId = dataNo.nodeId;
        this.batteryCar = dataNo.car_id;
        this.batteryTime = dataNo.timestamp;
        this.modalService.dismissAll();
        this.modalService.open(this.lowBattery, { centered: true });
      }
    });
  }
  notificationFunction(dataNo) {
    if (this.isNotify === true) {
      this.notifyCar = dataNo.car_id;
      this.notifyNodeId = dataNo.nodeId;
      this.notifyTemp = dataNo.temperature;
      this.notifyTime = dataNo.timestamp;
      if (dataNo.temperature > dataNo.hightLevel) {
        this.notifyMessage = 'higher than';
      } else {
        this.notifyMessage = 'below';
      }
      this.modalService.dismissAll();
      this.modalService.open(this.templateRef, { centered: true });
      this.db.saveNotify(dataNo, this.notifyMessage);
      this.isNotify = false;
      setTimeout(() => {
        this.isNotify = true;
      }, 2000);
    }
  }

  addNodeModal(content) {
    this.modalService.open(content, { centered: true });
  }

  addNewNode() {
    const data = {
      nodeId: this.nodeId,
      car_id: this.paramMapnodeId
    };
    if (this.nodeId != null) {
      this.db.addNode(data);
    }
    this.nodeId = null;
    this.modalService.dismissAll();
  }

  getBattery(battery) {
    if (battery > 75) {
      return 1;
    } else if (battery > 50) {
      return 2;
    } else if (battery > 25) {
      return 3;
    } else {
      return 4;
    }
  }

  deleteNode() {
    if (this.deleteNodeid != null) {
      this.db.deleteNode(this.deleteNodeid);
    }
    this.modalService.dismissAll();
    this.deleteNodeid = null;
  }

  deleteModel(DeleteModel, nodeId) {
    this.deleteNodeid = nodeId;
    this.modalService.open(DeleteModel, { centered: true });
  }

  setColor(timestamp) {
    let sColor;
    if (Math.abs(Date.now() - timestamp) > (100000 * 1) ) {
      sColor = 'warning';
    } else {
      sColor = 'success';
    }

    // var sit = setInterval(() => {
    // if (Math.abs(Date.now() - timestamp) > (100000 * 1) ) {
    //   sColor = 'warning';
    //   clearInterval(sit);
    //   return sColor;
    // } else {
    //   sColor = 'success';
    //   return sColor;
    // }
    // }, 1000 * 30);
    return sColor;
  }

  checkData(check, data) {
    if (check !== -1) {
      return data;
    } else {
      return 'null';
    }
  }
}
