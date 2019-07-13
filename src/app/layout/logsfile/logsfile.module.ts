import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogsfileRoutingModule } from './logsfile-routing.module';
import { LogsfileComponent } from './logsfile.component';
import { PageHeaderModule } from 'src/app/shared';

@NgModule({
  declarations: [LogsfileComponent ],
  imports: [
    CommonModule,
    LogsfileRoutingModule,
    PageHeaderModule
  ]
})
export class LogsfileModule { }
