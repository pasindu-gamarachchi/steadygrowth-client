import React, { useEffect, useState } from 'react';
import StockChart from '../StockChart/StockChart';

const PortfolioDisp = ({isDataLoadNeeded, fetchData}) => {


    const [portData, setPortData] = useState([])

    useEffect(() => {
        const data = [{
            "Date": "2019-01-02",
            "Open": 154.89,
            "High": 158.85,
            "Low": 154.23,
            "Close": Math.floor(Math.random() * 100)
    
          },
          {
            "Date": "2019-01-03",
            "Open": 143.98,
            "High": 145.72,
            "Low": 142,
            "Close": Math.floor(Math.random() * 100)
          },
          {
            "Date": "2019-01-04",
            "Open": 144.53,
            "High": 148.55,
            "Low": 143.8,
            "Close": Math.floor(Math.random() * 100)
          }];
        setPortData(data);
        console.log("Portfolio Data loaded.");
        fetchData(false);

    }, [isDataLoadNeeded])

    

    return (
        <div>
            <StockChart StockChart label={"3mo"} chartData={portData} symb={"Portfolio"}/>

        </div>
    );
};

export default PortfolioDisp;