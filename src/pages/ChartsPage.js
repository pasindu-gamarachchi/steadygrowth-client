import ChartsTab from "../components/ChartsTab/ChartsTab";
import SummaryTable from "../components/SummaryTable/SummaryTable";
import { useParams } from "react-router-dom";

import "./ChartsPage.scss";
import StockDataList from "../components/StockDataList/StockDataList";
import { useState } from "react";

const ChartsPage = () => {
    /*
    let { symb } = useParams() || 'aapl';
    console.log(`Symbol : ${symb}`);
    if (!symb){
        symb = 'aapl';
    }
    console.log(`Symbol : ${symb}`);
    */
    //const [symb, setsymb] = useState(useParams() || 'aapl');
    let { symb } = useParams() || 'aapl';
    if (!symb){
        symb = 'aapl';
    }
    console.log(`Charts Page loaded for ${symb}`)



    return (    
        <div className="mainContainer">
            <ChartsTab symb={symb}/>
            <div>
                <StockDataList/>
                <SummaryTable symb={symb}/>
            </div>
        </div>
    );
};

export default ChartsPage;