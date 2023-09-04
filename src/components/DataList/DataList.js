import "./DataList.scss"

const DataList = ({handleStock, symbDef}) => {

    const Stocks = ['aapl', 'amzn', 'nflx', 'bp', 'su', 'shop', 'tsla', 'msft'];

    return (
        <div className="dataListContainer">
            <label className='dataListContainer__label' htmlfor="stock-choice">Choose a Stock:</label>
            <input className='dataListContainer__inp' list="stocks" id="stock-choice" onSelect={handleStock} name="symb" placeholder="" value={symbDef} />
            <datalist id="stocks">
                {
                    Stocks.map(
                        (elem) =>{
                            return <option value={elem} ></option>
                        }
                    )
                }
            </datalist>
        </div>
    );
};

export default DataList;