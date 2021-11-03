import React from 'react';
import './App.css';
import Form from './Form';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import FormLogin from './FormLogin';
import Dashboard from './Page/Dashboard';

function App() {
  
  return(
   <Router>
     <Switch>
     <Route path="/" exact component={() => <Form />} />
          <Route path="/login" exact component={() => <FormLogin />} />
          <Route path="/dashboard" exact component={() => <Dashboard />} />

     </Switch>
   </Router>
  ) ;
  
  
}

export default App;
