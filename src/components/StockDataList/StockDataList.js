import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { isInt, isValidStockDay, isIntgtZero, mapper, invertedMapper } from "../../utils/utils";

import "./StockDataList.scss"

const StockDataList = () => {

    const Stocks = [
            'aapl', 'amzn', 'bp', 'googl', 'mdb', 'msft', 'nflx', 'shop',
                'su', 'team', 'tsla'

                ];
    const [chosenStock, setchosenStock] = useState('');

    const handleStock =(e)=>{
        e.preventDefault();
        console.log(`Stock selected : ${e.target.value}`); 
        const newChosenStock = invertedMapper[e.target.value];
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
                                return <option className='stockDataListMainContainer__opt' value={mapper[elem]} key={elem} ></option>
                            }
                        )
                    }
                </datalist>
            </div>
            <div className='stockDataListMainContainer__btnContainer'>
                <button className='stockDataListMainContainer__btn'>
                    <Link to={`/charts/${chosenStock}`} >
                        <span className='link'>Display</span>
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