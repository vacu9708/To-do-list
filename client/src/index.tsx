import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LoginSingup from './pages/LoginSingup';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Switch, Route } from "react-router-dom";
//import { Route } from "react-router";
import RequireAuth from "./components/user/RequireAuth";
import Dashboard from "./pages/Dashboard";
import EditProfile from './pages/EditProfile';
import Naver_OAuth from './pages/Naver_OAuth';
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LoginSingup}/>
        <Route exact path="/dashboard" component={RequireAuth(Dashboard)} />
        <Route exact path="/edit_profile" component={EditProfile}/>
        <Route exact path="/naver/OAuth/callback" component={Naver_OAuth}/>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
