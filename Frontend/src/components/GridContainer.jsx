import * as React from 'react';
import { useState, useEffect } from 'react';
import GridColumn from "../components/GridColumn";
import GridRow from "../components/GridRow";
import '../assets/GridContainer.css';

function GridContainer({columns, rows, name, onUpdate, children, style}) { 
    //console.log('columns: ', columns, 'rows: ',  rows, 'children: ', children);   
    const amountOfColumns = columns;
    const amountOfRows = rows;
    const emptyElement = (<div data-grid-empty={true}></div>);

    const [childrenArray, setChildrenArray] = useState(React.Children.toArray(children));

    const amountOfChildren = childrenArray.length;
    const maxAmountOfChildren = amountOfColumns * amountOfRows;
    
    const [selectedGridPos, setSelectedGridPos] = useState(null);
    const [targetGridPos, setTargetGridPos] = useState(null);

    useEffect(() => {
        setChildrenArray(React.Children.toArray(children));
    }, [children]);
    
    if(amountOfChildren > maxAmountOfChildren){
        throw new Error(`GridContainer has more Children than allowed. Got: ${amountOfChildren}, expected: ${maxAmountOfChildren}`);
    }
    const existingLocations = [];
    childrenArray.forEach((child) => {
        const position = child.props["datapos"];
        if(!position){
            throw new Error("Child is missing 'datapos' attribute. Add it like this: <p datapos='0,0'></p>");
        }
        
        if(position.indexOf(',') < 0){
            throw new Error(`Child datapos was formatted incorrectly. Got: ${position}, expected: '<x>,<y>'`)
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
    
    const onDragStart = (e) => {
        //console.log("onDragStart", e);
        const dragElement = e.target.children[0];
        const isEmpty = !!dragElement.attributes["data-grid-empty"] && Boolean(dragElement.attributes["data-grid-empty"].value);
        if(isEmpty){
            e.preventDefault();
            return;
        }
        const startDragPos = dragElement.attributes["datapos"].value;
        //setSelectedGridPos(startDragPos);
        e.dataTransfer.clearData();
        e.dataTransfer.setData("text/plain", `${startDragPos}-${name}`);
    };
    const onDrop = (e) => {
        //console.log("onDrop", e);
        const dropTargetElement = e.target.children[0]; 
        const startDragPos = dropTargetElement.attributes["datapos"].value;
        let dtData = e.dataTransfer.getData("text");
        dtData = String(dtData).split('-');
        const _selectedGridPos = dtData[0];
        //removeComponent(position, "body"); 
        //changePositionOfElement();
        setSelectedGridPos(null);
        setTargetGridPos(null);
        onUpdate(_selectedGridPos, startDragPos);
        grid = makeColumns(childrenArray);

    };
    const onDragEnd = (e) => {
        //console.log("onDragEnd", e);
        setSelectedGridPos(null);
    };
    const onDragEnter = (e) => {
        //console.log("onDragEnter", e);
        const enterTargetElement = !!e.target.children ? e.target.children[0] : e.target; 
        const enterTargetPos = enterTargetElement.attributes["datapos"].value;
        setTargetGridPos(enterTargetPos);
        //console.log("onDragEnter target", targetGridPos);
    };
    const onDragLeave = (e) => {
        //console.log("onDragLeave", e);
    };
    const makeColumns = (array) => {
        const columns = [];
        for(let i = 0; i < amountOfColumns; i++){
            const rows = []
            for(let j = 0; j < amountOfRows; j++){
                const isSelecting = !!(selectedGridPos);
                let isSelected = false;
                let isEmpty = true;
                let isTarget = false;
                let element = React.cloneElement(emptyElement, {"datapos" : `${i},${j}`, "data-grid-name": name});
                array.forEach((child) => {
                    if(child){
                        const location = child.props["datapos"];
                        if(location == `${i},${j}`){
                            element = child;
                            isSelected = location == selectedGridPos;
                            isEmpty = false;
                        }
                    }
                });
                isTarget = `${i},${j}` == targetGridPos;
                rows.push(
                    <GridRow 
                        isSelecting={isSelecting} 
                        isSelected={isSelected} 
                        isTarget={isTarget}
                        draggable={!isEmpty}

                        onDragEnd={onDragEnd}
                        onDragStart={onDragStart}
                        onDragEnter={onDragEnter}
                        onDragLeave={onDragLeave}                 
                        onDrop={onDrop}

                        key={`gridRow-${i}-${j}`} 
                        data-rows={amountOfRows} 
                        data-columns={amountOfColumns}
                    >{element}</GridRow>
                );
            }
            columns.push(<GridColumn key={`gridColumn-${i}`}>{rows}</GridColumn>);
        }
        return columns;        
    };
    
    let grid = makeColumns(childrenArray);
    return(
        <div style={style} className="GridContainer">
            {grid}
        </div>
    );
}

export default GridContainer;