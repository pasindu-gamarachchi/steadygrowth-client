import React from 'react';
import StockChart from '../../components/StockChart/StockChart';
import PortfolioTabs from '../../components/PorfolioTabs/PortfolioTabs';
import "./PortfolioPage.scss"


const PortfolioPage = () => {
    const data = [{
        "Date": "2019-01-02",
        "Open": 154.89,
        "High": 158.85,
        "Low": 154.23,
        "Close": 157.92
      },
      {
        "Date": "2019-01-03",
        "Open": 143.98,
        "High": 145.72,
        "Low": 142,
        "Close": 142.19
      },
      {
        "Date": "2019-01-04",
        "Open": 144.53,
        "High": 148.55,
        "Low": 143.8,
        "Close": 148.26
      }]
    return (
        <main className='mainContainer'>
            <StockChart StockChart label={"3mo"} chartData={data} symb={"Portfolio"}/>
            <PortfolioTabs/>
        </main>
    );
};

export default PortfolioPage;