import React, { useState } from 'react';
import {Line} from 'react-chartjs-2' 
import Chart from 'chart.js/auto';
import './StockChart.scss'

const StockChart = ({label, chartData}) => {


    console.log(label);
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
    })
    return (
        <div>
            <div className='chartContainer'>
                <Line data={userData} />
            </div>
        </div>
    );
};

export default StockChart;