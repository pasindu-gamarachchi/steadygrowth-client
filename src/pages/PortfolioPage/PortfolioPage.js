import React from 'react';
import StockChart from '../../components/StockChart/StockChart';
import PortfolioTabs from '../../components/PorfolioTabs/PortfolioTabs';
import PortfolioDisp from '../../components/PortfolioDisp/PortfolioDisp';
import { useState } from 'react';
import "./PortfolioPage.scss"

const PortfolioPage = () => {
    
    const [isDataLoadNeeded, setisDataLoadNeeded] = useState(false);
    //const 

    const fetchData = (val)=>{
      setisDataLoadNeeded(val);
      console.log(isDataLoadNeeded);

    }
    console.log(`Portfolio Page loaded.`)
    return (
        <main className='mainContainer'>
            <PortfolioDisp isDataLoadNeeded={isDataLoadNeeded} fetchData={fetchData}/>
            <PortfolioTabs fetchData={fetchData}/>
        </main>
    );
};

export default PortfolioPage;