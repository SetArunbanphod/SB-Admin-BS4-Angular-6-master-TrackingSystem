import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogfileComponent } from './logfile.component';

const routes: Routes = [
  {
    path: '',
    component: LogfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogfileRoutingModule { }
