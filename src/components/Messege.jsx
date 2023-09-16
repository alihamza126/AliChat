import React, { useContext, useEffect, useRef } from 'react'
import img from '../img/myimage.jpg'
import { ChatContext } from '../ChatContext'
import { UserAuthContext } from '../context/UserAuthContext';

const Messege = ({message}) => {
  const { data } = useContext(ChatContext);
  const { currentuser } = useContext(UserAuthContext);

  const ref=useRef();
  useEffect(() => {
    // ref.current?.scrollIntoView({ block: "end" });
    ref.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });;
  }, [message])


  return (
    <div>
      {
        <div ref={ref} className={`messege ${message?.senderid === data?.user?.uid && 'owner'}`}>
          <div className="messegeinfo">
            <img
              src={message?.senderid == currentuser?.uid ? currentuser?.photoURL : data.user?.photoURL}
              alt="loading" />
            <p>{`${message?.date.toDate().getHours().toString()}:${message?.date.toDate().getMinutes().toString()}`}</p>
          </div>
          <div className="messegecontent">
            <p>{message?.text}</p>
            <img src={message?.image} alt="" />
          </div>
        </div>
      }
    </div>
  )
}

export default Messege