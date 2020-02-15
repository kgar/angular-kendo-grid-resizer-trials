import { Component, OnInit, ViewChildren, ViewChild } from '@angular/core';
import { State, process } from '@progress/kendo-data-query';
import {
  SelectableSettings,
  GridDataResult,
  DataStateChangeEvent,
  GridComponent,
} from '@progress/kendo-angular-grid';
import { sampleData } from './grid-data';
import { AutoResizeKendoGridDirective } from './app-auto-resize-kendo-grid.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChildren(AutoResizeKendoGridDirective) autoResizeGrids;
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

  readyToResize = false;

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
    console.log(this.autoResizeGrids);
    console.log(this.grid);
    this.autoResizeGrids.find(
      (d: AutoResizeKendoGridDirective) => d.appAutoResizeDirectiveId === 'thisGridInParticular',
    )?.resizeAsync();
  }

  setGridHeight() {
    this.grid.wrapper.nativeElement.style.height = `${this.gridHeight}px`;
  }
}
