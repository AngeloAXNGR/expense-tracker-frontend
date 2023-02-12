import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { ExpenseContextProvider } from './contexts/ExpenseContext';

import Header from './components/Header';
import Expenses from './pages/Expenses';

function App() {
  return (
    <ExpenseContextProvider>
      <div className="App">
        <Header/>
        <Routes>
          <Route path="/" element={<Expenses/>}/>
        </Routes>
      </div>
    </ExpenseContextProvider>
  );
}

export default App;
