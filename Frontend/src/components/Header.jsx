import '../assets/Header.css';
import { useNavigate } from "react-router-dom";

function Header({ loggedIn, logout }) {
  const navigate = useNavigate();
  
  const clickHandler = (href) => {
    navigate(href);  // Navigerer til den ønskede rute
  }

  return (
    <>
      <div className="Header">
        <nav className="NavBar">
          {/* Navigation links */}
          <a onClick={() => clickHandler("/")}>Home</a>
          <a onClick={() => clickHandler("/editor")}>Editor</a>
          {loggedIn ? (
            <a onClick={logout}>Logout</a>
          ) : (
            <a onClick={() => clickHandler("/login")}>Login</a>
          )}
        </nav>
        <i className="NavIndicator"></i>
      </div>
      <div className='NavBarDivider'></div>
    </>
  );
}

export default Header;
