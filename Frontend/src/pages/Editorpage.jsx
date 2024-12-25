import React, { useState, cloneElement, useEffect } from "react";
import GridContainer from "../components/GridContainer";
import GridDeleteZone from "../components/GridDeleteZone";
import NavbarContainer from "../components/NavbarContainer";
import FooterContainer from "../components/FooterContainer";
import Toolbar from "../components/Toolbar";
import "../assets/GridContainer.css";
import EditableTextInputField from "../components/EditableTextInputField";
import { useBackground } from "../components/BackgroundContext";
import EditorLink from "../components/EditorLink";
import RestoreState from "../components/RestoreState";
import { DeleteUsingObjectKey } from "../utils/arrayUtils";


function EditorPage() {
    const navbarColumns = 4;
    const navbarRows = 1;
    const bodyColumns = 3;
    const bodyRows = 3;
    const footerColums = 4;
    const footerRows = 1;

    const [navbarLinks, setNavbarLinks] = useState(new Map());
    const [footerLinks, setFooterLinks] = useState(new Map());


    const [navbarGridChildren, setNavbarGridChildren] = useState([]);
    const [bodyGridChildren, setBodyGridChildren] = useState([]);
    const [footerGridChildren, setFooterGridChildren] = useState([]);
    const stateHistory = [];

    const { background } = useBackground();
    useEffect(() => {
        console.log("updated navbarGridChildren", navbarGridChildren);
        stateHistory.push(saveState());       
    }, [navbarGridChildren])
    useEffect(() => {
        console.log("updated bodyGridChildren", bodyGridChildren);
        stateHistory.push(saveState());
    }, [bodyGridChildren])
    useEffect(() => {
        console.log("updated footerGridChildren", footerGridChildren);
        stateHistory.push(saveState());
    }, [footerGridChildren])
    

    const saveState = () => {
        const state = [];
        console.log("Saving state...");
        const saveStateFn = (value) => {
            let componentState = {};
            let componentData = {};
            let data = {};
            let component = value;
            let typeName = component.type.name;
            let key = value.props["datapos"];
            
            componentState["componentName"] = typeName;
            
            data["pos"] = key;
            data["gridName"] = grid;

            componentData = component.props;
 
            data["componentData"] = componentData;
            componentState["data"] = data;
            //console.log("Adding Component: ", componentState);
            state.push(componentState);
        }
        let grid = "navbar";
        navbarGridChildren.forEach(saveStateFn);
        grid = "body";
        bodyGridChildren.forEach(saveStateFn);
        grid = "footer";
        footerGridChildren.forEach(saveStateFn);
        console.log("State: ", state);
        //alert(JSON.stringify(state));
        return state;
    };

    const restoreStateFn = (jsonState) =>{
        const state = JSON.parse(jsonState);       
        console.log("Restoring state: ", state);
        const tempArrayNavbar = [];
        const tempArrayBody = [];
        const tempArrayFooter = [];
        for (let i = 0; i < state.length; i++) {
            const element = state[i];
            let comp;
            switch (element.componentName) {
                case "EditableTextInputField":
                    comp = (<EditableTextInputField onUpdate={updateEditableText} datapos={element.data.pos} key={`gridComponent-${element.data.pos}`} grid={element.data.gridName}>{element.data.componentData.children}</EditableTextInputField>);
                    break;
                
                case "EditorLink":
                    comp = (<EditorLink datapos={element.data.pos} text={element.data.componentData.text} href={element.data.componentData.href} key={`gridComponent-${element.data.pos}`}/>);
                break;

                default:
                    break;
            }
            switch (element.data.gridName) {
                case "navbar":
                    tempArrayNavbar.push(comp);
                    break;
                case "body":
                    tempArrayBody.push(comp);
                    break;
                case "footer":
                    tempArrayFooter.push(comp);
                    break;
            
                default:
                    break;
            }
        }
        setNavbarGridChildren(tempArrayNavbar);
        setBodyGridChildren(tempArrayBody);
        setFooterGridChildren(tempArrayFooter);
    };

    const updateEditableText = (input, datapos, grid) =>{
        console.log("Updating text for input", datapos);        
        //element = cloneElement(comp, {'children' : input});

        // THIS IS NOT A GOOD WAY. 
        // React doesn't want to have the states populated when this is updated, 
        // the way i wanted, so this is isnt a bandaid fix, 
        // but a gaffer tape solution....
        // This 100% needs to be refactored.
        // TODO: clean this mess up.
        updateElement(
            (<EditableTextInputField 
                onUpdate={updateEditableText} 
                datapos={datapos} 
                grid={grid} 
                key={`gridComponent-${datapos}`}>
                    {input}
            </EditableTextInputField>)
            , grid, datapos);        
    };

    const updateElement = (element, grid, pos) => {
        let array;
        let index = -1;
        switch (grid) {
            case "navbar":
                array = [...navbarGridChildren];
                index = findInArray(array, pos);
                array.splice(index, 1);
                array.push(element);
                setNavbarGridChildren(array);
                break;

            case "body":
                array = [...bodyGridChildren];
                index = findInArray(array, pos);
                array.splice(index, 1);
                array.push(element);
                setBodyGridChildren(array);
                break;
                
            case "footer":
                array = [...footerGridChildren];
                index = findInArray(array, pos);
                array.splice(index, 1);
                array.push(element);
                setFooterGridChildren(array);
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
        addComponent(<EditorLink text={text} href={href} />, "navbar");        
    };

    const addFooterLinks = (text, href) => {
        setFooterLinks(<EditorLink text={text} href={href} />);
    };

    const addComponent = (comp, parentGridName) => {
        const updateArray = (array, columns, rows, setFn) => {
            for (let x = 0; x < columns; x++) {
                for (let y = 0; y < rows; y++) {
                    const position = `${x},${y}`;
                    let exists = false;
                    array.forEach((element)=>{
                        if(element.props["datapos"] == position){
                            exists = true;
                            return;
                        }
                    });
                    if(exists){
                        continue;
                    }
                    const newComp = cloneElement(comp, { "datapos": position, key: `gridComponent-${position}` });
                    //array.push(newComp);
                    setFn(prev => [...prev, newComp]);
                    return;
                }                    
            }
        };
        switch (parentGridName) {
            case "navbar":
                updateArray(navbarGridChildren, navbarColumns, navbarRows, setNavbarGridChildren);
                break;
                
            case "body":
                updateArray(bodyGridChildren, bodyColumns, bodyRows, setBodyGridChildren);
                break;
            case "footer":
                updateArray(footerGridChildren, footerColums, footerRows, setFooterGridChildren);
                break;
        
            default:
                console.log("Invalid grid name: ", parentGridName);                
                break;
        }
    };
   
    const removeComponent = (removedPos, parentGridName) => {
        console.log("removedPos:", removedPos, "parentGridName:", parentGridName);        
        let tempArray;
        switch (parentGridName) {
            case "navbar":
                tempArray = [...navbarGridChildren];
                for (let i = 0; i < tempArray.length; i++) {
                    const element = tempArray[i];
                    if(element.props["datapos"] == removedPos){
                        tempArray.splice(i, 1);
                        break;
                    }
                }
                setNavbarGridChildren(tempArray);
                break;
                
            case "body":
                tempArray = [...bodyGridChildren];
                for (let i = 0; i < tempArray.length; i++) {
                    const element = tempArray[i];
                    if(element.props["datapos"] == removedPos){
                        tempArray.splice(i, 1);
                        break;
                    }
                }
                setBodyGridChildren(tempArray);
                break;

            case "footer":
                tempArray = [...footerGridChildren];
                for (let i = 0; i < tempArray.length; i++) {
                    const element = tempArray[i];
                    if(element.props["datapos"] == removedPos){
                        tempArray.splice(i, 1);
                        break;
                    }
                }
                setFooterGridChildren(tempArray);
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
            addComponent(<EditorLink text={text} href={href} />, "footer");
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

    const findInArray = (array, pos) => {
        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            if(element.props["datapos"] == pos){
                return i;
            }
        }
        return -1;
    };

    const indexOfPosistion = (pos, grid) => {
        switch (grid) {
            case "navbar":
                return findInArray(navbarGridChildren, pos);

            case "body":
                return findInArray(bodyGridChildren, pos);
                
            case "footer":
                return findInArray(footerGridChildren, pos);

            default:
                break;
        }
    };

    const changePositionOfElementInBodyGrid = (oldPos, newPos) => {
        let tempArray = [...bodyGridChildren];
        const oldIndex = indexOfPosistion(oldPos, "body");        
        const newIndex = indexOfPosistion(newPos, "body");
        
        let oldElement = tempArray[oldIndex];
        let newElement = tempArray[newIndex];
        if(oldIndex == newIndex){
            return;
        }

        if(newPos > -1){
            tempArray.splice(newPos, 1);
        }
        tempArray.push(cloneElement(oldElement, {"datapos" : newPos, "key": `gridComponent-${newPos}`}));
        if(newElement){

            tempArray.push(cloneElement(newElement, {"datapos" : oldPos, "key": `gridComponent-${oldPos}`}));
        }
        else{
            tempArray.splice(oldPos, 1);
        }
        setBodyGridChildren(tempArray);
    };

    const changePositionOfElementInNavbarGrid = (oldPos, newPos) => {
        let tempArray = [...navbarGridChildren];
        const oldIndex = indexOfPosistion(oldPos, "navbar");        
        const newIndex = indexOfPosistion(newPos, "navbar");
        
        let oldElement = tempArray[oldIndex];
        let newElement = tempArray[newIndex];
        if(oldIndex == newIndex){
            return;
        }

        if(newPos > -1){
            tempArray.splice(newPos, 1);
        }
        tempArray.push(cloneElement(oldElement, {"datapos" : newPos, "key": `gridComponent-${newPos}`}));
        if(newElement){

            tempArray.push(cloneElement(newElement, {"datapos" : oldPos, "key": `gridComponent-${oldPos}`}));
        }
        else{
            tempArray.splice(oldPos, 1);
        }
        setNavbarGridChildren(tempArray);
    };

    function getBackgroundStyle() {
        const { background } = useBackground();
        if (background.type === 'image') {
            return { backgroundImage: `url(${background.value})`, backgroundSize: 'cover', backgroundPosition: 'center' };
        } else {
            return { backgroundColor: background.value, backgroundSize: 'auto', backgroundPosition: 'initial' };
        }
    }
    

    const changePositionOfElementInFooterGrid = (oldPos, newPos) => {
        let tempArray = [...footerGridChildren];
        const oldIndex = indexOfPosistion(oldPos, "footer");        
        const newIndex = indexOfPosistion(newPos, "footer");
        
        let oldElement = tempArray[oldIndex];
        let newElement = tempArray[newIndex];
        if(oldIndex == newIndex){
            return;
        }

        if(newPos > -1){
            tempArray.splice(newPos, 1);
        }
        tempArray.push(cloneElement(oldElement, {"datapos" : newPos, "key": `gridComponent-${newPos}`}));
        if(newElement){

            tempArray.push(cloneElement(newElement, {"datapos" : oldPos, "key": `gridComponent-${oldPos}`}));
        }
        else{
            tempArray.splice(oldPos, 1);
        }
        setFooterGridChildren(tempArray);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            {/* Navbar */}
            <NavbarContainer linkMap={navbarLinks} onUpdateLinks={updateNavbarLinks}>
                <GridContainer columns={navbarColumns} rows={navbarRows} style={{height: '100%', margin: 0}} name={"navbar"}
                onUpdate={changePositionOfElementInNavbarGrid}>
                    {navbarGridChildren}
                </GridContainer>
            </NavbarContainer>
            {/* Grid-container sektion */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", marginTop: "30px" }}>
                <div>
                    <button onClick={handleAddLink}>Tilføj navbar-link</button>
                </div>
                <div style={{ marginTop: "20px", flex: 1 }}>
                    {/* Baggrundskontainer for grid */}
                    <div style={getBackgroundStyle()}>
                      <GridContainer columns={bodyColumns} rows={bodyRows} name={"body"} onUpdate={changePositionOfElementInBodyGrid}>
                          {bodyGridChildren}
                      </GridContainer>
                    </div> 
                </div>
            </div>

            <div style={{ paddingTop: "10vh"}} ></div>

            <FooterContainer linkMap={footerLinks} onUpdatelinks={updateFooterLinks}>
                <GridContainer columns={footerColums} rows={footerRows} name={"footer"} style={{height: '100%', margin: 0}}              
                onUpdate={changePositionOfElementInFooterGrid}>
                    {footerGridChildren}
                </GridContainer>
            </FooterContainer>
            <div>
                    <button onClick={handleAddFooterLink}>Tilføj footer-link</button>
                </div>


            {/* Divider / Space */}
            <div style={{ paddingTop: "20vh"}} ></div>
    
            {/* Footer */}
            <div>                
                <div style={{ display: "flex" }}>
                    <Toolbar addComponent={addComponent} onTextUpdate={updateEditableText}>
                        <div className="toolbar-item" onClick={() => alert(JSON.stringify(stateHistory.at(-1)))}>
                            <div className="toolbar-label">Save state</div>
                        </div>
                        <RestoreState restoreStateFn={restoreStateFn}/>
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
