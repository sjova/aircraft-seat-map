import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Store } from '@app/store';

import { AppRoutingModule } from '@app/app/app-routing.module';
import { AppComponent } from '@app/app/containers/app/app.component';
import { PageNotFoundComponent } from '@app/app/components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule],
  bootstrap: [AppComponent],
  providers: [Store],
})
export class AppModule {}
