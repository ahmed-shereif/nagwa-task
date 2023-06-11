import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import ActivityPage from './routes/ActivityPage/ActivityPage';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ActivityPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
