import { Directive, Input, HostListener, OnInit, ElementRef } from '@angular/core';
import { RemainingHeightCalculator } from './remaining-height-calculator.service';
import { debounce } from './debounce.decorator';
import { AutoResizerEvent } from './AutoResizerEvent';

@Directive({
  selector: '[appAutoResizer]',
})
export class AutoResizerDirective implements OnInit {
  /* Optional ID for helping find the specific directive instance associated with a particular grid */
  @Input('appAutoResizer') instanceId: string;
  /* Optional override for toggling whether the resize operation triggers whenever the browser window resizes */
  @Input() appAutoResizerTriggerOnWindowResize = true;
  /* Optional override for toggling whether the resize operation triggers during the ngAfterViewInit lifecycle event */
  @Input() appAutoResizerTriggerOnInit = true;

  constructor(private ref: ElementRef, private heightCalculator: RemainingHeightCalculator) {}

  ngOnInit(): void {
    if (!this.appAutoResizerTriggerOnInit) {
      return;
    }

    this.resizeAsync();
  }

  resize(): void {
    if (!this.ref) {
      return;
    }
    const target = this.ref.nativeElement as HTMLElement;
    target.style.height = '0px';
    const remainingHeight = this.heightCalculator.calculate(target.parentElement);
    target.style.height = `${remainingHeight}px`;
  }

  resizeAsync() {
    setTimeout(() => {
      this.resize();
    }, 0);
  }

  @HostListener('window:resize')
  @debounce(150)
  onResize() {
    if (!this.appAutoResizerTriggerOnWindowResize) {
      return;
    }

    this.resizeAsync();
  }

  @HostListener('window:AppAutoResizer_Resize', ['$event'])
  onResizeRequested(event: CustomEventInit<AutoResizerEvent>) {
    const isResizeAll = event.detail.ids.length === 0;
    const isResizeRequestForThisDirective = event.detail.ids.indexOf(this.instanceId) >= 0;
    const shouldResize = isResizeAll || isResizeRequestForThisDirective;

    if (shouldResize) {
      event.detail.isAsync ? this.resizeAsync() : this.resize();
    }
  }
}
