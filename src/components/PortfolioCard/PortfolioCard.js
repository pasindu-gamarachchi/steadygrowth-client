import React from 'react';
import "./PortfolioCard.scss";

const PortfolioCard = ({purchDate, symb, purchVal, currVal, profitVal, isprof, isColName}) => {

    if (isColName){
        return (
            <div className='portSummaryCard'>
                <div className='portSummaryCard__stat--info'>
                    {purchDate}
                </div>
                <div className='portSummaryCard__stat--info'>
                    {symb}
                </div>
                <div className='portSummaryCard__stat--info'>
                    {purchVal}
                </div>
                <div className='portSummaryCard__stat--info'>
                    {currVal}
                </div>
                <div className='portSummaryCard__stat--info'>
                    {profitVal}
                </div>
        </div>
        )
    }
    return (
        <div className='portSummaryCard'>
                <div className={isprof?'portSummaryCard__numb':`portSummaryCard__numb--loss`}>
                    {purchDate}
                </div>
                <div className={isprof?'portSummaryCard__numb':`portSummaryCard__numb--loss`}>
                    {symb}
                </div>
                <div className={isprof?'portSummaryCard__numb':`portSummaryCard__numb--loss`}>
                    {purchVal}
                </div>
                <div className={isprof?'portSummaryCard__numb':`portSummaryCard__numb--loss`}>
                    {currVal}
                </div>
                
                <div className={isprof?'portSummaryCard__numb':`portSummaryCard__numb--loss`}>
                    {profitVal}
                </div>
                
        </div>
    );
};

export default PortfolioCard;