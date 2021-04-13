import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlightSummaryComponent } from '@app/aircraft-seat-map/containers/flight-summary/flight-summary.component';
import { SeatMapSelectionComponent } from '@app/aircraft-seat-map/containers/seat-map-selection/seat-map-selection.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'summary',
  },
  {
    path: 'summary',
    component: FlightSummaryComponent,
  },
  {
    path: 'seat-map-selection',
    component: SeatMapSelectionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AircraftSeatMapRoutingModule {}
