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
    let target = this.thingToResize.nativeElement;
    target.style.height = '0px';
    let parent: HTMLElement = target.parentElement;
    let siblingHeight = 0;
    for (let i = 0; i < parent.children.length; i++) {
      let child: Element = parent.children[i];
      if (child === target) continue;

      siblingHeight += child.getBoundingClientRect().height;
    }
    let parentHeight = parent.getBoundingClientRect().height;
    let targetRemainingHeight = target.getBoundingClientRect().height;
    let proposedHeight = Math.floor(parentHeight - targetRemainingHeight - siblingHeight);
    target.style.height = `${proposedHeight}px`;
  }
}
