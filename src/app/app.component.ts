import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, HostListener } from '@angular/core';
import { State, process } from '@progress/kendo-data-query';
import {
  SelectableSettings,
  GridDataResult,
  DataStateChangeEvent,
  GridComponent,
} from '@progress/kendo-angular-grid';
import { sampleData } from './grid-data';
import { Subject, asyncScheduler } from 'rxjs';
import { throttle } from 'rxjs/operators';
import { debounce } from './debounce.decorator';

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

  resize() {
    const target = this.thingToResize.wrapper.nativeElement;
    target.style.height = '0px';
    const parent: HTMLElement = target.parentElement;
    let siblingHeight = 0;
    let previousSiblingStyle: CSSStyleDeclaration;
    for (let i = 0; i < parent.children.length; i++) {
      const child = parent.children[i] as HTMLElement;
      if (child === target) {
        continue;
      }

      const childStyle = window.getComputedStyle(child);

      const margins =
        this.getNumericPropertyValue(childStyle, 'margin-top') +
        this.getNumericPropertyValue(childStyle, 'margin-bottom');

      let collapsedMargins = 0;
      if (this.isCollapsedMargin(previousSiblingStyle, childStyle)) {
        collapsedMargins += Math.min(
          this.getNumericPropertyValue(previousSiblingStyle, 'margin-bottom'),
          this.getNumericPropertyValue(childStyle, 'margin-top'),
        );
      }

      siblingHeight += child.getBoundingClientRect().height + margins - collapsedMargins;

      previousSiblingStyle = childStyle;
    }

    const parentHeight = parent.getBoundingClientRect().height;
    const targetRemainingHeight = target.getBoundingClientRect().height;
    const proposedHeight = Math.floor(parentHeight - targetRemainingHeight - siblingHeight);

    target.style.height = `${proposedHeight}px`;
  }

  getNumericPropertyValue(styleDeclaration: CSSStyleDeclaration, prop: string) {
    return parseInt(styleDeclaration.getPropertyValue(prop), 10);
  }

  isCollapsedMargin(first: CSSStyleDeclaration, second: CSSStyleDeclaration): boolean {
    return first?.display === 'block' && second?.display === 'block';
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
  @debounce(150)
  onResize() {
    if (!this.readyToResize) { return; }
    this.resize();
    // TODO: Throttle to 15 FPS
  }
}
