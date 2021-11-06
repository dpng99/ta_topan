import React,{useState, useEffect} from 'react';
import './App.css';
import Form from './Form';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import FormLogin from './FormLogin';
import Dashboard from './Page/Dashboard';
import { db } from './Handler/Firebase';
import { collection, getDocs } from 'firebase/firestore'
function App() {
  const [user, setUser] = useState([]);
  const userCollectionRef = collection(db, "users");
  useEffect(() => {
   const getUser = async () => {
      const data = await getDocs(userCollectionRef)
      setUser(data.docs.map((doc)=> ({...doc.data(), id: doc.id})));
    }
    getUser();
  }, [])
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
