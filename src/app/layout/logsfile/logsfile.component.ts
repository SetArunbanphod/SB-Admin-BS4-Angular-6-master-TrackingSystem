import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DatabaseService } from '../../shared';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-logsfile',
  templateUrl: './logsfile.component.html',
  styleUrls: ['./logsfile.component.scss'],
  animations: [ routerTransition() ]
})
export class LogsfileComponent implements OnInit {

  public testData: Observable<any[]>;
  public nodeList: Observable<any[]>;
  paramMapnodeId: string;
  constructor(public route: ActivatedRoute, public db: DatabaseService) {
  }

  ngOnInit() {
    this.paramMapnodeId = this.route.snapshot.paramMap.get('nodeId');
    this.nodeList = this.db.getNodeLogsDataByuserId();
    this.nodeList.forEach(element => {
      console.log(element);
    });

    //---------------------------------------------------------------- test
    //this.testData = this.db.getTest();
  }

}
