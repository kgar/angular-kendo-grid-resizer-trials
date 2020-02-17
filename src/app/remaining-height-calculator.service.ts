import { Injectable } from '@angular/core';

/*
  Service for calculating the remaining height available in a container.
  Accounts for margin collapsing. Ignores floating elements.
  To avoid surprise scrollbars for callers, the final height calculation is rounded down to the nearest integer.
  For this reason, there may be a sliver of remaining space not accounted for.
*/
@Injectable({
  providedIn: 'root',
})
export class RemainingHeightCalculator {
  private calculateOccupiedHeight(container: HTMLElement) {
    const parentStyle: CSSStyleDeclaration = window.getComputedStyle(container);
    const parentIsFlexbox = parentStyle.display === 'flex';

    let occupiedHeight = 0;
    let previousChildStyle: CSSStyleDeclaration;

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < container.children.length; i++) {
      const child = container.children[i] as HTMLElement;
      const childStyle = window.getComputedStyle(child);

      if (this.isFloatingElement(childStyle)) {
        continue;
      }

      const margins =
        Math.ceil(this.getNumericPropertyValue(childStyle, 'margin-top')) +
        Math.ceil(this.getNumericPropertyValue(childStyle, 'margin-bottom'));

      let collapsedMargins = 0;

      if (!parentIsFlexbox && this.isCollapsedMargin(previousChildStyle, childStyle)) {
        collapsedMargins += Math.min(
          Math.floor(this.getNumericPropertyValue(previousChildStyle, 'margin-bottom')),
          Math.floor(this.getNumericPropertyValue(childStyle, 'margin-top')),
        );
      }

      occupiedHeight += Math.ceil(child.getBoundingClientRect().height) + margins - collapsedMargins;

      previousChildStyle = childStyle;
    }

    return occupiedHeight;
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

  isFloatingElement(style: CSSStyleDeclaration) {
    const floatValue = style.float.toLocaleLowerCase();
    return floatValue === 'left' || floatValue === 'right';
  }

  public calculate(container: HTMLElement): number {
    const occupiedHeight = this.calculateOccupiedHeight(container);
    const parentHeight = Math.floor(container.getBoundingClientRect().height);
    const proposedHeight = parentHeight - occupiedHeight;
    return proposedHeight;
  }
}
