import { Link } from "react-router-dom";
import "./Header.scss";
import sglogo from "../../assets/logos/steadygrowth-logo.png";

const Header = ({ isLoggedIn, setisLoggedIn }) => {
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setisLoggedIn(false);
  };
  return (
    <div className="header">
      <div className="logo-container">
        <Link to="/">
          <img className="logo-container__img" src={sglogo}></img>
        </Link>
      </div>
      <nav className="header__nav">
        <Link to="/charts">
          <h2 className="header__nav-text">Charts</h2>
        </Link>
        <Link to="/portfolio">
          <h2 className="header__nav-text">Portfolio</h2>
        </Link>
        {isLoggedIn ? (
          <Link to="/">
            <h2 className="header__nav-text" onClick={handleLogout}>
              Log Out
            </h2>
          </Link>
        ) : (
          <Link to="/login">
            <h2 className="header__nav-text">Log In</h2>
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Header;
