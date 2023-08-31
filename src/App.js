import './App.scss';
import Header from './components/Header/Header';
import ChartsPage from './pages/ChartsPage/ChartsPage';
import PortfolioPage from './pages/PortfolioPage/PortfolioPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<ChartsPage />} />
          <Route path="/:symb" element={<ChartsPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
