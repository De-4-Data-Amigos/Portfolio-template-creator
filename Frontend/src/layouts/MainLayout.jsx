import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';


function MainLayout({ loggedIn, logout }) {
  return (
    <>
      <Header loggedIn={loggedIn} logout={logout} />
      <div>{/* SPACER */}</div>
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayout;
