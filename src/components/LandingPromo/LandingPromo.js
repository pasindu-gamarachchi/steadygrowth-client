import chartBanner from "../../assets/images/demo_chart.png";
import statsBanner from "../../assets/images/demo_summary.png";
import portfolioChartBanner from "../../assets/images/demo_portfolio_chart.png";
import portfolioStatsBanner from "../../assets/images/demo_portfolio_summary.png";

import "./LandingPromo.scss";

const LandingPromo = () => {
	return (
		<div className="promoContainer">
			<div>
				<h1 className="promoHeader">Visualize Historical Data</h1>
				<img className="promoContainer__img" src={chartBanner} />
			</div>
			<div>
				<h1 className="promoHeader">Get Summary Statistics</h1>
				<img className="promoContainer__img" src={statsBanner} />
			</div>
			<div>
				<h1 className="promoHeader">Track Your Portfolio</h1>
				<img
					className="promoContainer__img"
					src={portfolioChartBanner}
				/>
			</div>
			<div>
				<h1 className="promoHeader">Evaluate Your Portfolio</h1>
				<img
					className="promoContainer__img"
					src={portfolioStatsBanner}
				/>
			</div>
		</div>
	);
};

export default LandingPromo;
