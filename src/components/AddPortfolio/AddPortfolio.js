import { useState } from "react";
import DataList from "../DataList/DataList";
import FormInput from "../FormInput/FormInput";
import { isInt, isValidStockDay, isIntgtZero, mapper, invertedMapper } from "../../utils/utils";
import axios from 'axios';
import { Link, useNavigate, useParams } from "react-router-dom";
import "./AddPortfolio.scss"


const BASEURL = process.env.REACT_APP_SERVER_URL || "http://localhost:5050"; ///TODO : FIX THIS user={user_id}

const AddPortfolio = ({isEdit, symb, shares, purchDateData, price, fetchData, portId, triggerReload, user}) => {

    //console.log(`Received : ${isEdit}, ${symb}, ${shares}, ${purchDateData}, ${price}, ${portId}`);
    // console.log(`Received shares : ${shares}`);
    // console.log(`User : ${user}`);
    const [formValues, setformValues] = useState({symb: symb || "", shares: shares || 0 ,
         purchaseDate: purchDateData ||  "", price: price || 0.00})
    const [isValid, setisValid] = useState({shares: true, price: true, purchaseDate:false});

    const handleStock = ()=>{
        console.log("Stock");
    }


    const handleSubmission = ()=>{
        console.log(isFormValid());
        // console.log(BASEURL);

        if (isFormValid()){
            if (isEdit){
                console.log(`isEdit`);
                const symbmapped = invertedMapper[formValues.symb];
                axios
                .get(`${BASEURL}/api/chartdata/ondate/${symbmapped}?ondate=${formValues.purchaseDate}`)
                .then((resp) =>{
                    console.log(resp.data);
                    if (resp.data.length >0){
                        console.log(`Received data ${resp.data}`);
                        console.log(resp.data);
                        resp.isPutData = true;
                        
                        return {...resp.data, isPutData:true};
                    }
                    else{
                        const newValidation = { ...isValid };
                        newValidation.purchaseDate =false;
                        setisValid(newValidation);

                    }
            })
            .then((purchDateData)=>{ //TODO if edit update existing data do not insert
                if(purchDateData){
                   console.log(`Putting data --> ${purchDateData}`);
                   console.log(purchDateData);
                   const dataToUpdate = {
                    "user_id": user,
                    "stock_id": invertedMapper[formValues.symb], 
                    "purchase_shares": formValues.shares,
                    "purchase_date": formValues.purchaseDate,
                    "purchase_price":  purchDateData[0].Close,
                    "port_id": portId
                  }
                  console.log(dataToUpdate);
                   axios.patch(`${BASEURL}/api/portfolio`, dataToUpdate)
                   .then((resp) =>{
                    console.log(resp);
                    fetchData(true);
                    triggerReload(true);


                   })
                   .catch((err)=>{
                    console.error(err);
                   })
                }
            })
            .catch((err)=>{
                console.error(err);
            }
            )
            .finally((resp)=>{
                //console.log('Navigating to portfolio')
                //avigate("/portfolio");

            })
            }
            else{
                const invertedSym = invertedMapper[formValues.symb];
            axios
            .get(`${BASEURL}/api/chartdata/ondate/${invertedSym}?ondate=${formValues.purchaseDate}`)
            .then((resp) =>{
                console.log(resp.data);
                if (resp.data.length >0){
                    console.log(`Received data ${resp.data}`);
                    console.log(resp.data);
                    resp.isPutData = true;
                    const newFormValues = {...formValues}
                    // newFormValues.price 
                    
                    return {...resp.data, isPutData:true};
                }
                else{
                    const newValidation = { ...isValid };
                    newValidation.purchaseDate =false;
                    setisValid(newValidation);

                }
            })
            .then((purchDateData)=>{ //TODO if edit update existing data do not insert
                if(purchDateData){
                   console.log(`Putting data --> ${purchDateData}`);
                   console.log(purchDateData);
                   const invertedSym = invertedMapper[formValues.symb];

                   const dataToInsert = {
                    "user_id": user,
                    "stock_id": invertedSym, 
                    "purchase_date": formValues.purchaseDate,
                    "purchase_price": purchDateData[0].Close,
                    "purchase_shares": formValues.shares
                  }
                  console.log(dataToInsert);
                   axios.put(`${BASEURL}/api/portfolio`, dataToInsert)
                   .then((resp) =>{
                    console.log(resp);
                    // console.log('Navigating to portfolio')
                    fetchData(true);

                   })
                   .catch((err)=>{
                    console.error(err);
                   })
                }
            })
            .catch((err)=>{
                console.error(err);
            }
            )
            .finally((resp)=>{
                //console.log('Navigating to portfolio')
                //avigate("/portfolio");

            })
            }
        }

    }

    const handleDelete = () =>{
        console.log(`Delete called`)

        const dataToUpdate = {
            "user_id": user,
            "stock_id": invertedMapper[formValues.symb], 
            "purchase_shares": 0,
            "purchase_date": formValues.purchaseDate,
            "purchase_price":  formValues.price,
            "port_id": portId
          }
          //console.log(dataToUpdate);
           axios.patch(`${BASEURL}/api/portfolio`, dataToUpdate)
           .then((resp) =>{
            console.log(resp);
            fetchData(true);
            triggerReload(true);


           })
           .catch((err)=>{
            console.error(err);
           })

    }

    const handleChange = (e) =>{
        //console.log(`${e.target.name} :  ${e.target.value}`);
        const newValues = { ...formValues };
        const newValidation = { ...isValid };
        newValues[e.target.name] = e.target.value;
        setformValues(newValues);

        if (e.target.name==="shares"){
            newValidation[e.target.name] = isIntgtZero(e.target.value);
        }

        if (e.target.name==="purchaseDate"){
            newValidation[e.target.name] = isValidStockDay(e.target.value);
            const invertedSym = invertedMapper[formValues.symb];
            if (isValidStockDay(e.target.value)){
            axios
            .get(`${BASEURL}/api/chartdata/ondate/${invertedSym}?ondate=${formValues.purchaseDate}`)
            .then((resp) =>{
                console.log(resp.data);
                if (resp.data.length >0){
                    //console.log(`Received data ${resp.data}`);
                    // console.log(resp.data);
                    resp.isPutData = true;
                    const newFormValues = {...formValues}
                    newFormValues.price = resp.data[0].Close;
                    setformValues(newFormValues);
                    // return {...resp.data, isPutData:true};
                }
                //else{
                //    const newValidation = { ...isValid };
                //    newValidation.purchaseDate =false;
                //    setisValid(newValidation);

                // }
            })
            }
            //let day = new Date(e.target.value).getUTCDay();
            //if (day===0 || day==6){
            //    newValidation[e.target.name] = false;
            // }
            // console.log(`day ---> ${day}`);
        }
        setisValid(newValidation);

    }

    const isFormValid = ()=>{
        let valid = true;
        Object.keys(isValid).forEach(key =>{
            console.log(key, isValid[key], formValues[key])
            if (!isValid[key]){
                valid =false;
            }
        }
        )
        return valid;

    }
    return (
        <div className="addPortfolioContainer">
            {!isEdit  && <h2 className="addPortfolioContainer__heading">Add to your portfolio</h2>}
            <DataList handleStock={handleChange} symbDef={symb}/>
            <FormInput name={"shares"} value={formValues.shares} valid={isValid.shares} handleChange={handleChange}/>
            <FormInput name={"price"} value={formValues.price} valid={isValid.price} handleChange={handleChange}/>
            <div className="calendarContainer">
                <label htmlFor="purchaseDate" className="calendarContainer__label">Purchase Date</label>
                <input className='dataListContainer__inp' type="date" name="purchaseDate" onChange={handleChange} value={purchDateData}/>
            </div>
            {isEdit? 
                <div className="btnContainer--modforedit">
                    <button onClick={handleSubmission} className="btnContainer__btn--modforedit">
                        SAVE
                    </button>
                    <button className="btnContainer__btn--modforedit">
                        CANCEL
                    </button>
                    
                    <button onClick={handleDelete} className="btnContainer__btn--modforedit" >DELETE</button>
                    
                </div>:
                    <div className="btnContainer">
                    <button onClick={handleSubmission} className="btnContainer__btn">
                        SAVE
                    </button>
                    <button className="btnContainer__btn">
                        CANCEL
                    </button>
                </div>
            }
        </div>
    );
};

export default AddPortfolio;