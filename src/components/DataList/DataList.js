import React from 'react';

const DataList = ({handleStock}) => {

    const Stocks = ['aapl', 'amzn', 'nflx', 'bp', 'su', 'shop', 'tsla', 'msft'];

    

    return (
        <div>
            <label for="ice-cream-choice">Choose a Stock:</label>
            <input list="stocks" id="ice-cream-choice" onSelect={handleStock} name="ice-cream-choice" />
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