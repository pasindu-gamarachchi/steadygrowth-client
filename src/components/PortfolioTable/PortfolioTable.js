import "./PortfolioTable.scss";
import { generatePorfCardData } from "../../utils/utils";
import PortfolioCard from "../PortfolioCard/PortfolioCard";
import "./PortfolioTable.scss";

const PortfolioTable = ({portfolioData}) => {
    // console.log(portfolioData[0]);
    const portData = generatePorfCardData(portfolioData);
    // console.log(portData);
    return (
        <div className="portfolioTable">
            <h2 className="portfolioTable__heading">Portfolio Summary</h2>
            <PortfolioCard isColName={true} purchDate={"Purchase Date"} symb ={"Symbol"} purchVal={"Purchase Value"}
                            currVal={"Current Value"} profitVal={"Profit"}/>
            {
                portData.map((elem)=>{
                    return <PortfolioCard purchDate={elem.purchaseDate} symb ={elem.stockSymbol} purchVal={elem.purchaseValue}
                            currVal={elem.currentValue} profitVal={elem.profitValue} isprof={elem.profitValue>0}/>
                })
            }
        </div>
    );
};

export default PortfolioTable;