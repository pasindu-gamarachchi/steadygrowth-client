import React from 'react';
import './ChartsTab.scss';
import { useState } from 'react';
import StockChart from '../StockChart/StockChart';

const ChartsTab = () => {

    const [toggleState, setToggleState] = useState('3mo');

    const toggleTab = (per)=>{
        console.log(`Hello ---> ${per}`);
        setToggleState(per);
    }

    return (
        <div>
            <div className='tabsContainer'>
                <div onClick={() =>toggleTab("3mo")} className={toggleState==='3mo' ? "tabsContainer__tab tabsContainer__tab--active": "tabsContainer__tab"}>3 mo</div>
                <div onClick={() =>toggleTab("1y")} className={toggleState==='1y' ? "tabsContainer__tab tabsContainer__tab--active": "tabsContainer__tab"}>1 Year</div>
                <div onClick={() =>toggleTab("3y")} className={toggleState==='3y' ? "tabsContainer__tab tabsContainer__tab--active": "tabsContainer__tab"}>3 Year</div>
            </div>
            <div>
                {toggleState==='3mo' && <StockChart label={"3mo"}/>}
                {toggleState==='1y' && <StockChart label={"1y"}/>}
                {toggleState==='3y' && <StockChart label={"3y"}/>}
            </div>
        </div>
    );
};

export default ChartsTab;