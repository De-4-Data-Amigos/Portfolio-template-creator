import * as React from 'react';
import { useState } from 'react';
import GridColumn from "../components/GridColumn";
import GridRow from "../components/GridRow";

import '../assets/GridContainer.css'

function GridContainer({columns, rows, children}) {
    //TODO: make use of useeffect for reloading grid
    
    const amountOfColumns = columns;
    const amountOfRows = rows;

    const [childrenArray, setChildrenArray] = useState(React.Children.toArray(children));

    const amountOfChildren = childrenArray.length;
    const maxAmountOfChildren = amountOfColumns * amountOfRows;
    
    const [selectedGridElement, setSelectedGridElement] = useState(null);
    
    if(amountOfChildren > maxAmountOfChildren){
        throw new Error(`GridContainer has more Children than allowed. Got: ${amountOfChildren}, expected: ${maxAmountOfChildren}`);
    }
    const existingLocations = [];
    childrenArray.forEach((child) => {
        const position = child.props["data-pos"];
        if(!position){
            throw new Error("Child is missing 'data-pos' attribute. Add it like this: <p data-pos='0,0'></p>");
        }
        
        if(position.indexOf(',') < 0){
            throw new Error(`Child data-pos was formatted incorrectly. Got: ${position}, expected: '<x>,<y>'`)
        }
        
        let [x,y] = position.split(',');
        
        if(x >= amountOfColumns){
            throw new Error(`A child had a x position higher than than grid's size. Got: ${x}, expected: ${amountOfColumns-1}`);
        }
        if(y >= amountOfRows){
            throw new Error(`A child had an y position higher than than grid's size. Got: ${y}, expected: ${amountOfRows-1}`);
        }
        if(x < 0){
            throw new Error(`A child had a x position smaller than grid's size. Got: ${x}, expected: 0`);
        }
        if(y < 0){
            throw new Error(`A child had an y position smaller than grid's size. Got: ${y}, expected: 0`);
        }
        
        if(existingLocations.indexOf(position) >= 0){
            throw new Error(`One or more childrens had same position. Duplication posistion: ${position} - type: ${child.type}`);
        }
        existingLocations.push(position);
    });
    
    const clickHandler = (e) => {
        const clickedElement = e.target.children[0];     
        const clickedPos = clickedElement.attributes["data-pos"].value;
        if(!selectedGridElement){
            setSelectedGridElement(clickedElement);
            return;
        }
        if(selectedGridElement.attributes["data-pos"].value == clickedPos){
            setSelectedGridElement(null);
            return;
        }
        changePositionOfElement(selectedGridElement.attributes["data-pos"].value, clickedPos);
        setSelectedGridElement(null);
    };

    const makeColumns = (array) => {
        const columns = [];
        for(let i = 0; i < amountOfColumns; i++){
            const rows = []
            for(let j = 0; j < amountOfRows; j++){
                let element = (<p data-pos={`${i},${j}`}>{i},{j}</p>);
                array.forEach((child) => {
                    const location = child.props["data-pos"];
                    if(location == `${i},${j}`){
                        element = child;
                    }
                });
                rows.push(<GridRow onClick={clickHandler} key={Math.random()} data-rows={amountOfRows} data-columns={amountOfColumns}>{element}</GridRow>);
            }
            columns.push(<GridColumn key={Math.random()}>{rows}</GridColumn>);
        }
        return columns;        
    };
    
    //const [grid, setGrid] = React.useState(makeColumns(childrenArray));
    let grid = makeColumns(childrenArray);
    const changePositionOfElement = (oldPos, newPos) => {
        let oldElement;
        let newElement;

        console.log("Changing from", oldPos, "to", newPos);

        childrenArray.forEach((child) => {
            const pos = child.props["data-pos"];
            if(pos == oldPos){
               oldElement = child;
            }
            if(pos == newPos){
                newElement = child;
            }
        });
        let temp = childrenArray.map((child) => {
            let newChild = child;

            if(child == oldElement){
                newChild = React.cloneElement(child, {"data-pos" : newPos});
            }
            if(newElement && child == newElement){
                newChild = React.cloneElement(child, {"data-pos" : oldPos});
            }

            return newChild;
        });
        setChildrenArray(temp);

        //setGrid(makeColumns(childrenArray));
        grid = makeColumns(childrenArray);
    };


    
    return(
        <div className="GridContainer">
            {grid}
        </div>
    );
}

export default GridContainer;