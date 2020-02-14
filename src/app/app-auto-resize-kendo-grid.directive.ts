import { Directive, AfterViewInit, Input, HostListener } from '@angular/core';
import { RemainingHeightCalculator } from './remaining-height-calculator.service';
import { GridComponent } from '@progress/kendo-angular-grid';
import { debounce } from './debounce.decorator';

@Directive({
  selector: '[appAutoResizeKendoGrid]',
})
export class AutoResizeKendoGridDirective implements AfterViewInit {
  readyToResize = false;
  @Input() appAutoResizeTriggerOnWindowResize = true;
  @Input() appAutoResizeTriggerAfterViewInit = true;

  constructor(private grid: GridComponent, private heightCalculator: RemainingHeightCalculator) {}

  ngAfterViewInit(): void {
    this.readyToResize = true;

    if (!this.appAutoResizeTriggerAfterViewInit) {
      return;
    }

    this.resize();
  }

  public resize() {
    const target = this.grid.wrapper.nativeElement as HTMLElement;
    target.style.height = '0px';
    const remainingHeight = this.heightCalculator.calculate(target.parentElement);
    target.style.height = `${remainingHeight}px`;
  }

  @HostListener('window:resize')
  @debounce(150)
  onResize() {
    if (!this.readyToResize || !this.appAutoResizeTriggerOnWindowResize) {
      return;
    }

    this.resize();
  }
}

interface KendoGridAutoResizeOptions {
  debounceDuration?: number;
  triggerOnWindowResize?: boolean;
  triggerAfterViewInit?: boolean;
}
