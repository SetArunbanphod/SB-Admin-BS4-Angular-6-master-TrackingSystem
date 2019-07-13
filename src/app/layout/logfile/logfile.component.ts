import { Component, OnInit } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DatabaseService } from 'src/app/shared';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-logfile',
  templateUrl: './logfile.component.html',
  styleUrls: ['./logfile.component.scss'],
  animations: [routerTransition()]
})
export class LogfileComponent implements OnInit {
  constructor(private route: ActivatedRoute, public db: DatabaseService, public modalService: NgbModal) {}
  public nodeId: string;
  public nodeList: Observable<any[]>;
  ngOnInit() {
    this.nodeId = this.route.snapshot.paramMap.get('nodeId');
    this.nodeList = this.db.getLogsDataBynodeId(this.nodeId);
  }


  openModeldelete(content) {
    this.modalService.open(content, { centered: true });
  }
  deleteLogs() {
    this.db.deleteLogs(this.nodeId);
    this.modalService.dismissAll();
  }

  checkData(check, data) {
    if (check !== -1) {
      return data ;
    } else {
      return 'null' ;
    }
  }

  checkPosition(data) {
    if (data !== 0) {
      return data ;
    } else {
      return 'null' ;
    }
  }
}
