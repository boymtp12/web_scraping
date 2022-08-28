import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import PageResult from './component/PageResult';
import HomeSearch from './component/HomeSearch';
import Test from './component/Test';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="result" element={<PageResult />} />
      <Route path="home-search" element={<HomeSearch />} />
      <Route path="test" element={<Test />} />
    </Routes>
  </BrowserRouter>
);
reportWebVitals();
