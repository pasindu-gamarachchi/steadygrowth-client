import './App.scss';
import Header from './components/Header/Header';
import ChartsPage from './pages/ChartsPage/ChartsPage';
import PortfolioPage from './pages/PortfolioPage/PortfolioPage';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import SignupPage from './pages/SignupPage/SignupPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import { useState } from 'react';


function App() {

  const [isLoggedIn, setisLoggedIn] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Header isLoggedIn ={isLoggedIn} setisLoggedIn={setisLoggedIn} />
        
        <Routes>
          <Route path="/" element={<HomePage isLoggedIn ={isLoggedIn} />}/>
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path="/login"   element={<LoginPage isLoggedIn ={isLoggedIn} setisLoggedIn={setisLoggedIn}/>}/>
          <Route path="/charts" element={<ChartsPage />} />
          <Route path="/charts/:symb" element={<ChartsPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
        </Routes>
        
        <Footer/>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
