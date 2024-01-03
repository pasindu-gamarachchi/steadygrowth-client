import Welcome from "../../components/Welcome/Welcome";
import GetStarted from "../../components/GetStarted/GetStarted";
import "./HomePage.scss";
import LandingPromo from "../../components/LandingPromo/LandingPromo";

const HomePage = () => {
	return (
		<div className="MainContent">
			<article className="MainContainer">
				<Welcome />
				<GetStarted />
			</article>
			<div className="PromoContainer">
				<LandingPromo />
			</div>
		</div>
	);
};

export default HomePage;
