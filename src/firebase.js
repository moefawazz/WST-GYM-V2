import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAqLmdJGseKYeZnSc4lhZkXfpqWTb1NErQ",
    authDomain: "wst-gym-web.firebaseapp.com",
    projectId: "wst-gym-web",
    storageBucket: "wst-gym-web.appspot.com",
    messagingSenderId: "762502074683",
    appId: "1:762502074683:web:be977c3d5f29f99a4b671e"
  };


  const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db=getFirestore(app)