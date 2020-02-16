import { Component, OnInit, ViewChild } from '@angular/core';
import { State, process } from '@progress/kendo-data-query';
import {
  SelectableSettings,
  GridDataResult,
  DataStateChangeEvent,
  GridComponent,
} from '@progress/kendo-angular-grid';
import { sampleData } from './grid-data';
import { AutoResizerRelayService } from './auto-resizer-relay.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('myGrid') grid: GridComponent;
  gridData: any[] = [];
  gridState: State = {
    skip: 0,
    take: 20,
    sort: [{ field: 'ProductID', dir: 'desc' }],
  };
  gridSelectionSettings: SelectableSettings = {
    enabled: true,
    checkboxOnly: false,
    mode: 'single',
  };
  gridHeight: number;

  public gridView: GridDataResult = process(this.gridData, this.gridState);

  constructor(private resizer: AutoResizerRelayService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.gridData = sampleData;
      this.gridView = process(this.gridData, this.gridState);
    }, 1500);
  }

  dataStateChange(state: DataStateChangeEvent): void {
    this.gridState = state;
    this.gridView = process(this.gridData, this.gridState);
  }

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
    this.grid.wrapper.nativeElement.style.height = `${this.gridHeight}px`;
  }
}
