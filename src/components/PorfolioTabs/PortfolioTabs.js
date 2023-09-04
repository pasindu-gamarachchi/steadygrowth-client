import { useState } from 'react';
import AddPortfolio from '../AddPortfolio/AddPortfolio';
import EditPortfolio from "../EditPortfolio/EditPortfolio";

const PortfolioTabs = ({fetchData, user_id}) => {

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
                {portfolioAction==='add' && <AddPortfolio fetchData={fetchData} user={user_id}/>}
                {portfolioAction==='edit' && <EditPortfolio user={user_id} fetchData={fetchData}/>}
            </div>
        </div>
    );
};

export default PortfolioTabs;