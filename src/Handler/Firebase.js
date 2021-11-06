import firebase from 'firebase/compat/app'
import "firebase/compat/auth"

const app =  firebase.initializeApp( {

    apiKey: "AIzaSyCJbBRTc7J_adsCHqUtBl8UW1PF1mlFfXo",
  
    authDomain: "tugas-49312.firebaseapp.com",
  
    databaseURL: "https://tugas-49312.firebaseio.com",
  
    projectId: "tugas-49312",
  
    storageBucket: "tugas-49312.appspot.com",
  
    messagingSenderId: "371105516029",
  
    appId: "1:371105516029:web:eb4e636ca6358b525cb194"
  
  });
  
export const auth = app.auth()

export default app;
// signup router
