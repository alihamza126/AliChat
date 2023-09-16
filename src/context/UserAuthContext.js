import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase";

export const UserAuthContext = createContext();

export const UserAuthContextProvder = ({ children }) => {
    const [currentuser, setcurrentuser] = useState();
    
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setcurrentuser(user);
        });
        return () => {
            unsub();
        };
    }, []);

    return<UserAuthContext.Provider value={{currentuser}}>
        {children}
    </UserAuthContext.Provider>


};

