import React from 'react';
import "./SummaryCard.scss"

const SummaryCard = ({statsObj}) => {
    const cleanNames = {
        min: "min", max: "max", avg: "avg", median: "median", _25perc: "25%", _75perc: "75%"
    }
    return (
        <div className='summaryCard'>
            <div>
                {cleanNames[statsObj.name]}
            </div>
            <div>
                {statsObj['3mo']}
            </div>
            <div>
                {statsObj['1y']}
            </div>
            <div>
                {statsObj['3y']}
            </div>
        </div>
    );
};

export default SummaryCard;