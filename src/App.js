import React from 'react';
import './App.css';
import FormSignup from './FormSignup';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import FormLogin from './FormLogin';
import Dashboard from './Page/Dashboard';
import {AuthProvider} from './Handler/AuthContext';
function App() {

  return(
   <Router>
     <AuthProvider>
     <Switch>
     <Route exact path="/" component={Dashboard}/>
     <Route path="/signup" component={FormSignup}/>
    <Route path="/login" component={FormLogin}/>
     </Switch>
     </AuthProvider>
   </Router>
  ) ;
  
  
}

export default App;
