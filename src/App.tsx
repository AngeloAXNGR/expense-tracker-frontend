import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { ExpenseContextProvider } from './contexts/ExpenseContext';

import Header from './components/Header';
import Expenses from './pages/Expenses';
import ItemList from './pages/ItemList';

function App() {
  return (
    <ExpenseContextProvider>
      <div className="App">
        <Header/>
        <Routes>
          <Route path="/" element={<Expenses/>}/>
          <Route path="/:expenseId/items" element={<ItemList/>}/>
        </Routes>
      </div>
    </ExpenseContextProvider>
  );
}

export default App;
