import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import SpecialMessagePage from './SpecialMessagePage';
import BirthdayGreeting from './BirthdayGreeting';
import BirthdayGreetingDark from './BirthdayGreetingDark';

const root = ReactDOM.createRoot(document.getElementById('root'));

const App = () => {
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<BirthdayGreeting 
            recipientName="hiba" 
            theme="wife" 
          />} 
        />
        <Route 
          path="/special-message" 
          element={<SpecialMessagePage theme="light" />} 
        />
        <Route 
          path="/dark" 
          element={<BirthdayGreetingDark 
            recipientName="hiba" 
            theme="dark-romantic" 
          />} 
        />
      </Routes>
    </Router>
  );
};

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);