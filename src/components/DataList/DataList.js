import "./DataList.scss"

const DataList = ({handleStock, symbDef}) => {

    const Stocks = ['aapl', 'amzn', 'bp', 'googl', 'mdb', 'msft', 'nflx', 'shop',
            'su', 'team', 'tsla'];

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