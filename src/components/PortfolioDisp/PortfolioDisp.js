import React, { useEffect, useState } from 'react';
import StockChart from '../StockChart/StockChart';
import PortfolioTable from "../PortfolioTable/PortfolioTable";
import axios from 'axios';
import "./PortfolioDisp.scss"


const BASEURL = process.env.REACT_APP_SERVER_URL; 


const PortfolioDisp = ({isDataLoadNeeded, fetchData, user_id}) => {


    const [portData, setPortData] = useState([]);
    const [spendData, setspendData] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [allPortData, setallPortData] = useState([]);
    //const []
    useEffect(() => {
        axios
          .get(`${BASEURL}/api/portfolioCalcs?user_id=${user_id}`)
          .then((response) => {
            //console.log(response.data[2].vals);
            console.log(response.data);

            setPortData(response.data[response.data.length-1].vals);
            setallPortData(response.data);
            // setisLoading(false);
            //console.log(portData);

          })
          .then((resp)=>{
            axios.get(`${BASEURL}/api/portfolioCalcs/spend?user_id=${user_id}`)
                .then((response)=>{
                  setspendData(response.data);
                  console.log(response.data);
                  setisLoading(false);

                })
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
            <StockChart StockChart label={"3mo"} chartData={portData} symb={"Portfolio"} spendData={spendData}/>
            <div>
               <PortfolioTable portfolioData={allPortData}/>
            </div>
        </div>
    );
};

export default PortfolioDisp;