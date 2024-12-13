import React, { useState, cloneElement } from "react";
import GridContainer from "../components/GridContainer";
import GridDeleteZone from "../components/GridDeleteZone";
import NavbarContainer from "../components/NavbarContainer";
import Toolbar from "../components/Toolbar";
import "../assets/GridContainer.css";
import EditableTextInputField from "../components/EditableTextInputField";

function EditorPage() {
    const columns = 3;
    const rows = 3;
    /*
    const maxComponentAmount = columns * rows;
    const [componentAmount, setComponentAmount] = useState(0);
    const [gridChildren, setGridChildren] = useState(new Map());
    const [childrenArray, setChildrenArray] = useState([]);
    */
    const [navbarLinks, setNavbarLinks] = useState(new Map());


    const [navbarGridChildren, setNavbarGridChildren] = useState(new Map());
    const [bodyGridChildren, setBodyGridChildren] = useState(new Map());
  
    const addNavbarLink = (text, href) => {
        let tempMap = new Map(navbarLinks);
        addloop: {
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 1; j++) {
                    const pos = `${i},${j}`;
                    if (!tempMap.has(pos)) {
                        const newLink = { id: Date.now(), text, href, pos };
                        tempMap.set(pos, newLink);
                        break addloop;
                    }
                }
            }
        }
        setNavbarLinks(tempMap);
    };

    const addComponent = (comp, parentGridName) => {
        /* 
        if (componentAmount === maxComponentAmount) {
            alert("Grid is filled up");
            return;
        }
        */

        const updateMap = (map) => {
            addloop: {
                for (let i = 0; i < columns; i++) {
                    for (let j = 0; j < rows; j++) {
                        const position = `${i},${j}`;
                        if (!map.has(position) || !map.get(position)) {
                            const newComp = cloneElement(comp, { "data-pos": position, key: `gridComponent-${position}` });
                            map.set(position, newComp);
                            //setComponentAmount((prev) => prev + 1);
                            break addloop;
                        }
                    }
                }
            }
            return map;
        };
       let tempMap;
        switch (parentGridName) {
            case "navbar":
                tempMap = new Map(navbarGridChildren);
                updateMap(tempMap);
                setNavbarGridChildren(tempMap);
                break;
                
            case "body":
                tempMap = new Map(bodyGridChildren);
                updateMap(tempMap);
                setBodyGridChildren(tempMap);
                break;
        
            default:
                console.log("Invalid grid name: ", parentGridName);
                
                break;
        }
        // = new Map(gridChildren); 
        //setGridChildren(updatedGridChildren);
        //setChildrenArray(Array.from(updatedGridChildren.values()));
    };

   
    const removeComponent = (removedPos, parentGridName) => {
        let tempMap; 
        
        switch (parentGridName) {
            case "navbar":
                tempMap = new Map(navbarGridChildren);
                if (tempMap.delete(removedPos)) {
                    setNavbarGridChildren(tempMap);
                }
                break;
                
            case "body":
                tempMap = new Map(bodyGridChildren);
                if (tempMap.delete(removedPos)) {
                    setBodyGridChildren(tempMap);
                    console.log("state:", bodyGridChildren, "temp:", tempMap);
                    
                }
                break;
                
            default:
                console.log("Invalid grid name: ", parentGridName);
                break;
        }
    };

    const handleAddLink = () => {
        const text = prompt("Write the text for the navbar:" );
        const href = prompt("Write the link (URL) for the navbar:" );

        if (text && href) {
            addNavbarLink(text, href);
        } else {
            alert("Both text and link must be filled in!" );
        }
    };


    const updateNavbarLinks = (updatedLinks) => {
        setNavbarLinks(updatedLinks);
    };

    const onDropDeleteZone = (event) => {
        event.preventDefault();
        console.log("onDropDeleteZone", event);
        const data = event.dataTransfer.getData("text");
        const [x, y] = data.split(",");
        const position = `${x},${y}`;
        removeComponent(position, "body"); 
        /* 
        event.dataTransfer.clearData();
        */
    };

    const changePositionOfElement = (oldPos, newPos) => {
        console.log("Changing from", oldPos, "to", newPos);
        let tempMap = new Map(bodyGridChildren);
        
        let oldElement = tempMap.get(oldPos);
        let newElement = tempMap.get(newPos);

        tempMap.set(newPos, cloneElement(oldElement, {"data-pos" : newPos}));
        if(newElement){
            tempMap.set(oldPos, cloneElement(newElement, {"data-pos" : oldPos}));
        }
        else{
            tempMap.set(oldPos, undefined);
            //removeComponent(oldPos, "body")
        }
        setBodyGridChildren(tempMap);

        /*
        tempMap.forEach((value, key) => {
            const pos = value.props["data-pos"];
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
        */
         //setGrid(makeColumns(childrenArray));
        //onUpdate(childrenArray);
    };

    const onBodyGridUpdate = (array) => {
        // todo
        const tempMap = new Map(bodyGridChildren);
        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            const pos = element.props["data-pos"];
            tempMap.set(pos, element);
        }
        console.log("onUpdate", array, tempMap);
        
        //setBodyGridChildren(tempMap);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            {/* Navbar */}
            <NavbarContainer linkMap={navbarLinks} onUpdateLinks={updateNavbarLinks} />

            {/* Grid-container sektion */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", marginTop: "30px" }}>
                <div>
                    <button onClick={handleAddLink}>Tilføj navbar-link</button>
                </div>
                <div style={{ marginTop: "20px", flex: 1 }}>
                    <button onClick={() => addComponent(<p>test{Math.random()}</p>, "body")}>Add p tag</button>
                    <GridContainer columns={columns} rows={rows} onUpdate={changePositionOfElement}>
                        {Array.from(bodyGridChildren.values())}
                    </GridContainer>
                </div>
            </div>

                 {/* Divider / Space */}
            <div style={{ paddingTop: "15vh"}} ></div>

            {/* Footer */}
            <div style={{ }}>
                
                <div style={{ display: "flex" }}>
                    <Toolbar addComponent={addComponent}>
                        <GridDeleteZone onDrop={onDropDeleteZone} />
                    </Toolbar>
                </div>
                
                <div style={{ flex: 1 }}>
                </div>
            </div>
        </div>
    );
}

export default EditorPage;
