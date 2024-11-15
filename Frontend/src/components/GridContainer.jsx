import * as React from 'react';
import GridColumn from "../components/GridColumn";
import GridRow from "../components/GridRow";

import '../assets/GridContainer.css'

function GridContainer({columns, rows, children}) {

    const amountOfColumns = columns;
    const amountOfRows = rows;
    const childrenArray = React.Children.toArray(children);

    const amountOfChildren = childrenArray.length;
    const maxAmountOfChildren = amountOfColumns * amountOfRows;


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
    })

    
    const makeColumns = () => {
        const columns = [];
        for(let i = 0; i < amountOfColumns; i++){
            const rows = []
            for(let j = 0; j < amountOfRows; j++){
                let element = (<p>{i},{j}</p>);
                childrenArray.forEach((child) => {
                    const location = child.props["data-pos"];
                    if(location == `${i},${j}`){
                        element = child;
                    }
                });
                rows.push(<GridRow key={Math.random()} data-rows={amountOfRows} data-columns={amountOfColumns}>{element}</GridRow>);
            }
            columns.push(<GridColumn key={Math.random()}>{rows}</GridColumn>);
        }
        return columns;        
    }
    let grid = makeColumns();
    return(
        <div className="GridContainer">
            {grid}
        </div>
    );
}

export default GridContainer;