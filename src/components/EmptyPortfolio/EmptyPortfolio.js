import React from 'react';
import "./EmptyPortfolio.scss";
import piggybank from "../../assets/images/piggy_bank.png";

const EmptyPortfolio = () => {
    return (
        <div className='emptyPortfCont'>
            <h2 className='emptyPortfCont__header'>Your porfolio is empty, Let's Get Investing!</h2>
            <img className="emptyPortfCont__img"  src={piggybank}/>
        </div>
    );
};

export default EmptyPortfolio;