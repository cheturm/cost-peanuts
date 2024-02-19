import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Registration from './Registration/registration';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './Common/header/header';
import Dashboard from './Dashboard/dashboard';
import Login from './Login/login';
import Bubble from './Bubble-sort/bubble';
const router = createBrowserRouter([
{
  path: '/',
  element: <Login />,
},
{
  path: '/register',
  element: <Registration />,
},
{
  path: '/dashboard',
  element: <Dashboard />,
},
{
  path: '/bubble',
  element: <Bubble />,
}
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>
    <Header/>
   <RouterProvider router={router}/>
   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
