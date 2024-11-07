# Create a test
To create a test for a given component, create a file called <component>.test.jsx in src/test folder.
Then add the following lines to the test file.
```js
import * as React from 'react'
import { render, fireEvent } from '@testing-library/react';
import <component> from "../components/<component>";
```
Make sure that the component also has the ffollowing line 
```js
import * as React from 'react'
```

Then in the tes file call the method descripe, where the first argument is the component to test, and the second is a function, that holds the test to be run. Like this:
```js
import * as React from 'react'
import { render, fireEvent } from '@testing-library/react';
import <component> from "../components/<component>";

describe(<component>, () =>{

})
```
In the function given to describe, you make your test for the given component. You do this by calling the method `it`, where the first argument is the name of the test, and the second argument is a function that holds the test, like this: 
```js 
import * as React from 'react'
import { render, fireEvent } from '@testing-library/react';
import <component> from "../components/<component>";

describe(<component>, () =>{
    // setup the initial values for the test.
    const initialValue = 0;
    
    // The render function, creates the component for the test, like how you instansiate a class in java.
    // It then returns a few functions, for to get different elements of the test dom.
    // In this case, it is capturing the function 'getByTestId', where it gets an element from the component
    // where the element or tag has been given the attribute 'data-testid=' with some value.
    const { getByTestId } = render(<<component> initialCounter={initialValue} />);

    // In this test, the element has been given the testid 'componenttestid'.
    // It then gets the text content of the the element and converts it to a number
    const countValue = Number(getByTestId("componenttestid").textContent);

    // It tells what the value is expected to be, which in this case is 0.
    expect(countValue).toEqual(0);

})
```
If all expects gets the correct value, being what it was told to expect, then the test passes.

To see an example look at [Counter.test.js](../Frontend/src/test/Counter.test.jsx) and the accompanying component [Counter.jsx](../Frontend/src/components/Counter.jsx)


# Run Tests

1. Make sure all the packages are installed with `npm install` in the Frontend folder.
2. Run `npm run test`.