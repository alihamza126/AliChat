import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { auth } from "./Firebase";
import { UserAuthContext } from "./context/UserAuthContext";

export const ChatContext = createContext();

export const ChatContextProvder = ({ children }) => {
    const { currentuser } = useContext(UserAuthContext);
    const initalState = {
        user: {},
        chatid: "null"
    }
    const chatReducer = (state, action) => {
        switch (action.type) {
            case 'change-user':
                return {
                    user: action.payload,
                    chatid:
                        currentuser.uid > action.payload.uid ?
                            currentuser.uid + action.payload.uid :
                            action.payload.uid + currentuser.uid
                }
            default:
                return state;
        }
    }


    const [state,dispatch]=useReducer(chatReducer,initalState)
    return <ChatContext.Provider value={{data:state,dispatch}}>
        {children}
    </ChatContext.Provider>


};

