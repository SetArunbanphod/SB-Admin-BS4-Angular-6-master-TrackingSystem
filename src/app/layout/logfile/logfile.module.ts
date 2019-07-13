import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogfileRoutingModule } from './logfile-routing.module';
import { LogfileComponent } from './logfile.component';
import { FormsModule } from '@angular/forms';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [LogfileComponent],
  imports: [
    CommonModule,
    LogfileRoutingModule,
    FormsModule,
    NgbCarouselModule,
    NgbModule
  ]
})
export class LogfileModule { }
