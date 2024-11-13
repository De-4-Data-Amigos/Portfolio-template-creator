import {Outlet} from 'react-router-dom'
import Header from '../components/Header'

function MainLayout() {
    return(
        <>
            <div>
                {/* HEADER */}
                <Header/>
                <Outlet/>
                {/* FOOTER */}
            </div>
        </>
    );    
}

export default MainLayout;
