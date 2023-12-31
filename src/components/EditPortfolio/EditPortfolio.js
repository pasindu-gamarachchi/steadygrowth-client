import "./EditPortfolio.scss";
import { useState, useEffect } from 'react';
import axios from 'axios';

import AddPortfolio from "../AddPortfolio/AddPortfolio";
import { mapper, invertedMapper } from "../../utils/utils";



const BASEURL = process.env.REACT_APP_SERVER_URL; 

const EditPortfolio = ({user, fetchData}) => {

    const [portfolioData, setportfolioData] = useState({});
    const [isLoading, setisLoading] = useState(true);
    const [isPortfolioUpdated, setisPortfolioUpdated] = useState(false);


    useEffect(() => {
        axios
            .get(`${BASEURL}/api/portfolio?user_id=${user}`) // USE ENV VAR
            .then((resp) =>{
                const newPortfolioData = resp.data;
                setportfolioData(newPortfolioData);
                setisLoading(false);
                console.log(`Reloading for edit with ${resp.data[0]}`);
                setisPortfolioUpdated(false);
            })
            .catch((err)=>{
                console.error(err);
            }
            )
    }, [isPortfolioUpdated]
    )

    if (isLoading){
        return <p>Loading...</p>
    }


    const triggerReload = (val) =>{
        console.log(`Triggering reload with ${val}`);
        setisPortfolioUpdated(val);
    }

    return (
        <div>
            <h2 className="editPortfheading">Edit your Portfolio</h2>
            <div className="editContainer">
                {
                    portfolioData.filter((elem) =>
                        elem.purchase_shares >0 ).map((elem)=>{

                        return <AddPortfolio isEdit={true} symb={mapper[elem.stock_symbol]} shares={elem.purchase_shares}
                                    purchDateData={elem.purchase_date}
                                    price={elem.purchase_price}
                                    fetchData={fetchData} key={elem.id}
                                    portId={elem.port_id}
                                    triggerReload={triggerReload}
                                    user={user}
                                    
                        
                                />
                    })
                }
            </div>
        </div>
    );
};

export default EditPortfolio;