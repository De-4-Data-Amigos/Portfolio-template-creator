import * as React from 'react'
import { render, fireEvent } from '@testing-library/react';
import GridContainer from '../components/GridContainer';


describe(GridContainer, () => {
    it("grid gets created correctly", () => {
        const columns = 10;
        const rows = 3;

        const { getAllByTestId } = render(
            <GridContainer columns={columns} rows={rows}>
            </GridContainer>
        );
        const actuallyColumns = getAllByTestId("GridColumn").length;
        const actuallyRows = getAllByTestId("GridRow").length;
        
        expect(actuallyColumns).toEqual(columns);
        expect(actuallyRows).toEqual(columns*rows);
    });
    
    it("grid object is positioned correctly", () => {
        const columns = 3;
        const rows = 3;
        const testValue = 'test';
        
        const { getAllByTestId } = render(
            <GridContainer columns={columns} rows={rows}>
                <p data-pos='1,1'>{testValue}</p>
            </GridContainer>
        );
        const actuallyPositionValue = getAllByTestId("GridColumn")[1].children[1].textContent;

        expect(actuallyPositionValue).toEqual(testValue);
    });

    it("grid throws if child doesn't have pos data", () => {
        const columns = 3;
        const rows = 3;

        const invaliddata = () =>{ render(
                <GridContainer columns={columns} rows={rows}>
                    <p></p>
                </GridContainer>
            );
        };
        expect(invaliddata).toThrow(Error);
    });

    it("grid throws if data-pos is invalid", () => {
        const columns = 1;
        const rows = 1;

        const invaliddata = () =>{ render(
                <GridContainer columns={columns} rows={rows}>
                    <p data-pos='00'></p>
                </GridContainer>
            );
        };
        expect(invaliddata).toThrow(Error);
    });

    it("grid throws if there is too many children", () => {
        const columns = 1;
        const rows = 1;

        const invaliddata = () =>{ render(
                <GridContainer columns={columns} rows={rows}>
                    <p data-pos='0,0'></p>
                    <p data-pos='1,1'></p>
                </GridContainer>
            );
        };
        expect(invaliddata).toThrow(Error);
    });

    it("grid throws if two children has the same position", () => {
        const columns = 1;
        const rows = 1;

        const invaliddata = () =>{ render(
                <GridContainer columns={columns} rows={rows}>
                    <p data-pos='0,0'></p>
                    <p data-pos='0,0'></p>
                </GridContainer>
            );
        };
        expect(invaliddata).toThrow(Error);
    });

    it("grid throws if x pos is less than grid", () => {
        const columns = 3;
        const rows = 3;

        const invalidposition = () =>{ render(
                <GridContainer columns={columns} rows={rows}>
                    <p data-pos='-1,0'></p>
                </GridContainer>
            );
        };
        expect(invalidposition).toThrow(Error);
    });

    it("grid throws if y pos is less than grid", () => {
        const columns = 3;
        const rows = 3;

        const invalidposition = () =>{ render(
                <GridContainer columns={columns} rows={rows}>
                    <p data-pos='0,-1'></p>
                </GridContainer>
            );
        };
        expect(invalidposition).toThrow(Error);
    });

    it("grid throws if x pos is larger than grid", () => {
        const columns = 3;
        const rows = 3;

        const invalidposition = () =>{ render(
                <GridContainer columns={columns} rows={rows}>
                    <p data-pos={`${columns},0`}></p>
                </GridContainer>
            );
        };
        expect(invalidposition).toThrow(Error);
    });

    it("grid throws if y pos is larger than grid", () => {
        const columns = 3;
        const rows = 3;

        const invalidposition = () =>{ render(
                <GridContainer columns={columns} rows={rows}>
                    <p data-pos={`0,${rows}`}></p>
                </GridContainer>
            );
        };
        expect(invalidposition).toThrow(Error);
    });

    it("grid item gets moved correctly", () => {
        const columns = 3;
        const rows = 3;

        const { getAllByTestId, getByTestId } = render(
            <GridContainer columns={columns} rows={rows}>
                <p data-pos='0,0' data-testid='component1'></p>
                <p data-pos='1,1' data-testid='component2'></p>
            </GridContainer>
        );
        const comp1 = getByTestId("component1").parentElement;
        const comp2 = getByTestId("component2").parentElement;
        //comp1.
    });
});