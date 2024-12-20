function RestoreState({restoreStateFn}) {
    // get input 
    let state = '[{"componentName":"EditableTextInputField","data":{"pos":"0,0","gridName":"body","componentData":{"datapos":"0,0","children":"Test input if save12312"}}},{"componentName":"EditableTextInputField","data":{"pos":"1,0","gridName":"body","componentData":{"datapos":"1,0","children":"Test input if save112"}}},{"componentName":"EditorLink","data":{"pos":"0,1","gridName":"body","componentData":{"text":"sdf","href":"qwe","datapos":"0,1"}}}]';
    /*
    */

    const fn = () => {
        return prompt("paste the json of the state", "[]");
    };
    return(
        <div className="toolbar-item" onClick={() => restoreStateFn(fn())}>
            <div className="toolbar-label">Restore state</div>           
        </div>
    );
}

export default RestoreState;