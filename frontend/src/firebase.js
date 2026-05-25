import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAh0-htK1Wyqmgk96V-hf0J0RXK1HsH6Pc",
    authDomain: "todo-mern-app-b6183.firebaseapp.com",
    projectId: "todo-mern-app-b6183",
    storageBucket: "todo-mern-app-b6183.firebasestorage.app",
    messagingSenderId: "1097630798772",
    appId: "1:1097630798772:web:355620fd083c8c731018e1",
    measurementId: "G-Y0PF1GTK1J"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);