import React, { useContext, useEffect, useState } from 'react';
import Messege from './Messege';
import { ChatContext } from '../ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../Firebase';

const Messeges = () => {
  const [message, setmessage] = useState([]);
  const { data } = useContext(ChatContext);
  useEffect(() => {
    try {
      const unsub = onSnapshot(doc(db, 'chats', data?.chatid), (doc) => {
        doc.exists && setmessage(doc.data()?.messages);
      })
      return () => {
        unsub();
      }
    } catch (error) {

    }
  }, [data?.chatid])
  console.log(message);
  return (
    <div className="messeges">
      {
        message?.map((m) =>
        <Messege  message={m} key={m?.id} />
      )}
    </div>
  )
}

export default Messeges