import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigFormComponent } from './config-form/config-form.component';
import { SensorDetailComponent } from './config-form/sensor-detail/sensor-detail.component';

const appRoutes: Routes = [
  { path: '', component: ConfigFormComponent, pathMatch: 'full' },
  { path: 'sensor-detail', component: SensorDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
