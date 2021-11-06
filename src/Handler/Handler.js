import React, {useContext, useEffect,useState} from 'react'
import {auth} from './Firebase'
export function useAuth(){
    return useContext(AuthContext)
}
const AuthContext = React.createContext();
export default function Handler({ children }) {
    const [currentUser, setCurrentUser] = useState();
    function signUp(email, password) {
        auth.createUserWithEmailAndPassword(email, password)
    }
  useEffect(() => {
   const unsubs = auth.onAuthStateChange(user =>{
        setCurrentUser(user)
    })
      return unsubs
  }, [])
    const value = {
            currentUser
    }
    return (
        <AuthContext.handler value={value} >
             
        </AuthContext.handler>
    )
}
