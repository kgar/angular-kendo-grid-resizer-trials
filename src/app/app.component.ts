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
  gridPaddingTop = 0;
  gridPaddingBottom = 0;
  gridMarginTop = 0;
  gridMarginBottom = 0;

  public gridView: GridDataResult = process(this.gridData, this.gridState);

  @ViewChild('thingToResize') thingToResize: GridComponent;
  readyToResize = false;

  resize() {
    const target = this.thingToResize.wrapper.nativeElement;
    target.style.height = '0px';
    const parent: HTMLElement = target.parentElement;
    const parentStyle: CSSStyleDeclaration = window.getComputedStyle(parent);
    const parentIsFlexbox = parentStyle.display === 'flex';
    let siblingHeight = 0;
    let previousSiblingStyle: CSSStyleDeclaration;
    for (let i = 0; i < parent.children.length; i++) {
      
      const child = parent.children[i] as HTMLElement;

      const childStyle = window.getComputedStyle(child);

      const margins =
        this.getNumericPropertyValue(childStyle, 'margin-top') +
        this.getNumericPropertyValue(childStyle, 'margin-bottom');

      let collapsedMargins = 0;
      if (!parentIsFlexbox && this.isCollapsedMargin(previousSiblingStyle, childStyle)) {
        collapsedMargins += Math.min(
          this.getNumericPropertyValue(previousSiblingStyle, 'margin-bottom'),
          this.getNumericPropertyValue(childStyle, 'margin-top'),
        );
      }

      siblingHeight += child.getBoundingClientRect().height + margins - collapsedMargins;

      previousSiblingStyle = childStyle;
    }

    const parentHeight = parent.getBoundingClientRect().height;
    const proposedHeight = Math.floor(parentHeight - siblingHeight);

    target.style.height = `${proposedHeight}px`;
  }

  getNumericPropertyValue(styleDeclaration: CSSStyleDeclaration, prop: string) {
    return parseInt(styleDeclaration.getPropertyValue(prop), 10);
  }

  isCollapsedMargin(first: CSSStyleDeclaration, second: CSSStyleDeclaration): boolean {
    return (first?.display === 'block' || first?.display === 'flex') && (second?.display === 'block' || second?.display === 'flex');
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
    // TODO: Throttle to 15 FPS
  }
}
