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
function App() {

  return(
   <Router>
     <AuthProvider>
     <Switch>
     <PrivateRouter exact path="/" component={Dashboard}/>
      <PrivateRouter path="/edit" component={Edit} />
     <Route path="/signup" component={FormSignup}/>
    <Route path="/login" component={FormLogin}/>
     </Switch>
     </AuthProvider>
   </Router>
  ) ;
  
  
}

export default App;
