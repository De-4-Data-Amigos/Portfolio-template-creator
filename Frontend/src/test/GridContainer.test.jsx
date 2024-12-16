import * as React from 'react'
import { render, fireEvent } from '@testing-library/react';
import GridContainer from '../components/GridContainer';
import { spyOn } from 'jest'

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
        // Map as storage place
        const testStorageDrag = new Map();
        const testStorageDrop = new Map();
        //const [bodyGridChildren, setBodyGridChildren] = React.useState(new Map());
        const bodyGridChildren = new Map();

        const TestComp = () => {
            return(<p>test</p>);
        };

        //data-pos={`${num},${num}`} data-testid={`component${num}`}
        const changePositionOfElement = (oldPos, newPos) => {
            console.log("Changing from", oldPos, "to", newPos);
            
            let oldElement = bodyGridChildren.get(oldPos);
            let newElement = bodyGridChildren.get(newPos);
    
            bodyGridChildren.set(newPos, React.cloneElement((<div>{oldElement}</div>), {"data-pos" : newPos}));
            if(newElement){
                bodyGridChildren.set(oldPos, React.cloneElement((<div>{newElement}</div>), {"data-pos" : oldPos}));
            }
            else{
                bodyGridChildren.set(oldPos, undefined);
            }
        };


        bodyGridChildren.set('0,0', React.cloneElement(<div><TestComp/></div>, { "data-pos" : '0,0', "data-testid": "component0" }));
        bodyGridChildren.set('1,1', React.cloneElement(<div><TestComp/></div>, { "data-pos" : '1,1', "data-testid": "component1" }));

        
        const { getAllByTestId, getByTestId } = render(
            <GridContainer columns={columns} rows={rows} onUpdate={changePositionOfElement}>
                {Array.from(bodyGridChildren.values())}
            </GridContainer>
        );
        const comp1Parent = getByTestId("component0").parentElement;
        const comp2Parent = getByTestId("component1").parentElement;
        
        // https://stackoverflow.com/questions/54864280/how-to-mock-datatransfer-with-jest
        // Mock of the drop Event
        const testEventDrag = {
            dataTransfer: {
                setData: (key, value) => testStorageDrag.set(key, value),
                getData: (key) => testStorageDrag.get(key),
                clearData: () => testStorageDrag.clear()
            },
            target: comp1Parent
        };
        const testEventDrop = {
            dataTransfer: {
                setData: (key, value) => testStorageDrop.set(key, value),
                getData: (key) => testStorageDrop.get(key),
                clearData: () => testStorageDrop.clear()
            },
            target: comp2Parent
        };
        // remmeber to have 'and.callTrough()' to allow go trough the method
        //jest.spyOn(testEventDrag.dataTransfer, 'getData').and.callThrough();
        //spyOn(testEventDrop.dataTransfer, 'getData').and.callThrough();
        expect(fireEvent.dragStart(comp1Parent, testEventDrag)).toEqual(true);
        expect(fireEvent.drop(comp2Parent, testEventDrop)).toEqual(true);
        const movedComponet = getByTestId("component1");
        expect(movedComponet).toHaveAttribute('data-pos', '1,1');
    });
});