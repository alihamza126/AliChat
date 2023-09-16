import React, { useState } from 'react'
import './login.scss'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../Firebase';
const Login = () => {

    const navigate = useNavigate()

    const [err, seterr] = useState(false);
    const [errorState, seterrorState] = useState('');
    const [loginstatus, setlogin] = useState("Sign in");

    const handlelogin = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;


        // ==================================================================================================
        try {
            await signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    navigate('/')
                })
                .catch((error) => {
                    seterr(true)
                    seterrorState(error.code);
                    setlogin("Sign in")
                });
        } catch (error) {
            seterr(true)
            seterrorState(error.code);
            setlogin("Sign in")
        }
    }

    /* This is for create new user End*/
    return (
        <div className="login-container">
            <div className="loginwrapper">
                <div className="loginheading">
                    <p>Ali Chart</p>
                    <p>Login</p>
                </div>
                <form onSubmit={handlelogin}>
                    <input type="email" placeholder='Enter email ....' />
                    <input type="password" placeholder='Enter Password ....' />
                    <button type="submit" onClick={()=>setlogin("Please Wait...")}>{loginstatus}</button>
                </form>
                {err && <span style={{ color: 'green' }}>{errorState}</span>}
                <span>Don't have already account <Link to='/signup'>Sign up</Link></span>
            </div>
        </div>
    )
}

export default Login