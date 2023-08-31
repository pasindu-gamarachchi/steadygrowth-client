import { useState } from 'react';
import AddPortfolio from '../AddPortfolio/AddPortfolio';


const PortfolioTabs = () => {

    const [portfolioAction, setportfolioAction] = useState('add');

    const toggleTab = (per)=>{
        setportfolioAction(per);
    }

    return (
        <div>
            <div className='tabsContainer'>
                <div onClick={() =>toggleTab("add")} className={portfolioAction==='3mo' ? "tabsContainer__tab tabsContainer__tab--active": "tabsContainer__tab"}>ADD</div>
                <div onClick={() =>toggleTab("edit")} className={portfolioAction==='1y' ? "tabsContainer__tab tabsContainer__tab--active": "tabsContainer__tab"}>EDIT</div>
            </div>
            <div>
                {portfolioAction==='add' && <AddPortfolio/>}
                {portfolioAction==='edit' && <div></div>}
            </div>
        </div>
    );
};

export default PortfolioTabs;