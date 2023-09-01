import FormRow from "../FormRow/FormRow";
import "./EditPortfolio.scss";
import { useState, useEffect } from 'react';
import axios from 'axios';
import AddPortfolio from "../AddPortfolio/AddPortfolio";


const EditPortfolio = ({user, fetchData}) => {

    const [portfolioData, setportfolioData] = useState({});
    const [isLoading, setisLoading] = useState(true);


    useEffect(() => {
        axios
            .get(`http://localhost:5050/api/portfolio?user_id=${user}`)
            .then((resp) =>{
                const newPortfolioData = resp.data;
                setportfolioData(newPortfolioData);
                setisLoading(false);
            })
            .catch((err)=>{
                console.error(err);
            }
            )
    }, [user]
    )

    if (isLoading){
        return <p>Loading...</p>
    }


    return (
        <div>
            <h2>Edit your Portfolio</h2>
            <div className="editContainer">
                {
                    portfolioData.map((elem)=>{

                        return <AddPortfolio isEdit={true} symb={"aapl"} shares={elem.purchase_shares}
                                    purchDateData={elem.purchase_date}
                                    price={elem.purchase_price}
                                    fetchData={fetchData} key={elem.id}
                                    portId={elem.port_id}
                                    
                        
                                />
                    })
                }
            </div>
        </div>
    );
};

export default EditPortfolio;