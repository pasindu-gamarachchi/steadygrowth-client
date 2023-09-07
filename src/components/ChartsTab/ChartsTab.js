import React, { useEffect } from 'react';
import './ChartsTab.scss';
import { useState } from 'react';
import StockChart from '../StockChart/StockChart';
import axios from 'axios';

const BASEURL = process.env.REACT_APP_SERVER_URL; 

const ChartsTab = ({symb}) => {

    const [toggleState, setToggleState] = useState('3mo');
    const [threeMonthData, setthreeMonthData] = useState({});
    const [oneYearData, setoneYearData] = useState({});
    const [threeYearData, setthreeYearData] = useState({});

    const [isLoading, setisLoading] = useState(true);

    const toggleTab = (per)=>{
        setToggleState(per);
    }

   
    const mapper = {
        'aapl': 'Apple Inc.',
        'amzn': 'Amazon.com, Inc.',
        'bp': 'BP p.l.c.',
        'googl': 'Alphabet Inc',
        'mdb': 'MongoDB, Inc.',
        'msft': 'Microsoft Corporation',
        'nflx': 'Netflix, Inc.',
        'shop': 'Shopify Inc.',
        'su': 'Suncor Energy  Inc.',
        'team': 'Atlassian Corp Plc',
        'tsla': 'Tesla, Inc.'

    }


    // console.log(`Symbol : ${symb}`); 

    useEffect(() => {
        axios
            .get(`${BASEURL}/api/chartdata/${symb}?from=2022-09-07&to=2023-09-07`)
            .then((resp) =>{
                const newChartData = resp.data;
                setoneYearData(newChartData);
                return axios
                    .get(`${BASEURL}/api/chartdata/${symb}?from=2023-06-07&to=2023-09-07`);
            })
            .then((resp)=>{
                const newChartData2 = resp.data;
                setthreeMonthData(newChartData2);
                return axios
                    .get(`${BASEURL}/api/chartdata/${symb}?from=2020-09-07&to=2023-09-07`);
            }).then((resp)=>{
                setthreeYearData(resp.data);
                setisLoading(false);
            })
            .catch((err)=>{
                console.error(err);
            }
            )
    }, [symb]
    )

    if (isLoading){
        return <p>Loading...</p>
    }




    return (
        <div>
            <div className='tabsTitleContainer'>
                <img className='tabsTitleContainer__img' src={`${BASEURL}/logos/${symb}/logo.svg`} alt='Company Logo'/>
                <h2 className='tabsTitleContainer__header'>{mapper[symb]} </h2>
            </div>
            <div className='tabsContainer'>
                <div onClick={() =>toggleTab("3mo")} className={toggleState==='3mo' ? "tabsContainer__tab tabsContainer__tab--active": "tabsContainer__tab"}>3 Month</div>
                <div onClick={() =>toggleTab("1y")} className={toggleState==='1y' ? "tabsContainer__tab tabsContainer__tab--active": "tabsContainer__tab"}>1 Year</div>
                <div onClick={() =>toggleTab("3y")} className={toggleState==='3y' ? "tabsContainer__tab tabsContainer__tab--active": "tabsContainer__tab"}>3 Year</div>
            </div>
            <div>
                {toggleState==='3mo' && <StockChart label={"3mo"} chartData={threeMonthData} symb={symb}/>}
                {toggleState==='1y' && <StockChart label={"1y"} chartData={oneYearData} symb={symb}/>}
                {toggleState==='3y' && <StockChart label={"3y"} chartData={threeYearData} symb={symb}/>}
            </div>
        </div>
    );
};

export default ChartsTab;