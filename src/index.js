import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import {store} from './Assets/Store/store';
import HomePage from './Pages/HomePage';
import FAQPage from './Pages/FAQPage';
import SupportPage from './Pages/SupportPage';
import AboutPage from './Pages/AboutPage';
import LoginPage from './Pages/LoginPage';
import ShopPage from './Pages/ShopPage';
import CategoryPage from './Pages/CategoryPage';
import ProductPage from './Pages/ProductPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />}/>
        <Route path="/shop" element={<ShopPage/>}/>
        <Route path="/categoryPage/:categoryName" element={<CategoryPage/>}/>
        <Route path="/productPage/:productId" element={<ProductPage/>}/>
        <Route path="/faq" element={<FAQPage/>}/>
        <Route path="/support" element={<SupportPage/>}/>
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
      </Routes>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
