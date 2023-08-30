import './App.scss';
import Header from './components/Header/Header';
import StockChart from './components/StockChart/StockChart';
import ChartsTab from './components/ChartsTab/ChartsTab';
import SummaryTable from './components/SummaryTable/SummaryTable';
import ChartsPage from './pages/ChartsPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/:symb" element={<ChartsPage />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
