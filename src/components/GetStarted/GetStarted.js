import "./GetStarted.scss";
import { Link } from "react-router-dom";

const GetStarted = () => {
  return (
    <div className="mainContainer">
      <h2 className="mainContainer__heading">Let's Get You Started!</h2>
      <Link to="/login" className="link">
        <div className="buttonContainer">
          <span className="buttonContainer__text">Login</span>
        </div>
      </Link>
      <Link to="/signup" className="link">
        <div className="buttonContainer">
          <span className="buttonContainer__text">Sign-Up</span>
        </div>
      </Link>
    </div>
  );
};

export default GetStarted;
