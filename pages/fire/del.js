import { useState, useEffect } from 'react';
import Layout from '../../components/layout';
import '../../components/fire';
import { getFirestore, doc, getDoc, deleteDoc } from 'firebase/firestore/lite';
import { useRouter } from 'next/router';

const db = getFirestore();

export default function Delete() {
  const [message,setMessage] = useState('wait');
  const [data, setData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (router.query.id != undefined) {
      setMessage('Delete id = ' + router.query.id);
      getDoc(doc(db, 'mydata', router.query.id)).then(ob => {
        setData(ob.data());
      });
    } else {
      setMessage(message +'.');
    }
  }, [message]);

  const doAction = () => {
    deleteDoc(doc(db, 'mydata', router.query.id)).then(_ => {
      router.push('/fire');
    });
  };

  return <>
    <Layout header="Next.js" title="Top page.">
      <div className="alert alert-primary text-center">
        <h5 className="mb-4">{message}</h5>
        <pre className="card p-3 m-3 h5 text-left">
          Name: {data != null ? data.name : '...'}<br />
          Mail: {data != null ? data.mail : '...'}<br />
          Age: {data != null ? data.age : '...'}
        </pre>
        <button onClick={doAction} className="btn btn-primary">
          Delete
        </button>
      </div>
    </Layout>
  </>;
}