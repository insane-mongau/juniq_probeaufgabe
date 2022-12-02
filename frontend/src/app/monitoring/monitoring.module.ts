import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// components
import { AddMonitorUrlComponent } from './components/add-monitor-url/add-monitor-url.component';
import { MonitorUrlTableComponent } from './components/monitor-url-table/monitor-url-table.component';
import { MonitorUrlPageComponent } from './pages/monitor-url-page/monitor-url-page.component';
// Shared
import { SharedModule } from '../shared/shared.module';
import { MonitoringRoutingModule } from './monitoring-routes.module';

@NgModule({
  declarations: [
    AddMonitorUrlComponent,
    MonitorUrlTableComponent,
    MonitorUrlPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    MonitoringRoutingModule,
    HttpClientModule
  ],
})
export class MonitoringModule {}
