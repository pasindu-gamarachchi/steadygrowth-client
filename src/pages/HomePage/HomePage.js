import Welcome from "../../components/Welcome/Welcome";
import GetStarted from "../../components/GetStarted/GetStarted";
import "./HomePage.scss"


const HomePage = () => {
    return (
        <div className="MainContent">
            <article className="MainContainer">
                <Welcome/>
                <GetStarted/>
            </article>
        </div>
    );
};

export default HomePage;