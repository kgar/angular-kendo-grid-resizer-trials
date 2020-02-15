# To Do
- Make decorator called @AvailableResizers()
  - get(id?: string): ResizerService
  - getAll(): ResizerService[]
  - ResizerService: class
    - resize(): void
    - resizeAsync(): Promise\<void\>
    - resizerId getter: string
- Use decorator in caller
- Put the grid into its own component
- Put the content around the grid into two other components
- Compose the components in the output div
- Apply layout so that the component selectors are flex children in column orientation
- Make resizeAsync() return a promise

# Questions
- Does the height calculator account for content being display: none?
- Does the height calculator account for display: inline elements? What about sibling display: inline elements?
  - What is the established HTML behavior here?
- Does the height calculator account for floating elements?
  - I think I should be ignoring floating elements unless they are the height of the parent container. Verify.
- Can I extract the single-grid resize call to some kind of helper or typesafe method?
