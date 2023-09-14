import React from 'react';
import "./SummaryCard.scss"

const SummaryCard = ({statsObj, isColName}) => {
    const cleanNames = {
        min: "min", max: "max", avg: "avg", median: "median", _25perc: "25%", _75perc: "75%"
    }

    if (!isColName){
        return (
            <div className='summaryCard'>
                <div className='summaryCard__stat'>
                    {cleanNames[statsObj.name]}
                </div>
                <div className='summaryCard__numb'>
                    {statsObj['3mo']}
                </div>
                <div className='summaryCard__numb'>
                    {statsObj['1y']}
                </div>
                <div className='summaryCard__numb'>
                    {statsObj['3y']}
                </div>
            </div>
        );
    }
    else{
        return (
            <div className='summaryCard--col'>
                <div className='summaryCard__stat--info'>
                    Stat
                </div>
                <div className='summaryCard__numb--info'>
                    3mo
                </div>
                <div className='summaryCard__numb--info'>
                   1y
                </div>
                <div className='summaryCard__numb--info'>
                    3y
                </div>
            </div>
        );
    }
};

export default SummaryCard;