import React, { useContext, useState } from 'react'
import { collection, query, where, getDocs, doc, setDoc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { db } from '../Firebase';
import { UserAuthContext } from '../context/UserAuthContext';

const Searchbar = () => {
  const [username, setusername] = useState(''); //it value from search input
  const [user, setuser] = useState(''); // this is the selected user data


  const [err, seterr] = useState(false);
  const { currentuser } = useContext(UserAuthContext);


  const handlesearch = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", username));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setuser(doc.data());
      });
      if (querySnapshot.empty) {
        seterr(true)
      }
      if (!querySnapshot.empty) {
        seterr(false)
      }
    } catch (error) {
      // seterr(true);
      console.log("something is wrong");

    }
  }
  const handlekey = (e) => {
    e.code === 'Enter' && handlesearch();
  }
  /////////////////Handle select /////////////////
  const handleselect = async () => {
    const combineid = currentuser.uid > user.uid ? currentuser.uid + user.uid : user.uid + currentuser.uid;
    ;
    try {
      const res = await getDoc(doc(db, 'chats', combineid));
      if (!res.exists()) {
        //create new users chats collection
        await setDoc(doc(db, 'chats', combineid), { messages: [] });

        //after create user chat then update current user chat history if messege update
        await updateDoc(doc(db, 'usersChats', currentuser.uid), {
          [combineid + ".userinfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combineid + ".date"]: serverTimestamp()
        })
        await updateDoc(doc(db, 'usersChats', user.uid), {
          [combineid + ".userinfo"]: {
            uid: currentuser.uid,
            displayName: currentuser.displayName,
            photoURL: currentuser.photoURL,
          },
          [combineid + ".date"]: serverTimestamp()
        })
      }
    } catch (error) {
      seterr(true);
    }
    setusername('');
    seterr(false);
    setuser(null)

  }


  return (
    <div className="searchbar">
      <div className="input">
        <input type="text" name="search" value={username} onKeyDown={handlekey} onChange={(e) => setusername(e.target.value)} placeholder='find user...' />
      </div>
      {err && <span style={{ background: 'purple', fontWeight: 'bold', fontSize: '12px', color: 'white', textAlign: 'center', padding: '4px 0px', borderRadius: '10px', width: '90%', marginBottom: '5px' }}>Something wrong</span>}
      {user &&
        <div className="chat" onClick={handleselect}>
          <div className="chatcontainer">
            <div className="logo">
              <img src={user?.photoURL} alt="" />
            </div>
            <div className="info">
              <span>{user?.displayName}</span>
            </div>
          </div>
        </div>}
    </div>
  )
}

export default Searchbar