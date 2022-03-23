import Head from 'next/head'
import Image from 'next/image'
import FirebaseApp from '../../components/fire';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Home() {

  const doLogin = () => {
    const auth = getAuth();

    // Firebaseに登録したID,PASSWORD
    const email = '2022@omorisan.jp';
    const password = 'test1234';

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert( 'ログインok!' );
        console.log( '● user' );
        console.log( user );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  return (
    <div>
      <h1>Googleログイン</h1>
      <button onClick={doLogin}>googleでログインする</button>
    </div>
  )
}