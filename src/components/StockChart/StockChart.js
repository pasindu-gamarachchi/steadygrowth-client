import React, { useState } from 'react';
import {Line} from 'react-chartjs-2' 
import Chart, { scales } from 'chart.js/auto';
import './StockChart.scss'

const StockChart = ({label, chartData, symb, spendData}) => {

    const charcolred= "rgba(229,86,47, 0.5)";
    const chartcolblue = "rgba(47,125,238,0.5 )"
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
            datasets: [
                {
                
                    // borderColor: 'rgb(75, 192, 192)',
                    label: 'Portfolio Value', 
                    data: chartData.map((elem)=>{
                    return elem.portSum
                    }),
                    borderColor:   chartcolblue, // "rgba(47,125,238,0.5 )", //"#157edd", "#2F7DEE" 
                // borderDash: [5, 5],
                backgroundColor:  chartcolblue, // "#2F7DEE", //"#52b2bc",
                // pointBackgroundColor:   "#52b2bc",  // "#55bae7",
                // pointBorderColor: "#52b2bc",
                pointHoverBackgroundColor:  "#dd151a",  // "#52b2bc",
                pointHoverBorderColor: "#dd151a" //  "#52b2bc"//"#55bae7",
                    
                },
                {
                    label: 'Total Spend',
                    data: spendData.map((elem)=>{
                        return elem.spend
                        }),
                        borderColor:  charcolred, // "#E5562F",  // "rgba(47,125,238,1 )", //"#157edd", "#2F7DEE" 
                        // borderDash: [5, 5],
                        backgroundColor:  charcolred, // "#E5562F", // "#2F7DEE", //"#52b2bc",
                        // pointBackgroundColor:   "#52b2bc",  // "#55bae7",
                        // pointBorderColor: "#52b2bc",
                        pointHoverBackgroundColor:  "#dd151a",  // "#52b2bc",
                        pointHoverBorderColor: "#dd151a" //  "#52b2bc"//"#55bae7",
                }
        
            ]
        
        };
        
        opts = {
            plugins: {
                legend: true, // Hide legend
                title: {
                    display:false,
                    text: 'Portfolio USD $'
                }
            },
            elements: {
                point:{
                    radius: 0
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

                }),
                fill: false,
                borderColor:     chartcolblue,  //"rgba(47,125,238,1 )", //"#157edd", "#2F7DEE" 
                // borderDash: [5, 5],
                backgroundColor:  chartcolblue, //  "#2F7DEE", //"#52b2bc",
                // pointBackgroundColor:   "#52b2bc",  // "#55bae7",
                // pointBorderColor: "#52b2bc",
                pointHoverBackgroundColor:  "#dd151a",  // "#52b2bc",
                pointHoverBorderColor: "#dd151a" //  "#52b2bc"//"#55bae7",

            }]};
        
        opts = {
            plugins: {
                legend: false, // Hide legend
                title: {
                    display:true,
                    text: 'USD $'
                }
            },
            elements: {
                point:{
                    radius: 0
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