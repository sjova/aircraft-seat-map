import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlightSummaryComponent } from '@app/aircraft-seat-map/containers/flight-summary/flight-summary.component';
import { SeatSelectionComponent } from '@app/aircraft-seat-map/containers/seat-selection/seat-selection.component';

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
    path: 'seat-selection',
    component: SeatSelectionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AircraftSeatMapRoutingModule {}
