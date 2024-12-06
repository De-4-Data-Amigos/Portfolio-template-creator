import { useState, cloneElement } from "react";
import GridContainer from "../components/GridContainer";
import NavbarContainer from "../components/NavbarContainer";
import "../assets/GridContainer.css";

function EditorPage() {
    const columns = 3;
    const rows = 3;
    const maxComponentAmount = columns * rows;

    const [componentAmount, setComponentAmount] = useState(0);
    const [gridChildren, setGridChildren] = useState(new Map());
    const [childrenArray, setChildrenArray] = useState([]);
    const [navbarLinks, setNavbarLinks] = useState([]);

    
    const addNavbarLink = (text, href) => {
        const newLink = { id: Date.now(), text, href };
        setNavbarLinks((prevLinks) => [...prevLinks, newLink]);
    };

   
    const addComponent = (comp) => {
        if (componentAmount === maxComponentAmount) {
            alert("Grid er fyldt op!");
            return;
        }

        let updatedGridChildren = new Map(gridChildren); 

        addloop: {
            for (let i = 0; i < columns; i++) {
                for (let j = 0; j < rows; j++) {
                    const position = `${i},${j}`;
                    if (!updatedGridChildren.has(position)) {
                        const newComp = cloneElement(comp, { "data-pos": position, key: `gridComponent-${position}` });
                        updatedGridChildren.set(position, newComp);
                        setComponentAmount((prev) => prev + 1);
                        break addloop;
                    }
                }
            }
        }

        setGridChildren(updatedGridChildren);
        setChildrenArray(Array.from(updatedGridChildren.values()));
    };

   
    const removeComponent = (removedPos) => {
        let updatedGridChildren = new Map(gridChildren); 
        if (updatedGridChildren.delete(removedPos)) {
            setGridChildren(updatedGridChildren);
            setComponentAmount((prev) => prev - 1);
            setChildrenArray(Array.from(updatedGridChildren.values()));
        }
    };

    
    const handleAddLink = () => {
        const text = prompt("Skriv teksten for navbaren:");
        const href = prompt("Skriv linket (URL) for navbaren:");

        if (text && href) {
            addNavbarLink(text, href);
        } else {
            alert("Både tekst og link skal udfyldes!");
        }
    };

    
    const updateNavbarLinks = (updatedLinks) => {
        setNavbarLinks(updatedLinks);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
           
            <NavbarContainer links={navbarLinks} onUpdateLinks={updateNavbarLinks} />
            
            {/* Grid-container sektion */}
            <div style={{ display: "flex", flexDirection: "column", marginTop: "30px" }}>
                <div>
                    <button onClick={handleAddLink}>Tilføj navbar-link</button>
                </div>
                <div style={{ marginTop: "20px" }}>
                    <button onClick={() => addComponent(<p>test</p>)}>Add p tag</button>
                    <GridContainer columns={columns} rows={rows} onRemove={removeComponent}>
                        {childrenArray}
                    </GridContainer>
                </div>
            </div>
        </div>
    );
}

export default EditorPage;
