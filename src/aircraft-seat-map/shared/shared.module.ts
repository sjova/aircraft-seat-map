import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '@app/aircraft-seat-map/shared/material/material.module';

@NgModule({
  imports: [CommonModule, HttpClientModule, MaterialModule],
  exports: [MaterialModule],
})
export class SharedModule {}
