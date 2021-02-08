import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from '@app/app/containers/app/app.component';
import { AppRoutingModule } from '@app/app/app-routing.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { StartComponent } from './components/start/start.component';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent, StartComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
