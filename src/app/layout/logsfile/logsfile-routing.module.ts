import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogsfileComponent } from './logsfile.component';

const routes: Routes = [
  {
    path: '',
    component: LogsfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogsfileRoutingModule {}
