import { useState } from "react";
import DataList from "../DataList/DataList";
import FormInput from "../FormInput/FormInput";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

import {
	isInt,
	isValidStockDay,
	isIntgtZero,
	mapper,
	invertedMapper,
} from "../../utils/utils";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./AddPortfolio.scss";
import confirmIcon from "../../assets/icons/confirm.svg";
import cancelIcon from "../../assets/icons/cancel.svg";
import deleteIcon from "../../assets/icons/trash.svg";

const BASEURL = process.env.REACT_APP_SERVER_URL || "http://localhost:5050"; ///TODO : FIX THIS user={user_id}

const AddPortfolio = ({
	isEdit,
	symb,
	shares,
	purchDateData,
	price,
	fetchData,
	portId,
	triggerReload,
	user,
}) => {
	const [formValues, setformValues] = useState({
		symb: symb || "",
		shares: shares || 0,
		purchaseDate: purchDateData || "",
		price: price || 0.0,
	});
	const [isValid, setisValid] = useState({
		shares: true,
		price: true,
		purchaseDate: true,
		symb: true,
	});
	const [showModal, setshowModal] = useState(false);
	const [modalInfo, setmodalInfo] = useState({});
	const [modalAction, setModalAction] = useState(null);

	const handleSubmission = () => {
		if (isFormValid()) {
			if (isEdit) {
				console.log(`isEdit`);
				const symbmapped = invertedMapper[formValues.symb];
				axios
					.get(
						`${BASEURL}/api/chartdata/ondate/${symbmapped}?ondate=${formValues.purchaseDate}`
					)
					.then((resp) => {
						if (resp.data.length > 0) {
							resp.isPutData = true;

							return { ...resp.data, isPutData: true };
						} else {
							const newValidation = { ...isValid };
							newValidation.purchaseDate = false;
							setisValid(newValidation);
						}
					})
					.then((purchDateData) => {
						//TODO if edit update existing data do not insert
						if (purchDateData) {
							const dataToUpdate = {
								user_id: user,
								stock_id: invertedMapper[formValues.symb],
								purchase_shares: formValues.shares,
								purchase_date: formValues.purchaseDate,
								purchase_price: purchDateData[0].Close,
								port_id: portId,
							};
							axios
								.patch(`${BASEURL}/api/portfolio`, dataToUpdate)
								.then((resp) => {
									setshowModal(false);

									fetchData(true);
									triggerReload(true);
								})
								.catch((err) => {
									console.error(err);
								});
						}
					})
					.catch((err) => {
						console.error(err);
					})
					.finally((resp) => {});
			}
		}
	};

	const deleteConfirmed = () => {
		const dataToUpdate = {
			user_id: user,
			stock_id: invertedMapper[formValues.symb],
			purchase_shares: 0,
			purchase_date: formValues.purchaseDate,
			purchase_price: formValues.price,
			port_id: portId,
		};
		axios
			.patch(`${BASEURL}/api/portfolio`, dataToUpdate)
			.then((resp) => {
				setshowModal(false);

				fetchData(true);
				triggerReload(true);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const handleDelete = () => {
		setshowModal(true);
		const newModalInfo = {
			heading: "Confirm Delete",
			text: `Deleting your purchase on ${formValues.purchaseDate} of ${formValues.shares} shares of 
                                        ${formValues.symb}`,
			action: "Delete",
		};
		setmodalInfo(newModalInfo);
	};

	const handleUpdate = () => {
		if (isFormValid()) {
			setshowModal(true);
			const newModalInfo = {
				heading: "Confirm Update",
				text: `Updating your portfolio with the following values, stock symbol : ${formValues.symb}, 
                         Purchase Date : ${formValues.purchaseDate}, shares : ${formValues.shares}, purchase price : ${formValues.price}`,
				action: "Update",
			};
			setmodalInfo(newModalInfo);
			setModalAction("Update");
		}
	};

	const handleChange = (e) => {
		const newValues = { ...formValues };
		const newValidation = { ...isValid };
		newValues[e.target.name] = e.target.value;
		setformValues(newValues);

		if (e.target.name === "shares") {
			newValidation[e.target.name] = isIntgtZero(e.target.value);
		}

		if (e.target.name === "purchaseDate") {
			/// TODO : AVOID REPEATING THIS CHECK
			newValidation[e.target.name] = isValidStockDay(e.target.value);
			/*
            const invertedSym = invertedMapper[formValues.symb];
            console.log(`Purchase Date : ${e.target.value}`);
            if (e.target.value!=="" && isValidStockDay(e.target.value)){
            axios
            .get(`${BASEURL}/api/chartdata/ondate/${invertedSym}?ondate=${e.target.value}`)
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
            .catch((err)=>{
                console.error(`Error : ${err}`);
            })
            }*/
			//let day = new Date(e.target.value).getUTCDay();
			//if (day===0 || day==6){
			//    newValidation[e.target.name] = false;
			// }
			// console.log(`day ---> ${day}`);
		}
		setisValid(newValidation);
	};

	const isFormValid = () => {
		let valid = true;
		Object.keys(isValid).forEach((key) => {
			//console.log(key, isValid[key], formValues[key]);
			if (!isValid[key]) {
				valid = false;
			}
		});
		return valid;
	};
	return (
		<div
			className={
				isEdit
					? "addPortfolioContainer--modforedit"
					: "addPortfolioContainer"
			}
		>
			{!isEdit && (
				<h2 className="addPortfolioContainer__heading">
					Add to your portfolio
				</h2>
			)}
			<DataList
				handleStock={handleChange}
				symbDef={symb}
				isValid={isValid}
			/>
			<FormInput
				name={"shares"}
				value={formValues.shares}
				valid={isValid.shares}
				handleChange={handleChange}
			/>
			<FormInput
				name={"price"}
				value={formValues.price}
				valid={isValid.price}
				handleChange={handleChange}
			/>
			<div className="calendarContainer">
				<label
					htmlFor="purchaseDate"
					className="calendarContainer__label"
				>
					Purchase Date
				</label>
				<input
					className="calendarContainer__inp"
					type="date"
					name="purchaseDate"
					onChange={handleChange}
					value={purchDateData}
				/>
			</div>
			{isEdit ? (
				<div className="btnContainer--modforedit">
					<button
						onClick={handleUpdate}
						className="btnContainer__edit"
					>
						<img src={confirmIcon} className="btnContainer__img" />
					</button>
					<button className="btnContainer__edit">
						<img src={cancelIcon} className="btnContainer__img" />
					</button>

					<button
						onClick={handleDelete}
						className="btnContainer__edit"
					>
						<img src={deleteIcon} className="btnContainer__img" />
					</button>
				</div>
			) : (
				<div className="btnContainer">
					<button
						onClick={handleSubmission}
						className="btnContainer__btn"
					>
						SAVE
					</button>
					<button className="btnContainer__btn">CANCEL</button>
				</div>
			)}
			{showModal && (
				<ConfirmModal
					setshowModal={setshowModal}
					modalInfo={modalInfo}
					modalAction={modalAction}
					deleteConfirmed={deleteConfirmed}
					updateConfirmed={handleSubmission}
				/>
			)}
		</div>
	);
};

export default AddPortfolio;
