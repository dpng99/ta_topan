import React, {useContext, useEffect,useState} from 'react'
import {auth} from './Firebase'

export function useAuth(){
    return useContext(AuthContext)
}
const AuthContext = React.createContext();
export default function AuthProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState();
    function signup(email, password) {
        auth.createUserWithEmailAndPassword(email, password)
    }
    function login(email, password) {
        return auth.singInWithEmailAndPassword(email, password)
    }
  useEffect(() => {
   const unsubs = auth.onAuthStateChange(user =>{
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
