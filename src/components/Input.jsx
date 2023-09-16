import React, { useContext, useState } from 'react';
import attach from '../img/icons8_attach_32.png'
import img from '../img/icons8_pictures_folder_32.png'
import { ChatContext } from '../ChatContext';
import { UserAuthContext } from '../context/UserAuthContext';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../Firebase';
import { v4 as uuid } from 'uuid'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';

const Input = () => {
  const { data } = useContext(ChatContext);
  const { currentuser } = useContext(UserAuthContext);

  const [text, settext] = useState('');
  const [image, setimage] = useState(null);

  const handlesend = async (e) => {
    try {
      if (image) {
        const storageRef =ref(storage, uuid());
        const uploadTask =uploadBytesResumable(storageRef, image);
  
        uploadTask.on(
          (err) => {
            console.log("something went wrong");
          },
          () => {
            try {
              getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                console.log("downloadURL");
                await updateDoc(doc(db, 'chats', data.chatid), {
                  messages: arrayUnion({
                    id:uuid(),
                    text,
                    senderid: currentuser.uid,
                    date: Timestamp.now(),
                    image: downloadURL
                  })
                }).then(()=>{
                      console.log("object");
                }).catch((err)=>{
                    console.log("err");
                })
              })
            } catch (error) {
              
            }
          }
        )
  
      }
      else if (text) {
        await updateDoc(doc(db, 'chats', data.chatid), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderid: currentuser.uid,
            date: Timestamp.now()
          })
        });
        setimage(null);
        settext('')
      }
  
      ////update messages
      await updateDoc(doc(db, 'usersChats', currentuser.uid), {
        [data.chatid + ".lastmessage"]: {
          text,
        },
        [data.chatid + ".date"]: serverTimestamp()
      })
      await updateDoc(doc(db, 'usersChats', data.user.uid), {
        [data.chatid + ".lastmessage"]: {
          text,
        },
        [data.chatid + ".date"]: serverTimestamp()
      })
      setimage(null);
      settext('')
    } catch (error) {
        console.log("error is happen");
    }
  }
  return (
    <div className='input'>
      <input className='type' type="text" placeholder='Type Something...' value={text} onChange={(e) => settext(e.target.value)} />

      <div className="sendbox">
        <img src={attach} alt="" />
        <input type="file" id='file' style={{ display: 'none' }} onChange={(e) => setimage(e.target.files[0])} />
        <label htmlFor="file">
          <img src={img} alt="" />
        </label>
        {<button onClick={handlesend}>Send</button>}
      </div>
    </div>
  )
}

export default Input