import React from 'react';
import StockChart from '../../components/StockChart/StockChart';
import PortfolioTabs from '../../components/PorfolioTabs/PortfolioTabs';
import PortfolioDisp from '../../components/PortfolioDisp/PortfolioDisp';
import { useState, useEffect } from 'react';
import "./PortfolioPage.scss";
import axios from 'axios';
import { Link } from 'react-router-dom';

const BASEURL = process.env.REACT_APP_SERVER_URL; 

const PortfolioPage = () => {
    
    const [isDataLoadNeeded, setisDataLoadNeeded] = useState(false);
    //const 
    const [user, setUser] = useState(null);
    const [failedAuth, setFailedAuth] = useState(true);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        //console.log(`Running useffect`);
    
        if (!token) {
          return setFailedAuth(true);
        }
    
        // Get the data from the API
        axios
          .get(`${BASEURL}/api/users/current`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setUser(response.data);
            setFailedAuth(false)
          })
          .catch((error) => {
            console.log(error);
            setFailedAuth(true);
          });
      }, [isDataLoadNeeded]);

      if (failedAuth) {
        return (
          <main className="dashboard">
            <p>You must be logged in to see this page.</p>
            <p>
              <Link to="/login">Log in</Link>
            </p>
          </main>
        );
      }

    // console.log(user);
    const fetchData = (val)=>{
      setisDataLoadNeeded(val);
      console.log(isDataLoadNeeded);

    }
    // console.log(`Portfolio Page loaded.`)
    return (
        <main className='portfolioMainContent'>
          <div className='portfolioMainContainer'>
              <PortfolioDisp isDataLoadNeeded={isDataLoadNeeded} fetchData={fetchData} user_id={user.id}/>
              <PortfolioTabs fetchData={fetchData} user_id={user.id}/>
          </div>
        </main>
    );
};

export default PortfolioPage;