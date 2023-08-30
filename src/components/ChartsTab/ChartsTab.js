import React, { useEffect } from 'react';
import './ChartsTab.scss';
import { useState } from 'react';
import StockChart from '../StockChart/StockChart';
import axios from 'axios';

const ChartsTab = ({symb}) => {

    const [toggleState, setToggleState] = useState('3mo');
    const [threeMonthData, setthreeMonthData] = useState({});
    const [oneYearData, setoneYearData] = useState({});
    const [threeYearData, setthreeYearData] = useState({});

    const [isLoading, setisLoading] = useState(true);

    const toggleTab = (per)=>{
        setToggleState(per);
    }

    useEffect(() => {
        axios
            .get(`http://localhost:5050/api/chartdata/${symb}?from=2019-01-01&to=2019-12-31`)
            .then((resp) =>{
                const newChartData = resp.data;
                setoneYearData(newChartData);
                return axios
                    .get(`http://localhost:5050/api/chartdata/${symb}?from=2019-10-01&to=2019-12-31`);
            })
            .then((resp)=>{
                console.log(resp.data);
                const newChartData2 = resp.data;
                setthreeMonthData(newChartData2);
                return axios
                    .get(`http://localhost:5050/api/chartdata/${symb}?from=2017-01-01&to=2019-12-31`);
            }).then((resp)=>{
                console.log(resp.data);
                setthreeYearData(resp.data);
                setisLoading(false);
            })
            .catch((err)=>{
                console.error(err);
            }
            )
    }, []
    )

    if (isLoading){
        return <p>Loading...</p>
    }




    return (
        <div>
            <div className='tabsContainer'>
                <div onClick={() =>toggleTab("3mo")} className={toggleState==='3mo' ? "tabsContainer__tab tabsContainer__tab--active": "tabsContainer__tab"}>3 mo</div>
                <div onClick={() =>toggleTab("1y")} className={toggleState==='1y' ? "tabsContainer__tab tabsContainer__tab--active": "tabsContainer__tab"}>1 Year</div>
                <div onClick={() =>toggleTab("3y")} className={toggleState==='3y' ? "tabsContainer__tab tabsContainer__tab--active": "tabsContainer__tab"}>3 Year</div>
            </div>
            <div>
                {toggleState==='3mo' && <StockChart label={"3mo"} chartData={threeMonthData}/>}
                {toggleState==='1y' && <StockChart label={"1y"} chartData={oneYearData}/>}
                {toggleState==='3y' && <StockChart label={"3y"} chartData={threeYearData}/>}
            </div>
        </div>
    );
};

export default ChartsTab;