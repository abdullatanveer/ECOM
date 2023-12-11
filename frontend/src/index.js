import React from 'react';
import ReactDOM from 'react-dom/client';
 import App from './App'
 import  {Provider}  from 'react-redux';
 import {positions,transitions,Provider as AlertProvider } from 'react-alert';
 import AlertTempalte from 'react-alert-template-basic';
  

 import store from './store';

 const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
  
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
  <Provider store={store}> 
  <AlertProvider template={AlertTempalte} {...options}> 
  
    <App />
     
    </AlertProvider>
    </Provider>
   
   
);

