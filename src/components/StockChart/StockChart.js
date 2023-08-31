import React, { useState } from 'react';
import {Line} from 'react-chartjs-2' 
import Chart from 'chart.js/auto';
import './StockChart.scss'

const StockChart = ({label, chartData, symb}) => {


    console.log(`Stock chart with : ${label} `);
    //console.log(chartData); 
    /*
    const [userData, setUserData] = useState({
        labels: chartData.map((elem)=>{
            return elem.Date
        }

        ),
        datasets: [{
            label: label,
            data: chartData.map((elem)=>{
               return elem.Close
            })
        }]
    })*/

    const userData = {
        labels: chartData.map((elem)=>{
            return elem.Date
        }

        ),
        datasets: [{
            label: label,
            data: chartData.map((elem)=>{
               return elem.Close
            })
        }]};

    return (
        <div>
            <div className='chartContainer'>
                <h3>{symb}</h3>
                <Line redraw={true} data={userData}/>
            </div>
        </div>
    );
};

export default StockChart;