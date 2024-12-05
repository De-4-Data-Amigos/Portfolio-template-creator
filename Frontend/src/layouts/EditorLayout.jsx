import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import ChooseBackground from '../components/ChooseBackground'; 
import Toolbar from '../components/Toolbar';

function EditorLayout({ loggedIn, logout }) {
  return (
    <>
      <Header loggedIn={loggedIn} logout={logout} />
      <div>{/* SPACER */}</div>
      <ChooseBackground /> {/* background chooser*/}
      <Toolbar/> {/* toolbar */}
      <Outlet />
    </>
  );
}

export default EditorLayout;
