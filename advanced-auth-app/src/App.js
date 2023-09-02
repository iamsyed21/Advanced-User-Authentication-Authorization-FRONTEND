import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/header';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/scss/main.scss';
import './App.scss';


function App() {
  return (
    <div>
      <Header />
      <ToastContainer />
      <div className='container my-2'>
      <Outlet />
      </div>
    </div>
  );
}

export default App;
