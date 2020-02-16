import { Component, ViewChild } from '@angular/core';
import { AutoResizerRelayService } from './auto-resizer-relay.service';
import { GridToResizeComponent } from './grid-to-resize/grid-to-resize.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild(GridToResizeComponent) gridComponent: GridToResizeComponent;
  gridHeight: number;

  constructor(private resizer: AutoResizerRelayService) {}

  resize() {
    this.resizer.resizeAsync('thisGridInParticular');
  }

  resizeAll() {
    this.resizer.resizeAsync();
  }

  resizeWrongId() {
    this.resizer.resizeAsync('someOtherThingThatDoesNotExist');
  }

  setGridHeight() {
    this.gridComponent.setGridHeight(this.gridHeight);
  }
}
