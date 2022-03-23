import { useState, useEffect } from 'react';
import Layout from '../../components/layout';
import { getAuth, GoogleAuthProvider, signOut, signInWithPopup } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { useRouter } from 'next/router';
import '../../components/fire';

const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

signOut(auth);

export default function Index() {
  let addresses = [];
  const [user, setUser] = useState(null);
  const [data, setData] = useState(addresses);
  const [message, setMessage] = useState('please login...');
  const router = useRouter();

  const [mysql, setMysql] = useState('none');
  

  const login = () => {
    signInWithPopup(auth, provider).then(result => {
      setUser(result.user.displayName);
      setMessage('logined: ' + result.user.displayName);
    }).catch(_ => {
      setUser('NONE');
      setMessage('not logined.');
    });
  };

  const logout = () => {
    signOut(auth);
    setUser(null);
    addresses = [];
    setData(addresses);
    setMessage('logout');
  };

  const doLogin = _ => {
    if (auth.currentUser == null) {
      login();
    } else {
      logout();
    }
  };

  const doAction = _ => {
    router.push('/address/add');
  };

  const doLink = e => {
    const id = e.target.id;
    router.push('/address/info?id=' + id);
  };

  useEffect(() => {
    if (auth.currentUser != null) {
      setUser(auth.currentUser.displayName);
      setMessage(auth.currentUser.displayName + 'さんの登録アドレス');
      getDocs(collection(db, 'address', auth.currentUser.email, 'address')).then(snapshot => {
        snapshot.forEach(document => {
          const doc = document.data();
          addresses.push(
            <li className="list-group-item list-group-item-action p-1" onClick={doLink} key={document.id} id={document.id}>
              {doc.flag ? '√' : ''}{doc.name} ({doc.mail})
            </li>
          );
        });
        setData(addresses);
      });
    } else {
      addresses.push(
        <li key="1">can&apos;t get data.</li>
      );
    }
  }, [message]);

  useEffect(() => {
    setMysql(process.env.NEXT_PUBLIC_TEST);
  });

  return <>
    <Layout header="Next.js" title="Address book.">
      <p>my:{mysql}</p>
      <div className="alert alert-primary text-center">
        <h6 className="text-right" onClick={doLogin}>
          LOGINED: {user}
        </h6>
        <h5 className="mb-4">{message}</h5>
        <ul className="list-group">
          {data}
        </ul>
        <hr />
        <button className="btn btn-primary" onClick={doAction}>Add address</button>
      </div>
    </Layout>
  </>;
}