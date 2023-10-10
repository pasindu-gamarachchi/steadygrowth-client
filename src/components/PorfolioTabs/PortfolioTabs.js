import { useState } from 'react';
import AddPortfolio from '../AddPortfolio/AddPortfolio';
import PortfolioAdd from '../PortfolioAdd/PortfolioAdd';
import EditPortfolio from "../EditPortfolio/EditPortfolio";
import "./PortfolioTabs.scss"

const PortfolioTabs = ({fetchData, user_id}) => {

    const [portfolioAction, setportfolioAction] = useState('add');

    const toggleTab = (per)=>{
        setportfolioAction(per);
    }

    return (
        <div className='modifyPortfolioContainer'>
            <div className='updtabsContainer'>
                <div onClick={() =>toggleTab("add")} className={portfolioAction==='add' ? "updtabsContainer__tab updtabsContainer__tab--active": "updtabsContainer__tab"}>ADD</div>
                <div onClick={() =>toggleTab("edit")} className={portfolioAction==='edit' ? "updtabsContainer__tab updtabsContainer__tab--active": "updtabsContainer__tab"}>EDIT</div>
            </div>
            <div>
                {/*portfolioAction==='add' && <AddPortfolio fetchData={fetchData} user={user_id}/>*/}
                {portfolioAction==='add' && <PortfolioAdd user={user_id} fetchData={fetchData}/>}
                {portfolioAction==='edit' && <EditPortfolio user={user_id} fetchData={fetchData}/>}
            </div>
        </div>
    );
};

export default PortfolioTabs;