import React, { useState, cloneElement, useEffect } from "react";
import GridContainer from "../components/GridContainer";
import GridDeleteZone from "../components/GridDeleteZone";
import NavbarContainer from "../components/NavbarContainer";
import FooterContainer from "../components/FooterContainer";
import Toolbar from "../components/Toolbar";
import "../assets/GridContainer.css";


function EditorPage() {
    const navbarColumns = 4;
    const navbarRows = 1;
    const bodyColumns = 3;
    const bodyRows = 3;
    const footerColums = 4;
    const footerRows = 1;

    const [navbarLinks, setNavbarLinks] = useState(new Map());
    const [footerLinks, setFooterLinks] = useState(new Map());


    const [navbarGridChildren, setNavbarGridChildren] = useState(new Map());
    const [bodyGridChildren, setBodyGridChildren] = useState(new Map());
    const [footerGridChildren, setFooterGridChildren] = useState(new Map());

    const [stack, setStack] = useState([]);

    useEffect(() => {
        console.log("updated navbarGridChildren", navbarGridChildren);        
    }, [navbarGridChildren])
    useEffect(() => {
        console.log("updated bodyGridChildren", bodyGridChildren);
    }, [bodyGridChildren])
    useEffect(() => {
        console.log("updated footerGridChildren", footerGridChildren);
    }, [footerGridChildren])
    
    let currentState = [];

    const saveState = () => {
        const state = [];
        console.log("Saving state...");

        const handleComponentData = (componentType) => {
            switch (componentType) {
                case "EditableTextInputField":
                    // handle EditableTextInputField
                    break;
                case "EditorLink":

                    break;
            
                default:
                    break;
            }
        };
        
        bodyGridChildren.forEach((value, key) => {
            let componentState = {};
            let componentData = {};
            let data = {};
            let component = value.props["children"];
            console.log("key: ", key);
            console.log("component: ", component);
            let typeName = component.type.name;
            
            componentState["componentName"] = typeName;
            
            data["pos"] = key;
            data["gridName"] = "body";

            componentData = component.props;
            //componentData["text"] = component.props["text"];
 
            data["componentData"] = componentData;
            componentState["data"] = data;
            console.log("Adding Component: ", componentState);
            state.push(componentState);
        });
        
        return state;
    };



    const updateEditableText = (input, datapos, gridName) =>{
        const temp = (input, datapos, gridName) =>{
            console.log("Updating text for input", datapos);        
            let element = getElementFromGrid(gridName, datapos);
            element = cloneElement(element, {'text' : input});
            updateElement(element, gridName, datapos);
        };
        setStack((prev) => {[...prev, {
            input: input,
            datapos: datapos,
            gridName: gridName,
            fn: temp
        }]});
    };

    const updateElement = (element, grid, pos) => {
        let tempMap;
        switch (grid) {
            case "navbar":
                tempMap = new Map(navbarGridChildren);
                tempMap.set(pos, element);
                setNavbarGridChildren(tempMap);
                break;
            case "body":
                tempMap = new Map(bodyGridChildren);
                tempMap.set(pos, element);
                setBodyGridChildren(tempMap);
                break;
            case "footer":
                tempMap = new Map(footerGridChildren);
                tempMap.set(pos, element);
                setFooterGridChildren(tempMap);
                break;
        
            default:
                break;
        }
    };

    const getElementFromGrid = (grid, pos) => {
        switch (grid) {
            case "navbar":
                return navbarGridChildren.get(pos);
            case "body":
                return bodyGridChildren.get(pos);
            case "footer":
                return footerGridChildren.get(pos);
        
            default:
                break;
        }
    };
  
    const addNavbarLink = (text, href) => {
        addComponent(EditorLink(text, href), "body");        
    };

    const addFooterLinks = (text, href) => {
        setFooterLinks(EditorLink(text, href));
    };

    const addComponent = (comp, parentGridName) => {
        const updateMap = (map, columns, rows) => {
            addloop: {
                for (let i = 0; i < columns; i++) {
                    for (let j = 0; j < rows; j++) {
                        const position = `${i},${j}`;
                        if (!map.has(position) || !map.get(position)) {
                            //const _comp = cloneElement(comp, { "datapos": position});
                            const newComp = cloneElement(comp, { "datapos": position, key: `gridComponent-${position}` });
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
                tempMap = updateMap(tempMap, navbarColumns, navbarRows);
                setNavbarGridChildren(tempMap);
                break;
                
            case "body":
                tempMap = new Map(bodyGridChildren);
                tempMap = updateMap(tempMap, navbarColumns, navbarRows);
                setBodyGridChildren(tempMap);
                break;
            case "footer":
                tempMap = new Map(footerGridChildren);
                tempMap = updateMap(tempMap, navbarColumns, navbarRows);
                setFooterGridChildren(tempMap);
                break;
        
            default:
                console.log("Invalid grid name: ", parentGridName);
                
                break;
        }
    };

   
    const removeComponent = (removedPos, parentGridName) => {
        console.log("removedPos:", removedPos, "parentGridName:", parentGridName);
        
        
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
                if (bodyGridChildren.delete(removedPos)) {
                    setBodyGridChildren(tempMap);
                }
                break;

            case "footer":
                tempMap = new Map(footerGridChildren)
                if (tempMap.delete(removedPos)) {
                    setFooterGridChildren(tempMap);
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

    const handleAddFooterLink = () => {
        const text = prompt("Write the text for the footer:");
        const href = prompt("Write the link (URL) for the footer:");
    
        if (text && href) {
            addComponent(EditorLink(text, href), "footer");
        } else {
            alert("Both text and link must be filled in!");
        }
    };


    const updateNavbarLinks = (updatedLinks) => {
        setNavbarLinks(updatedLinks);
    };
    const updateFooterLinks = (updatedLinks) => {
        setFooterLinks(updatedLinks);
    };

    const onDropDeleteZone = (event) => {
        event.preventDefault();
        console.log("onDropDeleteZone", event);
        const dtData = event.dataTransfer.getData("text");
        console.log(dtData);        
        const data = dtData.split("-");
        const [x, y] = data[0].split(',');
        const position = `${x},${y}`;
        removeComponent(position, data[1]); 
    };

    const changePositionOfElementInBodyGrid = (oldPos, newPos) => {
        //console.log("Changing from", oldPos, "to", newPos);

        _stack.forEach((_value) => {
            _value.fn(_value.input, _value.datapos, _value.gridName);
        });


        let tempMap = new Map(bodyGridChildren);
        
        let oldElement = tempMap.get(oldPos);
        let newElement = tempMap.get(newPos);

        tempMap.set(newPos, cloneElement(oldElement, {"datapos" : newPos, "key": `gridComponent-${newPos}` }));
        if(newElement){
            tempMap.set(oldPos, cloneElement(newElement, {"datapos" : oldPos, "key": `gridComponent-${oldPos}` }));
        }
        else{
            tempMap.delete(oldPos);
        }
        setBodyGridChildren(tempMap);
    };

    const changePositionOfElementInNavbarGrid = (oldPos, newPos) => {
        console.log("Changing from", oldPos, "to", newPos);
        let tempMap = new Map(navbarGridChildren);
        
        let oldElement = tempMap.get(oldPos);
        let newElement = tempMap.get(newPos);

        tempMap.set(newPos, cloneElement(oldElement, {"datapos" : newPos}));
        if(newElement){
            tempMap.set(oldPos, cloneElement(newElement, {"datapos" : oldPos}));
        }
        else{
            tempMap.set(oldPos, undefined);
        }
        setNavbarGridChildren(tempMap);
    };
    //setFooterGridChildren(tempMap);


    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            {/* Navbar */}
            <NavbarContainer linkMap={navbarLinks} onUpdateLinks={updateNavbarLinks}>
                <GridContainer columns={navbarColumns} rows={navbarRows} style={{height: '100%', margin: 0}} name={"navbar"}
                onUpdate={changePositionOfElementInNavbarGrid}>
                    {Array.from(navbarGridChildren.values())}
                </GridContainer>
            </NavbarContainer>

            <button onClick={() => saveState()}>test state</button>
            {/* Grid-container sektion */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", marginTop: "30px" }}>
                <div>
                    <button onClick={handleAddLink}>Tilføj navbar-link</button>
                </div>
                <div style={{ marginTop: "20px", flex: 1 }}>
                    <GridContainer columns={bodyColumns} rows={bodyRows} name={"body"} onUpdate={changePositionOfElementInBodyGrid}>
                        {Array.from(bodyGridChildren.values())}
                    </GridContainer>
                </div>
            </div>
            <div style={{ paddingTop: "10vh"}} ></div>

            <FooterContainer linkMap={footerLinks} onUpdatelinks={updateFooterLinks}>
                <GridContainer columns={footerColums} rows={footerRows} name={"footer"} style={{height: '100%', margin: 0}}
                
                onUpdate={changePositionOfElementInNavbarGrid}>
                    {Array.from(footerGridChildren.values())}
                </GridContainer>
            </FooterContainer>
            <div>
                    <button onClick={handleAddFooterLink}>Tilføj footer-link</button>
                </div>

            {/* Divider / Space */}
            <div style={{ paddingTop: "20vh"}} ></div>
            {/* Footer */}
            <div style={{ }}>                
                <div style={{ display: "flex" }}>
                    <Toolbar addComponent={addComponent} onTextUpdate={updateEditableText}>
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
