import { Component, OnInit } from '@angular/core';
import { State, process } from '@progress/kendo-data-query';
import {
  SelectableSettings,
  GridDataResult,
  DataStateChangeEvent,
} from '@progress/kendo-angular-grid';
import { sampleData } from './grid-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
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
    alert('Oh no! This needs to be reimplemented! But how??????');
  }
}
