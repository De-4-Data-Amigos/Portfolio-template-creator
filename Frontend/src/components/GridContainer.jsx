import '../assets/GridContainer.css'

function GridContainer({children}) {
    return(
        <div className="GridContainer">
            {children}
        </div>
    );
}

export default GridContainer;