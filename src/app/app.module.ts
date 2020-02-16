import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule } from '@progress/kendo-angular-grid';
import { FormsModule } from '@angular/forms';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { AutoResizerDirective } from './app-auto-resize-kendo-grid.directive';
import { GridToResizeComponent } from './grid-to-resize/grid-to-resize.component';
import { ContentAboveGridComponent } from './content-above-grid/content-above-grid.component';
import { ContentBelowGridComponent } from './content-below-grid/content-below-grid.component';





@NgModule({
  declarations: [AppComponent, AutoResizerDirective, GridToResizeComponent, ContentAboveGridComponent, ContentBelowGridComponent],
  imports: [BrowserModule, ButtonsModule, BrowserAnimationsModule, GridModule, FormsModule, InputsModule],
  providers: [BrowserModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
