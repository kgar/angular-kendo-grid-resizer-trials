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
    for (let i = 0; i < parent.children.length; i++) {
      const child = parent.children[i] as HTMLElement;
      if (child === target) {
        continue;
      }

      const childStyle = window.getComputedStyle(child);

      const margins =
        this.getNumericPropertyValue(childStyle, 'margin-top') +
        this.getNumericPropertyValue(childStyle, 'margin-bottom');

      siblingHeight += child.getBoundingClientRect().height + margins;
    }

    const parentHeight = parent.getBoundingClientRect().height;
    const targetRemainingHeight = target.getBoundingClientRect().height;
    const proposedHeight = Math.floor(parentHeight - targetRemainingHeight - siblingHeight);

    target.style.height = `${proposedHeight}px`;
  }

  getNumericPropertyValue(styleDeclaration: CSSStyleDeclaration, prop: string) {
    return parseInt(styleDeclaration.getPropertyValue(prop), 10);
  }
}
