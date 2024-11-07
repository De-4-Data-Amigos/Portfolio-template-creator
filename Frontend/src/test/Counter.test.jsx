import * as React from 'react'
import { render, fireEvent } from '@testing-library/react';
import Counter from "../components/Counter";

describe(Counter, () => {
    
    // This one should pass
    it("counter displays correct initial count", () => {
        const initialValue = 0;
        
        const { getByTestId } = render(<Counter initialCounter={initialValue} />);
        const countValue = Number(getByTestId("count").textContent);

        expect(countValue).toEqual(0);
    });

    // You can just make more test for the component by calling more 'it' methods
    it("counter should be incremented by one, when the button is clicked", () => {
        const initialValue = 0;
        
        const { getByTestId, getByRole } = render(<Counter initialCounter={initialValue} />);
        const incrementBttn = getByRole("button", {name: "Increment"});
        
        var countValue = Number(getByTestId("count").textContent);
        expect(countValue).toEqual(initialValue);

        fireEvent.click(incrementBttn);

        countValue = Number(getByTestId("count").textContent);
        expect(countValue).toEqual(initialValue+1);
    });
})