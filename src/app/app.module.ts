import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule } from '@progress/kendo-angular-grid';




@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ButtonsModule, BrowserAnimationsModule, GridModule],
  providers: [BrowserModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
