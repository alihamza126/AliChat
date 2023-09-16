import { signOut } from 'firebase/auth'
import React, { useContext, useEffect } from 'react'
import { UserAuthContext } from '../context/UserAuthContext'
import { auth } from '../Firebase'
import { Link, Navigate } from 'react-router-dom'

const Navbar = () => {
  const { currentuser } = useContext(UserAuthContext);
  return (
    <div className="navbar">
      <div className="left">
        <h3 className='logo'>Ali Chat</h3>
      </div>
      <div className="right">
        <span><img src={currentuser?.photoURL} alt="" /></span>
        <h5 className='username'>{(currentuser)?currentuser.displayName:<Link to='/login'>Login</Link>} </h5>
        <button onClick={() =>{
          if(window.confirm("Are You sure ? Logout")){
          signOut(auth);
          <Navigate to='login'/>
          }
          }}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar