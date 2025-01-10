import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router'
import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import PeriodTracker from './pages/PeriodTracker';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/periodtracker" element={<PeriodTracker />} />
      </Routes>
    </Router>
    
  </React.StrictMode>
);

