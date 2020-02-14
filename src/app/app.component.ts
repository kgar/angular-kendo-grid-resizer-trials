import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('thingToResize') thingToResize: ElementRef;

  resize() {
    console.log(this.thingToResize);
    const target = this.thingToResize.nativeElement;
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
    console.log(first);
    return first?.display === 'block' && second?.display === 'block';
  }
}
