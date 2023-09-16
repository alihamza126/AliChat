import React, { useContext } from 'react';
import videocall from '../img/icons8_video_call_32.png';
import user from '../img/icons8_user_32.png';
import more from '../img/icons8_more_32.png';
import Messeges from './Messeges';
import Input from './Input';
import { ChatContext } from '../ChatContext';


const Chatpanel = () => {
  const{data}=useContext(ChatContext);
  return (
    <div className="chatpanel">
      <div className="top-info">
          <div className="left">
          <span> <img src={data.user?.photoURL} alt="" /></span>
            <h3>{data.user?.displayName?.toUpperCase()}</h3>
          </div>
          <div className="right">
            <img src={videocall} alt="" />
            <img src={user} alt="" />
            <img src={more} alt="" />
          </div>
      </div>
      <Messeges/>
      <Input/>
    </div>
  )
}

export default Chatpanel