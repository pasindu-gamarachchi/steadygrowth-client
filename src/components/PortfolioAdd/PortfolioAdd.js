import "./PortfolioAdd.scss"
import DataList from "../DataList/DataList";
import FormInput from "../FormInput/FormInput";

import {symbolSet, isValidStockDay, isIntgtZero, invertedMapper} from "../../utils/utils"

import { useState } from "react";
import axios from 'axios';



const BASEURL = process.env.REACT_APP_SERVER_URL;

const PortfolioAdd = ({user, fetchData}) => {
    //console.log(symbolSet);

    /* TODO
        1. Validate shares - DONE, price - DONE, purchase date - DONE
            a. dynamically load price - DONE 
        2. Add submission request -  DONE
        3. Update state after submission - DONE

    */

    const [formValues, setformValues] = useState({symb: "", shares:  0 ,
         purchaseDate: "", price: 0.00})
    const [isValid, setisValid] = useState({shares: true, price: true, purchaseDate:true, symb:true});
    const [showPrice, setShowPrice] = useState(false);

    const handleChange = (e) =>{
        const newValues = { ...formValues };
        const newValidation = { ...isValid };
        console.log(`${e.target.name} : ${e.target.value}`);
        newValues[e.target.name] = e.target.value;


        if (e.target.name==="symb" && symbolSet.has(e.target.value)){
            newValidation.symb =true;
        }
        else if (e.target.name==="symb"){
            newValidation.symb = false;
        }

        if (e.target.name==="purchaseDate"){
            newValidation[e.target.name] = isValidStockDay(e.target.value);
        }

        if (e.target.name==="shares"){
            newValidation[e.target.name] = isIntgtZero(e.target.value);
        }


        setformValues(newValues);
        setisValid(newValidation);
        // console.log(newValues);
        if (
            newValidation.shares && newValidation.symb && newValidation.purchaseDate
            && newValues.shares !==0 && newValues.symb !=="" && newValues.purchaseDate !==""
            ){
            // console.log('All valid!');
            getPrice(newValues.purchaseDate);
        }
        else{
            setShowPrice(false);
        }
        // console.log(formValues);
        //console.log(newValidation);

    }

    const handleSubmission = ()=>{
        console.log('clicked')
        const invertedSym = invertedMapper[formValues.symb];
            axios
            .get(`${BASEURL}/api/chartdata/ondate/${invertedSym}?ondate=${formValues.purchaseDate}`)
            .then((resp) =>{

                if (resp.data.length >0){

                    resp.isPutData = true;
                    const newFormValues = {...formValues}
                    
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
                const invertedSym = invertedMapper[formValues.symb];

                const dataToInsert = {
                    "user_id": user,
                    "stock_id": invertedSym, 
                    "purchase_date": formValues.purchaseDate,
                    "purchase_price": formValues.price,
                    "purchase_shares": formValues.shares
                }
                //console.log(dataToInsert);
                axios.put(`${BASEURL}/api/portfolio`, dataToInsert)
                .then((resp) =>{
                    console.log(resp);
                    // console.log('Navigating to portfolio')
                    fetchData(true);
                    /// RESET FORM
                    
                    const defaultFormValues = {symb: "", shares: 0 ,
                                purchaseDate:  "", price:  0.00}
                    const defaultValidStatuses = {shares: true, price: true, purchaseDate:true, symb:true}
                    setformValues(defaultFormValues);
                    setisValid(defaultValidStatuses);
                    setShowPrice(false);

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
    }

    const getPrice = (purchDate)=>{
        const invertedSym = invertedMapper[formValues.symb];
        axios
        .get(`${BASEURL}/api/chartdata/ondate/${invertedSym}?ondate=${purchDate}`)
        .then((resp) =>{
            if (resp.data.length >0){
                resp.isPutData = true;
                const newFormValues = {...formValues}
                const price = resp.data[0].Close;
                newFormValues.price = price;
                newFormValues.purchaseDate = purchDate;
                setformValues(newFormValues);
                setShowPrice(true);
                
                return {...resp.data, isPutData:true};
            }
            else{
                const newValidation = { ...isValid };
                newValidation.purchaseDate =false;
                setisValid(newValidation);

            }
        })
    }

    return (
        <div className='portfolioAddContainer'>
            <DataList handleStock={handleChange} isValid={isValid.symb}/>
            <FormInput name={"shares"} value={formValues.shares} valid={isValid.shares} handleChange={handleChange}/>
            {showPrice && <FormInput name={"price"} value={formValues.price} valid={isValid.price} handleChange={handleChange}/>}
            <div className="calendarContainer">
                <label htmlFor="purchaseDate" className="calendarContainer__label">Purchase Date</label>
                <input className={isValid.purchaseDate?'calendarContainer__inp':'calendarContainer__inp calendarContainer__inp--err'} type="date" name="purchaseDate" onChange={handleChange} value={formValues.purchaseDate}/>
            </div>
            <div className="btnContainer">
                    <button onClick={handleSubmission} className="btnContainer__btn">
                        SAVE
                    </button>
                    <button className="btnContainer__btn">
                        CANCEL
                    </button>
            </div>
        </div>
    );
};

export default PortfolioAdd;