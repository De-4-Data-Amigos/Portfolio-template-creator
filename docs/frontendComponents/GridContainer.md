# GridContainer


To create a grid, you will need to give it a columns and rows amount.

```jsx
<GridContainer columns={3} rows={3}>
</GridContainer>

```

All children needs to have the attribute `data-pos` with the format `x,y` where x and y is numbers and 1 less than the column and row amount, since the are indexes.

```jsx
<GridContainer columns={3} rows={3}>
    <SomeComponent data-pos='0,2'/>
</GridContainer>

```

If it's formatted correctly, then it should throw an error, with a message as to why.