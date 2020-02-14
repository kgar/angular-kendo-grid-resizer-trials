import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RemainingHeightCalculator {
  public calculateRemainingHeight(target: HTMLElement): number {
    const parent: HTMLElement = target.parentElement;
    const parentStyle: CSSStyleDeclaration = window.getComputedStyle(parent);
    const parentIsFlexbox = parentStyle.display === 'flex';
    let siblingHeight = 0;
    let previousSiblingStyle: CSSStyleDeclaration;

    // tslint:disable-next-line: prefer-for-of
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
    return proposedHeight;
  }

  private getNumericPropertyValue(styleDeclaration: CSSStyleDeclaration, prop: string) {
    return parseInt(styleDeclaration.getPropertyValue(prop), 10);
  }

  private isCollapsedMargin(first: CSSStyleDeclaration, second: CSSStyleDeclaration): boolean {
    return (
      (first?.display === 'block' || first?.display === 'flex') &&
      (second?.display === 'block' || second?.display === 'flex')
    );
  }
}
