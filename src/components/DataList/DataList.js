import React from 'react';

const DataList = ({handleStock}) => {

    const Stocks = ['aapl', 'amzn', 'nflx', 'bp', 'su', 'shop', 'tsla', 'msft'];

    

    return (
        <div>
            <label for="stock-choice">Choose a Stock:</label>
            <input list="stocks" id="stock-choice" onSelect={handleStock} name="symb" />
            <datalist id="stocks">
                {
                    Stocks.map(
                        (elem) =>{
                            return <option value={elem} ></option>
                        }
                    )
                }
            </datalist>
        </div>
    );
};

export default DataList;