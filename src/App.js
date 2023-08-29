import './App.scss';
import Header from './components/Header/Header';
import { BrowserRouter } from 'react-router-dom';
import StockChart from './components/StockChart/StockChart';
import ChartsTab from './components/ChartsTab/ChartsTab';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <ChartsTab/>
      </BrowserRouter>
    </div>
  );
}

export default App;
