import "./DataList.scss";
import { mapper, invertedMapper } from "../../utils/utils";

const DataList = ({ handleStock, symbDef, isValid }) => {
	const Stocks = Object.keys(mapper);

	return (
		<div className="dataListContainer">
			<label className="dataListContainer__label" htmlfor="stock-choice">
				Choose a Stock:
			</label>
			<input
				className={
					!isValid
						? "dataListContainer__inp dataListContainer__inp--err"
						: "dataListContainer__inp"
				}
				list="stocks"
				id="stock-choice"
				onSelect={handleStock}
				name="symb"
				placeholder=""
				value={symbDef}
			/>
			<datalist id="stocks">
				{Stocks.map((elem) => {
					return <option value={mapper[elem]}></option>;
				})}
			</datalist>
		</div>
	);
};

export default DataList;
