import { useEffect, useState } from "react";
import GridContainer from "../components/GridContainer";

function Editorpage() {

    const columns = 3;
    const rows = 3;

    const [gridChildren, setGridChildren] = useState(new Map());

    const [childrenArray, setChildrenArray] = useState([]);

    /* TODO: only add one element, at the first availible space. */
    /* TODO: Try with a test component. */

    const addComponent = () => {
        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < rows; j++) {
                if(!gridChildren[`${i},${j}`]){
                    setGridChildren(gridChildren.set(`${i},${j}`, <p key={`component-${i},${j}`} data-pos={`${i},${j}`}>test-{i},{j}</p>));
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

            <button onClick={addComponent}>add p tag</button>
            <GridContainer columns={columns} rows={rows}>
                {childrenArray}
            </GridContainer>
        </div>
    );
}

export default Editorpage;