import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AircraftSeatMapRoutingModule } from '@app/aircraft-seat-map/aircraft-seat-map-routing.module';
import { SharedModule } from '@app/aircraft-seat-map/shared/shared.module';

import { SeatMapComponent } from './components/seat-map/seat-map.component';

import { FlightSummaryComponent } from './containers/flight-summary/flight-summary.component';
import { SeatSelectionComponent } from './containers/seat-selection/seat-selection.component';

@NgModule({
  declarations: [
    SeatMapComponent,
    FlightSummaryComponent,
    SeatSelectionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AircraftSeatMapRoutingModule,
    SharedModule,
  ],
})
export class AircraftSeatMapModule {}
