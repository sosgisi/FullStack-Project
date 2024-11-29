// Import the functions you need from the SDKs you need
import.meta.env.VITE_TEST_VAR
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const env = import.meta.env

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_AUTH_DOMAIN,
  projectId: env.VITE_PROJECT_ID,
  storageBucket: env.VITE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_MESSAGING_SENDER_ID,
  appId: env.VITE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const signUp = async(email, password) => {
  try{
    await createUserWithEmailAndPassword(auth, email, password)
    await setDoc(doc(db, 'users', email), {
      savedMovies: []
    })
    // await addDoc(collection(db, 'users', email), {
    //   savedMovie: []
    // })
    // return signUpUser
    return [{}]
  }catch(error){
    console.log('error: ', error.message)
    return `${error.message}`
  }
}

const signIn = async(email, password) => {
  try{
    return await signInWithEmailAndPassword(auth, email, password)
  }catch(error){
    return error.message
  }
}

const logOut = () => {
  signOut(auth)
}

export { auth, db, signUp, signIn, logOut }