import * as React from 'react'
const { useState } = require("react");

function Counter({initialCounter}) {
    let [counter, SetCounter] = useState(initialCounter);

    const IncrementCounter = (() => {
        SetCounter((prev) => prev +1 );
    });
    const DecrementCounter = (() => {
        SetCounter((prev) => prev -1 );
    });
    const ResetCounter = (() => {
        SetCounter(0);
    });
    const SwitchSign = (() => {
        SetCounter((prev) => prev * -1 );
    });


    return(
        <div>
            <h1>
                Counter: <h3 data-testid="count">{counter}</h3>
            </h1>
            <div>
                <button onClick={IncrementCounter}>Increment</button>
                <button onClick={DecrementCounter}>Decrement</button>
                <button onClick={ResetCounter}>Reset</button>
                <button onClick={SwitchSign}>Switch Sign</button>                
            </div>
        </div>
    );
}


export default Counter;