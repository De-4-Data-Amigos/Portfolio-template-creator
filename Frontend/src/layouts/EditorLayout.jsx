import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

function EditorLayout({ loggedIn, logout }) {
  return (
    <>
      <Header loggedIn={loggedIn} logout={logout} />
      <div>{/* SPACER */}</div>
      <Outlet />
    </>
  );
}

export default EditorLayout;
