import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AircraftSeatMapRoutingModule } from '@app/aircraft-seat-map/aircraft-seat-map-routing.module';
import { SharedModule } from '@app/aircraft-seat-map/shared/shared.module';

import { SeatMapComponent } from './components/seat-map/seat-map.component';

import { FlightSummaryComponent } from './containers/flight-summary/flight-summary.component';
import { SeatMapSelectionComponent } from './containers/seat-map-selection/seat-map-selection.component';

@NgModule({
  declarations: [SeatMapComponent, FlightSummaryComponent, SeatMapSelectionComponent],
  imports: [CommonModule, FormsModule, AircraftSeatMapRoutingModule, SharedModule],
})
export class AircraftSeatMapModule {}
