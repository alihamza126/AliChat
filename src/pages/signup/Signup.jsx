import React, { useContext } from 'react'
import './signup.scss';
import img from '../../img/icons8_image_32.png'
import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { storage, db, auth } from '../../Firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from 'react-router-dom';
import { UserAuthContext } from '../../context/UserAuthContext';


const Signup = () => {
    const [signupstatus, setsignup] = useState("Sign up");
    const { currentuser } = useContext(UserAuthContext);
    const navigate = useNavigate()

    const [err, seterr] = useState(false);
    const [prog, setprog] = useState(0);
    const [errorState, seterrorState] = useState('');
    const [imagepath, setimagepath] = useState(img);

    const handlesubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value.toLowerCase();
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        // ==================================================================================================
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);

            const storageRef = ref(storage, displayName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            await uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setprog(progress);
                    seterrorState("Data is processing");
                },
                (error) => {
                    seterr(true);
                    seterrorState("uploading image failed");
                    setsignup("Sign up")
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        }
                        ).then(async () => {
                            await setDoc(doc(db, "users", displayName), {
                                uid: res.user.uid,
                                displayName,
                                email,
                                photoURL: downloadURL,
                                password:password
                            })
                            await setDoc(doc(db, "usersChats", res.user.uid), {})
                            seterr(true);
                            seterrorState("Congratulations all is done");
                            setimagepath(downloadURL)
                            setTimeout(() => {
                                if (!errorState) {
                                    navigate("/")
                                }
                            });
                        }).catch((error) => {
                            seterr(true)
                            seterrorState(error.code);
                            setsignup("Sign up")
                        });
                    });
                }
            );
        } catch (error) {
            seterr(true)
            seterrorState(error.code);
            setsignup("Sign up")
        }

        /* This is for create new user End*/


    }
    return (
        <div className='signupcontainer'>
            <div className="signupwrapper">
                <div className="loginheading">
                    <p>Ali's Chat</p>
                    <p>Login</p>
                </div>
                <form onSubmit={handlesubmit}>
                    <input type="text" placeholder='Display name ....' />
                    <input type="email" placeholder='Enter email ....' />
                    <input type="password" autoComplete="suggested:{ 'current-password','aliHamza'}" placeholder='Enter Password ....' />
                    <input style={{ display: 'none' }} type="file" id='file' />
                    <label htmlFor="file">
                        <img className='img' src={imagepath} alt="" />
                        Pick an Avatar</label>
                    <button type="submit" onClick={()=>setsignup("Please Wait...")}>{signupstatus}</button>
                </form>
                {prog > 0 && <span style={{ color: 'greenyellow', fontWeight: 'bold' }}>{parseInt(prog)} % image upload</span>}
                {err && <span style={{ color: 'green' }}>{errorState}</span>}
                <span>already have account <Link to='/login'>login</Link></span>
            </div>
        </div>
    )
}

export default Signup