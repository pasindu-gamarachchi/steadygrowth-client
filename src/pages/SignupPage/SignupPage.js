import axios from "axios";
import SignUpInput from "../../components/SignUpInput/SignUpInput";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./SignupPage.scss"

const BASEURL = process.env.REACT_APP_SERVER_URL; // || "http://localhost:5050"; ///TODO : FIX THIS

const SignupPage = () => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const validateInput = ()=>{
        //Validate Form input
        // Value existence, unique email ?? 
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .post(`${BASEURL}/api/users/register`, {
                email: event.target.email.value,
                password: event.target.password.value,
                first_name: event.target.first_name.value,
                last_name: event.target.last_name.value
            })
            .then(() => {
                setSuccess(true);
                setError("");
                event.target.reset();
            })
            .catch((error) => {
                setSuccess(false);
                setError("Error signing up.");
            });
    };

    return (
        <main className="signUpMainContent">
            <form className="signup" onSubmit={handleSubmit}>
                <h1 className="signup__title">Sign up</h1>

                <SignUpInput type="text" name="first_name" label="First name" />
                <SignUpInput type="text" name="last_name" label="Last name" />
                <SignUpInput type="text" name="email" label="Email" />
                <SignUpInput type="password" name="password" label="Password" />

                <button className="signup__button">Sign up</button>

                {success && <div className="signup__message">Signed up! Use the login page to enter.</div>}
                {error && <div className="signup__message">{error}</div>}
            </form>
            <p>
                Have an account? <Link to="/login">Log in</Link>
            </p>
        </main>
    )
};

export default SignupPage;