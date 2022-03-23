import { initializeApp } from "firebase/app";

// ☆各プロジェクトの設定を記述
const firebaseConfig = {
  apiKey: "AIzaSyC26nB7zxjpZxbUNOnmqEq9w7U9IvRAcEU",
  authDomain: "fushigiame-e4032.firebaseapp.com",
  databaseURL: "https://fushigiame-e4032-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "fushigiame-e4032",
  storageBucket: "fushigiame-e4032.appspot.com",
  messagingSenderId: "1022664785702",
  appId: "1:1022664785702:web:206656dd194b37c469cbe7",
  measurementId: "G-C9V64WW7RG"
};

const FirebaseApp = initializeApp(firebaseConfig);

export default FirebaseApp