import "./LoginPage.scss";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignUpInput from "../../components/SignUpInput/SignUpInput";

const BASEURL = process.env.REACT_APP_SERVER_URL; // || "http://localhost:5050"; ///TODO : FIX THIS


const LoginPage = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post(`${BASEURL}/api/users/login`, {
            email: event.target.email.value,
            password: event.target.password.value
        })
            .then((response) => {
                sessionStorage.setItem("token", response.data.token);
                navigate('/');
            })
            .catch((error) => {
                setError(error.response.data);
            });
    };

    return (
        <main className="loginInMainContent">
            <form className="login" onSubmit={handleSubmit}>
                <h1 className="login__title">Log in</h1>

                <SignUpInput type="text" name="email" label="Email" />
                <SignUpInput type="password" name="password" label="Password" />

                <button className="login__button">
                    Log in
                </button>

                {error && <div className="login__message">{error}</div>}
            </form>
            <p>
                Need an account? <Link to="/signup">Sign up</Link>
            </p>
        </main>
    );
}

export default LoginPage;