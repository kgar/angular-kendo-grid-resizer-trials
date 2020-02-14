# Some Notes
- @ViewChild can provide an ElementRef, which can be used to get the nativeElement
  - For Kendo Grids, you get a KendoGridComponent, which has a wrapper, which has a nativeElement
- @ViewChild fields are available after ngAfterViewInit() (AfterViewInit)
- @ViewChildren can allow you to snag the directive by type, allowing us to programmatically call the resize() function
- Element.getBoundingClientRect() will help get the outer height of an element: https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
- For listening to window resize, consider the HostListener approach https://angular.io/api/core/HostListener
- The algorithm for now is
  - Set grid height to 0
    - Overridable with optional min height
  - Get parent element's visible children
  - Sum the children's bounding rectangle heights
  - Subtract the total sum of heights from the container's bounding rectangle height
    - Optional: If a desired additional gap is requested, subtract the specified gap in pixels as well
  - Apply the resulting number (rounded down to the nearest whole number) to the grid
- triggers
  - Window resize
    - Throttle to ~15FPS (RxJs should be able to help)
  - Public resize() function in directive available to consuming component (is this possible?)
- How is it implemented
  - Currently, I plan to make a directive to do this
- How to use
  - Decorate kendo grid component with directive appAutoResize and pass in the element ref as the arg

## Progress
- The height calculation is not taking margin into account. What about padding?
