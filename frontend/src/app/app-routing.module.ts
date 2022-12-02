import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'monitoring', pathMatch: 'full' },
  { path: 'monitoring', loadChildren: () => import('./monitoring/monitoring.module').then((m) => m.MonitoringModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
