import '../assets/Header.css'
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    const clickHandler = (href) => {
        navigate(href);
    }


    return(
        <div className="Header">
            <nav className="NavBar">
                {/* LINKS */}
                <a onClick={() => clickHandler("/")}>Home</a>
                <a onClick={() => clickHandler("/editor")}>Editor</a>
            </nav>
            <i className="NavIndicator"></i>            
        </div>
    );
}

export default Header;