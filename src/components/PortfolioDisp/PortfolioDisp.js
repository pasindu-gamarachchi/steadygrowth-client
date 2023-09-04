import React, { useEffect, useState } from 'react';
import StockChart from '../StockChart/StockChart';
import axios from 'axios';


const BASEURL = process.env.REACT_APP_SERVER_URL; 


const PortfolioDisp = ({isDataLoadNeeded, fetchData, user_id}) => {


    const [portData, setPortData] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    //const []
    useEffect(() => {
        axios
          .get(`${BASEURL}/api/portfolioCalcs?user_id=${user_id}`)
          .then((response) => {
            //console.log(response.data[2].vals);
            setPortData(response.data[response.data.length-1].vals);
            setisLoading(false);
            //console.log(portData);

          })
          .catch((error) => {
            console.log(error);
          });
        console.log("Portfolio Data loaded.");
        fetchData(false);

    }, [isDataLoadNeeded])


    if (isLoading){
      return <p>Loading...</p>
    }
    

    return (
        <div>
            <StockChart StockChart label={"3mo"} chartData={portData} symb={"Portfolio"}/>

        </div>
    );
};

export default PortfolioDisp;