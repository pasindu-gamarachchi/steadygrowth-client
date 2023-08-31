import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const StockDataList = () => {

    const Stocks = ['aapl', 'amzn', 'nflx', 'bp', 'su', 'shop', 'tsla', 'msft'];
    const [chosenStock, setchosenStock] = useState('');

    const handleStock =(e)=>{
        e.preventDefault();
        console.log(`Stock selected : ${e.target.value}`); 
        const newChosenStock = e.target.value;
        setchosenStock(newChosenStock);
        
        //for (const [key, value] of Object.entries(e.target)) {
        //    console.log(`${key}: ${value}`);
        //  }
    }

    const handleAddtoWatchlist = (e) =>{
        console.log(`Event --> ${e}`);
        // Post to user_prefs
    }

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
            <button>
                <Link to={`/${chosenStock}`}>
                    Display
                </Link>
            </button>
            <button onClick={handleAddtoWatchlist}>
                    Add to Watchlist
            </button>
        </div>
    );
};

export default StockDataList;