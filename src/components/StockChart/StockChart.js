import React, { useState } from 'react';
import {Line} from 'react-chartjs-2' 
import Chart, { scales } from 'chart.js/auto';
import './StockChart.scss'

const StockChart = ({label, chartData, symb}) => {


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
    // console.log(`Symb : ${symb}`);
    let userData = {};
    let opts = {};

    if (symb==="Portfolio"){
        userData = {
            labels: chartData.map((elem)=>{
                return elem.date
            },
    
            
            ),
            datasets: [{
                
                // borderColor: 'rgb(75, 192, 192)',
    
                data: chartData.map((elem)=>{
                   return elem.portSum
                })
            }]};
        
        opts = {
            plugins: {
                legend: false, // Hide legend
                title: {
                    display:true,
                    text: 'Portfolio USD $'
                }
            },
            responsive: true,
            maintainAspectRatio: false 
    
        }

    }
    else{
        userData = {
            labels: chartData.map((elem)=>{
                return elem.Date
            },

            
            ),
            datasets: [{
                
                // borderColor: 'rgb(75, 192, 192)',

                data: chartData.map((elem)=>{
                return elem.Close
                })
            }]};
        
        opts = {
            plugins: {
                legend: false, // Hide legend
                title: {
                    display:true,
                    text: 'USD $'
                }
            },
            responsive: true,
            maintainAspectRatio: false 

        }
    }
    return (
        <div>
            <div className='chartContainer'>
                <Line redraw={true} data={userData} options={opts}/>
            </div>
        </div>
    );
};

export default StockChart;