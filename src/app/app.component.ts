import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, HostListener } from '@angular/core';
import { State, process } from '@progress/kendo-data-query';
import {
  SelectableSettings,
  GridDataResult,
  DataStateChangeEvent,
  GridComponent,
} from '@progress/kendo-angular-grid';
import { sampleData } from './grid-data';
import { debounce } from './debounce.decorator';
import { RemainingHeightCalculator } from './remaining-height-calculator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
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

  @ViewChild('thingToResize') thingToResize: GridComponent;
  readyToResize = false;

  constructor(private heightCalculator: RemainingHeightCalculator) {  }

  resize() {
    const target = this.thingToResize.wrapper.nativeElement as HTMLElement;
    target.style.height = '0px';
    const remainingHeight = this.heightCalculator.calculate(target.parentElement);
    target.style.height = `${remainingHeight}px`;
  }

  ngAfterViewInit(): void {
    this.readyToResize = true;
    this.resize();
  }

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

  @HostListener('window:resize')
  @debounce(100)
  onResize() {
    if (!this.readyToResize) { return; }
    this.resize();
  }
}
