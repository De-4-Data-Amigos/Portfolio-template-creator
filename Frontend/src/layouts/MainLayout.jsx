import {Outlet} from 'react-router-dom'

function MainLayout() {
    return(
        <div>
            {/* HEADER */}
            <Outlet/>
            {/* FOOTER */}
        </div>
    );    
}

export default MainLayout;
