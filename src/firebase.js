import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyDaoxJgBqYHvYzgOSBeTspFxmgoRqp4ZpU",
  authDomain: "slack-clone-a4c72.firebaseapp.com",
  projectId: "slack-clone-a4c72",
  storageBucket: "slack-clone-a4c72.appspot.com",
  messagingSenderId: "79986972473",
  appId: "1:79986972473:web:4f3f9994d45a319596bae8",
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

export const db = firebaseApp.firestore()

export const auth = firebase.auth()

export const provider = new firebase.auth.GoogleAuthProvider()

export const storage = firebase.storage()
