import "./GetStarted.scss";
import { Link } from 'react-router-dom';


const GetStarted = () => {
    return (
        <div className="mainContainer">
            <h2 className="mainContainer__heading">Let's Get You Started!</h2>
            <div className="buttonContainer">
                <Link to="/login">
                    <span className="buttonContainer__text">
                        Login
                    </span>
                </Link>
            </div>
            <div className="buttonContainer">
                <Link to="/signup">
                    <span className="buttonContainer__text">
                        Sign-Up
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default GetStarted;