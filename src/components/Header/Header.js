import { Link } from 'react-router-dom';
import "./Header.scss"
import sglogo from "../../assets/logos/steadygrowth-logo.png"



const Header = () => {

    const handleLogout = ()=>{
        console.log('Logged out')
        sessionStorage.removeItem("token");

    }
    return (
        <div className='header'>
            <div className='logo-container'>
                <Link to="/">
                    <img className='logo-container__img' src={sglogo}></img>
                </Link>
            </div>
            <nav className='header__nav'>
                <Link to="/charts">
                    <h2 className='header__nav-text'>Charts</h2>
                </Link>
                <Link to="/portfolio">
                    <h2 className='header__nav-text'>Portfolio</h2>
                </Link>
                <div onClick={handleLogout}>
                    <Link to="/">
                        <h2 className='header__nav-text'>Log out</h2>
                    </Link>
                </div>
            </nav>
        </div>
    );
};

export default Header;