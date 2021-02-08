import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AircraftSeatMapRoutingModule } from '@app/aircraft-seat-map/aircraft-seat-map-routing.module';
import { SharedModule } from '@app/aircraft-seat-map/shared/shared.module';

import { DemoComponent } from '@app/aircraft-seat-map/containers/demo/demo.component';
import { SeatMapComponent } from './components/seat-map/seat-map.component';

@NgModule({
  declarations: [DemoComponent, SeatMapComponent],
  imports: [CommonModule, AircraftSeatMapRoutingModule, SharedModule],
})
export class AircraftSeatMapModule {}
