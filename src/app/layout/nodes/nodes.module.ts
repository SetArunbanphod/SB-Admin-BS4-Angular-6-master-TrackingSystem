import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NodesRoutingModule } from './nodes-routing.module';
import { NodesComponent } from './nodes.component';
import { FormsModule } from '@angular/forms';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

@NgModule({
  declarations: [NodesComponent],
  imports: [
    CommonModule,
    NodesRoutingModule,
    FormsModule,
    NgbCarouselModule,
    NgbModule,
    AgmCoreModule,
    Ng2Charts
  ]
})
export class NodesModule {}
