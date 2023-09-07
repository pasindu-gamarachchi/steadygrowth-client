import React, { useEffect, useState } from 'react';
import StockChart from '../StockChart/StockChart';
import PortfolioTable from "../PortfolioTable/PortfolioTable";
import EmptyPorfolio from '../EmptyPortfolio/EmptyPortfolio';
import axios from 'axios';
import "./PortfolioDisp.scss"


const BASEURL = process.env.REACT_APP_SERVER_URL; 


const PortfolioDisp = ({isDataLoadNeeded, fetchData, user_id}) => {


    const [portData, setPortData] = useState([]);
    const [spendData, setspendData] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [allPortData, setallPortData] = useState([]);
    const [isEmptyPorf, setisEmptyPortf] = useState(true);
    //const []
    //console.log(`Porfolio Disp loaded`)
    useEffect(() => {
        axios
          .get(`${BASEURL}/api/portfolioCalcs?user_id=${user_id}`)
          .then((response) => {
            //console.log(response.data[2].vals);
            //console.log('made call for port data')
            //console.log(response.data);
            if (response.data.length >0){
              setPortData(response.data[response.data.length-1].vals);
              setallPortData(response.data);

            }
            else{
              setisEmptyPortf(true);
            }
            setisLoading(false);

            // setisLoading(false);
            //console.log(portData);

          })
          .then((resp)=>{
            axios.get(`${BASEURL}/api/portfolioCalcs/spend?user_id=${user_id}`)
                .then((response)=>{
                  setspendData(response.data);
                  // console.log(response.data);
                  setisLoading(false);
                  if (response.data.length >1){
                    setisEmptyPortf(false);

                  }
                  else{
                    setisEmptyPortf(true);

                  }

                })
          })
          .catch((error) => {
            console.log(error);
          });
        //console.log("Portfolio Data loaded.");
        fetchData(false);

    }, [isDataLoadNeeded])


    if (isLoading){
      return <p>Loading...</p>
    }
    
    if (isEmptyPorf){
      return <EmptyPorfolio/>
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