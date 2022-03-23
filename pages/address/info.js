import { useState, useEffect } from 'react';
import Layout from '../../components/layout';
import { getFirestore, collection, query, orderBy, doc, addDoc, updateDoc, getDoc, getDocs } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/router';
import '../../components/fire';

const db = getFirestore();
const auth = getAuth();

export default function Info() {
  const [message, setMessage] = useState('address info');
  const [cmt, setCmt] = useState('');
  const [mydata, setMydata] = useState(null);
  const [msgdata, setMsgdata] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (auth.currentUser == null) {
      //router.push('/address');
    }
  }, []);

  const onChangeCmt = (e => {
    setCmt(e.target.value);
  });

  const doAction =(_ => {
    const t = new Date().getTime();
    const to = {
      comment: 'To: ' + cmt,
      time: t
    };
    const from = {
      comment: 'From: ' + cmt,
      time: t
    };
    addDoc(collection(db, 'address', auth.currentUser.email, 'address', router.query.id, 'message'), to).then(_ => {
      addDoc(collection(db, 'address', router.query.id, 'address', auth.currentUser.email, 'message'), from).then(_ => {
        updateDoc(doc(db, 'address', router.query.id, 'address', auth.currentUser.email), {flag: true}).then(_ => {
          router.push('/address');
        });
      });
    });
  });

  const goBack = _ => {
    router.push('/address');
  };

  useEffect(() => {
    if (auth.currentUser != null) {
      getDoc(doc(db, 'address', auth.currentUser.email, 'address', router.query.id)).then(snapshot => {
        setMydata(snapshot.data());
      });
      getDocs(query(collection(db, 'address', auth.currentUser.email, 'address', router.query.id, 'message'), orderBy('time', 'desc'))).then(snapshot => {
        const data = [];
        snapshot.forEach(document => {
          data.push(
            <li className="list-group-item px-3 py-1" key={document.id}>
              {document.data().comment}
            </li>
          );
        });
        setMsgdata(data);
      });
      updateDoc(doc(db, 'address', auth.currentUser.email, 'address', router.query.id), {flag: false});
    } else {
      setMessage("no data");
    }
  }, [message]);

  return <>
    <Layout header="Next.js" title="Info & messages.">
      <div className="alert alert-primary text-center">
        <h5 className="mb-4">{message}</h5>
        <div className="text-left">
          <div>
            <div>Name: {mydata != null ? mydata.name : ''}</div>
            <div>Mail: {mydata != null ? mydata.mail : ''}</div>
            <div>Tel: {mydata != null ? mydata.tel : ''}</div>
            <div>Memo: {mydata != null ? mydata.memo : ''}</div>
          </div>
          <hr />
          <div className="form-group">
            <label>Message:</label>
            <input type="text" onChange={onChangeCmt} className="form-control" />
          </div>
        </div>
        <button onClick={doAction} className="btn btn-priary">
          Send Message
        </button>
        <button onClick={goBack} className="btn">
          Go Back
        </button>
      </div>
      <ul className="list-group">
        {msgdata}
      </ul>
    </Layout>
  </>;
}