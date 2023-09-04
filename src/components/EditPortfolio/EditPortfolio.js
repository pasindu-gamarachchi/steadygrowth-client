import FormRow from "../FormRow/FormRow";
import "./EditPortfolio.scss";
import { useState, useEffect } from 'react';
import axios from 'axios';
import AddPortfolio from "../AddPortfolio/AddPortfolio";


const EditPortfolio = ({user, fetchData}) => {

    const [portfolioData, setportfolioData] = useState({});
    const [isLoading, setisLoading] = useState(true);
    const [isPortfolioUpdated, setisPortfolioUpdated] = useState(false);


    useEffect(() => {
        axios
            .get(`http://localhost:5050/api/portfolio?user_id=${user}`) // USE ENV VAR
            .then((resp) =>{
                const newPortfolioData = resp.data;
                setportfolioData(newPortfolioData);
                setisLoading(false);
                console.log(`Reloading for edit with ${resp.data}`);
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
            <h2>Edit your Portfolio</h2>
            <div className="editContainer">
                {
                    portfolioData.filter((elem) =>
                        elem.purchase_shares >0 ).map((elem)=>{

                        return <AddPortfolio isEdit={true} symb={"aapl"} shares={elem.purchase_shares}
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