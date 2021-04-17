import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

const materialComponentModules = [MatButtonModule, MatProgressBarModule, MatTooltipModule];

@NgModule({
  imports: [...materialComponentModules],
  exports: [...materialComponentModules],
})
export class MaterialModule {}
