import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import ChooseBackground from '../components/ChooseBackground'; 

function EditorLayout({ loggedIn, logout }) {
  return (
    <>
      <Header loggedIn={loggedIn} logout={logout} />
      <div>{/* SPACER */}</div>
      <ChooseBackground /> {/* background chooser*/}
      <Outlet />
    </>
  );
}

export default EditorLayout;
