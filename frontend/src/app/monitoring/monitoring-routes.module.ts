import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Pages
import { MonitorUrlPageComponent } from './pages/monitor-url-page/monitor-url-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'url', pathMatch: 'full' },
  { path: 'url', component: MonitorUrlPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonitoringRoutingModule {}
