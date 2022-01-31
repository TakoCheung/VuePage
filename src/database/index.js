import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyD_9RNnamADkyg26XHmGBkCI9I4MHx56GM",
  authDomain: "personalpagechat.firebaseapp.com",
  projectId: "personalpagechat",
  storageBucket: "personalpagechat.appspot.com",
  messagingSenderId: "575992347700",
  appId: "1:575992347700:web:38b6b3a89dcb3c96b81e61",
  measurementId: "G-9HX6M69YBD"
};

initializeApp(firebaseConfig)

export const firestoreDb = getFirestore()
export const realtimeDb = getDatabase()
export const storage = getStorage()
