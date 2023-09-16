import React, { useContext, useEffect, useState } from 'react';
import img from '../img/icons8_image_32.png'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../Firebase';
import { UserAuthContext } from '../context/UserAuthContext';
import { ChatContext } from '../ChatContext';

const Chat = () => {

    const [userchat, setuserchat] = useState('');
    const { currentuser } = useContext(UserAuthContext);
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "usersChats", currentuser.uid), (doc) => {
                setuserchat(doc.data());
            });
            return () => {
                unsub();
            }
        }
        currentuser.uid && getChats()
    }, [currentuser.uid])

    const handleselect=(u)=>{
            dispatch({type:"change-user",payload:u})
    }
    return (
        <div className="chat">
            {Object.entries(userchat)?.sort((a,b)=>b[1]?.date-a[1]?.date).map((chat) => (
                <div className="chatcontainer" key={chat[0]} onClick={()=>handleselect(chat[1]?.userinfo)}>
                    <div className="logo">
                        <img width={40} src={chat[1]?.userinfo?.photoURL} alt="image is loading" />
                    </div>
                    <div className="info">
                        <span>{chat[1]?.userinfo?.displayName}</span>
                        <div>{chat[1]?.lastmessage?.text}</div>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default Chat