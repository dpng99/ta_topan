// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const app = firebase.initializeApp ({
  apiKey: "AIzaSyBF04Q6Q8_wcetPnOZAWrMCqv4vQnL40Vw",
  authDomain: "dashboardpdam.firebaseapp.com",
  projectId: "dashboardpdam",
  storageBucket: "dashboardpdam.appspot.com",
  messagingSenderId: "452860758380",
  appId: "1:452860758380:web:c920f02443ae82ddac0b49"
});

// Initialize Firebase
  
export const auth = app.auth();
export default app;
// signup router
