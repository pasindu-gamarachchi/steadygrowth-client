import { useState } from "react";
import DataList from "../DataList/DataList";
import FormInput from "../FormInput/FormInput";

const AddPortfolio = () => {

    const [formValues, setformValues] = useState({symb: "", shares: 0, purchDate: "", price: 0.00})
    const [isValid, setisValid] = useState({shares: true, price: true});

    const handleStock = ()=>{
        console.log("Stock");
    }

    const handleChange = (e) =>{
        console.log(`${e.target.name} :  ${e.target.value}`);
        const newValues = { ...formValues };
        const newValidation = { ...isValid };
        newValues[e.target.name] = e.target.value;
        setformValues(newValues);

    }
    return (
        <div>
            <h2>Add Stock</h2>
            <DataList/>
            <FormInput name={"shares"} value={formValues.shares} valid={isValid.shares} handleChange={handleChange}/>
            <FormInput name={"price"} value={formValues.price} valid={isValid.price} handleChange={handleChange}/>
            <label htmlFor="purchaseDate">Purchase Date</label>
            <input type="date" name="purchaseDate" onChange={handleChange}/>
            <div>
                <button>
                    SAVE
                </button>
                <button>
                    CANCEL
                </button>
            </div>
        </div>
    );
};

export default AddPortfolio;