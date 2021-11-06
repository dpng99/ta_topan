import React, {useContext, useEffect,useState} from 'react'
import {auth} from '../Firebase'


const AuthContext = React.createContext();
export function useAuth(){
    return useContext(AuthContext);
}
export function AuthProvider({ children }) {

    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState();
    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }
  useEffect(() => {
   const unsubs = auth.onAuthStateChanged(user =>{
    setLoading(false);    
    setCurrentUser(user)

    })
      return unsubs
  }, [])
    const value = {
            currentUser,
            login,
            signup
    }
    return (
        <AuthContext.Provider value={value} >
            {!loading  && children }
        </AuthContext.Provider>
    )
}
