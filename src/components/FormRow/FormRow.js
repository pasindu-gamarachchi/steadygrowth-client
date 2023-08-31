import React from 'react';
import "./FormRow.scss";


const FormRow = ({stock_symb, purchase_date, purchase_price, purchase_shares}) => {
    return (
        <div className='RowContainer'>
            <div>{stock_symb}</div>
            <div>{purchase_date}</div>
            <div>{purchase_price}</div>
            <div>{purchase_shares}</div>
        </div>
    );
};

export default FormRow;