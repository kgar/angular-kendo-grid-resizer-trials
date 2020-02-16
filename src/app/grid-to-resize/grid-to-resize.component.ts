import { Component, OnInit, ViewChild } from '@angular/core';
import { State, process } from '@progress/kendo-data-query';
import { SelectableSettings, GridDataResult, DataStateChangeEvent, GridComponent } from '@progress/kendo-angular-grid';
import { sampleData } from '../grid-data';

@Component({
  selector: 'app-grid-to-resize',
  templateUrl: './grid-to-resize.component.html',
  styleUrls: ['./grid-to-resize.component.css']
})
export class GridToResizeComponent implements OnInit {
  @ViewChild('myGrid') public grid: GridComponent;
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
  public gridView: GridDataResult = process(this.gridData, this.gridState);

  constructor() { }

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

  setGridHeight(height) {
    this.grid.wrapper.nativeElement.style.height = `${height}px`;
  }

}
