import firebase from "firebase";
import "firebase/storage";
import "firebase/auth";

const firebaseConfig: any = {
  apiKey: "AIzaSyDFSKou5WSdve1mVEPG7v49ipMrvmCNdi0",
  authDomain: "jobz-dd211.firebaseapp.com",
  projectId: "jobz-dd211",
  storageBucket: "jobz-dd211.appspot.com",
  messagingSenderId: "172882220943",
  appId: "1:172882220943:web:832e1257208e30cf65ddfa",
  measurementId: "G-DSJP3SXZY7",
};

export const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
