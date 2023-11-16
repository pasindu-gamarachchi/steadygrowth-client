import chartBanner from "../../assets/images/demo_chart.png";
import statsBanner from "../../assets/images/demo_summary.png";
import portfolioChartBanner from "../../assets/images/demo_portfolio_chart.png";
import portfolioStatsBanner from "../../assets/images/demo_portfolio_summary.png";

import "./LandingPromo.scss";

const LandingPromo = () => {
	return (
		<div className="promoContainer">
			<div>
				<h1>Visualize histortical data</h1>
				<img className="promoContainer__img" src={chartBanner} />
			</div>
			<div>
				<h1>Get Summary Statistics</h1>
				<img className="promoContainer__img" src={statsBanner} />
			</div>
			<div>
				<h1>Track your portfolio</h1>
				<img
					className="promoContainer__img"
					src={portfolioChartBanner}
				/>
			</div>
			<div>
				<h1>Evaluate your portfolio</h1>
				<img
					className="promoContainer__img"
					src={portfolioStatsBanner}
				/>
			</div>
		</div>
	);
};

export default LandingPromo;
