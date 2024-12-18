import React, { useState, cloneElement } from "react";
import GridContainer from "../components/GridContainer";
import GridDeleteZone from "../components/GridDeleteZone";
import NavbarContainer from "../components/NavbarContainer";
import FooterContainer from "../components/FooterContainer";
import Toolbar from "../components/Toolbar";
import "../assets/GridContainer.css";
import EditableTextInputField from "../components/EditableTextInputField";
import { useBackground } from "../components/BackgroundContext";



function EditorPage() {
    const navbarColumns = 4;
    const navbarRows = 1;
    const bodyColumns = 3;
    const bodyRows = 3;
    const footerColums = 4;
    const footerRows = 1;

    const [navbarLinks, setNavbarLinks] = useState(new Map());
    const[footerLinks, setFooterLinks] = useState(new Map());


    const [navbarGridChildren, setNavbarGridChildren] = useState(new Map());
    const [bodyGridChildren, setBodyGridChildren] = useState(new Map());
    const [footerGridChildren, setFooterGridChildren] = useState(new Map());

    const { background } = useBackground();


    const linkTemp = (text, href) => {

        return (
            <span
                data-href={href}
                className="navbar-item">
                {text}
            </span>
        );
    } 
  
    const addNavbarLink = (text, href) => {
        addComponent(linkTemp(text, href), "navbar");        
    };

    const addFooterLinks = (text, href) => {
        setFooterLinks(linkTemp(text, href));
    };

    const addComponent = (comp, parentGridName) => {
        const updateMap = (map, columns, rows) => {
            addloop: {
                for (let i = 0; i < columns; i++) {
                    for (let j = 0; j < rows; j++) {
                        const position = `${i},${j}`;
                        if (!map.has(position) || !map.get(position)) {
                            const newComp = cloneElement(<div>{comp}</div>, { "data-pos": position, key: `gridComponent-${position}` });
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
                updateMap(tempMap, navbarColumns, navbarRows);
                setNavbarGridChildren(tempMap);
                break;
                
            case "body":
                tempMap = new Map(bodyGridChildren);
                updateMap(tempMap, bodyColumns, bodyRows);
                setBodyGridChildren(tempMap);
                break;
            case "footer":
                tempMap = new Map(footerGridChildren);
                updateMap(tempMap, footerColums, footerRows);
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
                if (tempMap.delete(removedPos)) {
                    setBodyGridChildren(tempMap);
                    console.log("state:", bodyGridChildren, "temp:", tempMap);
                }
                break;

            case "footer":
                tempMap = new Map(footerGridChildren);
                if (tempMap.delete(removedPos)) {
                    setFooterGridChildren(tempMap);
                    console.log("state:", footerGridChildren, "temp:", tempMap);
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
            addComponent(linkTemp(text, href), "footer");
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
        }
        setBodyGridChildren(tempMap);
    };
    const changePositionOfElementInNavbarGrid = (oldPos, newPos) => {
        console.log("Changing from", oldPos, "to", newPos);
        let tempMap = new Map(navbarGridChildren);
        
        let oldElement = tempMap.get(oldPos);
        let newElement = tempMap.get(newPos);

        tempMap.set(newPos, cloneElement(oldElement, {"data-pos" : newPos}));
        if(newElement){
            tempMap.set(oldPos, cloneElement(newElement, {"data-pos" : oldPos}));
        }
        else{
            tempMap.set(oldPos, undefined);
        }
        setNavbarGridChildren(tempMap);
        setFooterGridChildren(tempMap);
    };

    function getBackgroundStyle() {
        const { background } = useBackground();
        if (background.type === 'image') {
            return { backgroundImage: `url(${background.value})`, backgroundSize: 'cover', backgroundPosition: 'center' };
        } else {
            return { backgroundColor: background.value, backgroundSize: 'auto', backgroundPosition: 'initial' };
        }
    }
    

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            {/* Navbar */}
            <NavbarContainer linkMap={navbarLinks} onUpdateLinks={updateNavbarLinks}>
                <GridContainer columns={navbarColumns} rows={navbarRows} style={{height: '100%', margin: 0}} name={"navbar"}
                onUpdate={changePositionOfElementInNavbarGrid}>
                    {Array.from(navbarGridChildren.values())}
                </GridContainer>
            </NavbarContainer>
    
            {/* Grid-container sektion */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", marginTop: "30px" }}>
                <div>
                    <button onClick={handleAddLink}>Tilføj navbar-link</button>
                </div>
                <div style={{ marginTop: "20px", flex: 1 }}>
                    <button onClick={() => addComponent(<p>test{Math.random()}</p>, "body")}>Add p tag</button>
                    
                    {/* Baggrundskontainer for grid */}
                    <div style={getBackgroundStyle()}>
                        <GridContainer columns={bodyColumns} rows={bodyRows} name={"body"} onUpdate={changePositionOfElementInBodyGrid}>
                            {Array.from(bodyGridChildren.values())}
                        </GridContainer>
                    </div>
                </div>
            </div>
    
            {/* Divider / Space */}
            <div style={{ paddingTop: "20vh"}} ></div>
    
            {/* Footer */}
            <div>                
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
