import '../assets/Header.css'

function Header() {
    return(
        <div className="Header">
            <nav className="NavBar">
                {/* LINKS */}
                <a href='/'>Home</a>
                <a href='/editor'>Editor</a>
            </nav>
            <i className="NavIndicator"></i>            
        </div>
    );
}

export default Header;