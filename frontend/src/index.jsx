import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import './styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/univ1" element={<App slug={'sunrise-private-univ'} />} />
        <Route path="/univ2" element={<App slug={'crescent-institute'} />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
