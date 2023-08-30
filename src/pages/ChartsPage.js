import ChartsTab from "../components/ChartsTab/ChartsTab";
import SummaryTable from "../components/SummaryTable/SummaryTable";
import { useParams } from "react-router-dom";

import "./ChartsPage.scss";

const ChartsPage = () => {

    const { symb } = useParams() || 'nflx';

    return (    
        <div className="mainContainer">
            <ChartsTab symb={symb}/>
            <SummaryTable symb={symb}/>
        </div>
    );
};

export default ChartsPage;