import { cloneElement, useState } from "react";
import GridContainer from "../components/GridContainer";

function Editorpage() {

    const columns = 3;
    const rows = 3;
    const maxComponentAmount = columns * rows;

    const [componentAmount, setComponentAmount] = useState(0);

    const [gridChildren, setGridChildren] = useState(new Map());

    const [childrenArray, setChildrenArray] = useState([]);

    /* TODO: only add one element, at the first availible space. */
    /* TODO: Try with a test component. */

    const addComponent = (comp) => {
        if(componentAmount == maxComponentAmount){
            return;
        }        
        addloop: {
            for (let i = 0; i < columns; i++) {
                for (let j = 0; j < rows; j++) {
                    if(!gridChildren.get(`${i},${j}`)){
                        comp = cloneElement(comp, {"data-pos" : `${i},${j}`, key: `gridComponent-${i},${j}`})
                        setGridChildren(gridChildren.set(`${i},${j}`, comp));
                        break addloop;
                    }
                }
            }
        }
        setChildrenArray(Array.from(gridChildren, ([key, value]) => (value)));
    };
    return(
        <div
            style={{
                display: "flex"
            }}
        >

            <button onClick={() => addComponent(<p>test</p>)}>add p tag</button>
            <GridContainer columns={columns} rows={rows}>
                {childrenArray}
            </GridContainer>
        </div>
    );
}

export default Editorpage;