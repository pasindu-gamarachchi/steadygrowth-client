import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./StockDataList.scss"

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
        <div className='stockDataListMainContainer'>
            <div className='stockDataListMainContainer__dataListContainer'>
                <label for="ice-cream-choice">Choose a Stock:</label>
                <input className='stockDataListMainContainer__inp' list="stocks" id="ice-cream-choice" onSelect={handleStock} name="ice-cream-choice" />
                <datalist id="stocks" className='stockDataListMainContainer__datalist'>
                    {
                        Stocks.map(
                            (elem) =>{
                                return <option className='stockDataListMainContainer__opt' value={elem} ></option>
                            }
                        )
                    }
                </datalist>
            </div>
            <div className='stockDataListMainContainer__btnContainer'>
                <button className='stockDataListMainContainer__btn'>
                    <Link to={`/charts/${chosenStock}`} className='link'>
                        Display
                    </Link>
                </button>
                <button onClick={handleAddtoWatchlist} className='stockDataListMainContainer__btn'>
                        Add to Watchlist
                </button>
            </div>
            
        </div>
    );
};

export default StockDataList;