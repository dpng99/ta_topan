import { initializeApp } from 'firebase/app'
import { getFirestore} from '@firebase/firestore'
import 'firebase/auth'
const config =  {

    apiKey: "AIzaSyCJbBRTc7J_adsCHqUtBl8UW1PF1mlFfXo",
  
    authDomain: "tugas-49312.firebaseapp.com",
  
    databaseURL: "https://tugas-49312.firebaseio.com",
  
    projectId: "tugas-49312",
  
    storageBucket: "tugas-49312.appspot.com",
  
    messagingSenderId: "371105516029",
  
    appId: "1:371105516029:web:eb4e636ca6358b525cb194"
  
  };
  
const app = initializeApp(config);
export const db = getFirestore(app);
export const auth = app.auth();
export default app;
// signup router
