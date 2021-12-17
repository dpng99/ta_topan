import React from 'react';
import './App.css';
import FormSignup from './FormSignup';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import FormLogin from './FormLogin';
import Dashboard from './Page/Dashboard';
import {AuthProvider} from './Handler/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRouter from './PrivateRouter';
import Edit from './Page/Edit';
import AddData from './Page/AddData';
import Riwayat from './Page/Riwayat';
import Monitoring from './Page/Monitoring';
import { Container } from 'react-bootstrap';

function App() {

  return(
   <Router>
     <AuthProvider>
     <Switch>
     <PrivateRouter exact path="/" component={Dashboard}/>
      <PrivateRouter path="/edit" component={Edit} />
      <PrivateRouter path="/adddata" component={AddData} />
      <PrivateRouter path="/history" component={Riwayat} />
      <PrivateRouter path="/monitoring" component={Monitoring} />
     <Route path="/signup" component={FormSignup}/>
    <Route path="/login" component={FormLogin}/>
     </Switch>
     </AuthProvider>
   </Router>

  ) ;
  
  
}

export default App;
