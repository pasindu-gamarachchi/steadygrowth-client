import { useState } from "react";
import DataList from "../DataList/DataList";
import FormInput from "../FormInput/FormInput";
import { isInt, isValidStockDay, isIntgtZero } from "../../utils/utils";
import axios from 'axios';
import { Link, useNavigate, useParams } from "react-router-dom";


const BASEURL = process.env.REACT_APP_SERVER_URL || "http://localhost:5050"; ///TODO : FIX THIS

const AddPortfolio = ({isEdit, symb, shares, purchDateData, price, fetchData, portId, triggerReload}) => {

    //console.log(`Received : ${isEdit}, ${symb}, ${shares}, ${purchDateData}, ${price}, ${portId}`);
    // console.log(`Received shares : ${shares}`);

    const [formValues, setformValues] = useState({symb: symb || "", shares: shares || 0 ,
         purchaseDate: purchDateData ||  "", price: price || 0.00})
    const [isValid, setisValid] = useState({shares: true, price: true, purchaseDate:false});

    const handleStock = ()=>{
        console.log("Stock");
    }


    const handleSubmission = ()=>{
        console.log(isFormValid());
        console.log(BASEURL);

        if (isFormValid()){
            if (isEdit){
                console.log(`isEdit`);
                axios
                .get(`${BASEURL}/api/chartdata/ondate/${formValues.symb}?ondate=${formValues.purchaseDate}`)
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
                    "user_id": 1,
                    "stock_id": 2, 
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
            axios
            .get(`${BASEURL}/api/chartdata/ondate/${formValues.symb}?ondate=${formValues.purchaseDate}`)
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
                   const dataToInsert = {
                    "user_id": 1,
                    "stock_id": 2, 
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
            "user_id": 1,
            "stock_id": 2, 
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
            newValidation[e.target.name] = isValidStockDay(e.target.value)
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
        <div>
            <h2>Add Stock</h2>
            <DataList handleStock={handleChange} symbDef={symb}/>
            <FormInput name={"shares"} value={formValues.shares} valid={isValid.shares} handleChange={handleChange}/>
            <FormInput name={"price"} value={formValues.price} valid={isValid.price} handleChange={handleChange}/>
            <label htmlFor="purchaseDate">Purchase Date</label>
            <input type="date" name="purchaseDate" onChange={handleChange} value={purchDateData}/>
            <div>
                <button onClick={handleSubmission}>
                    SAVE
                </button>
                <button>
                    CANCEL
                </button>
                {
                    isEdit && <button onClick={handleDelete}>DELETE</button>
                }
            </div>
        </div>
    );
};

export default AddPortfolio;