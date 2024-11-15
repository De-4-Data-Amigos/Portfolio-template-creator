import {Outlet} from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

function MainLayout() {
    return(
        <>
            <div className='MainLayout'>
                {/* HEADER */}
                <Header/>
                <div>{/* SPACER */}</div>
                <Outlet/>                
                {/* FOOTER */}
                <Footer/>
            </div>
        </>
    );    
}

export default MainLayout;
