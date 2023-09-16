import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserAuthContextProvder } from './context/UserAuthContext';
import { ChatContextProvder } from './ChatContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <UserAuthContextProvder>
      <ChatContextProvder>
         <React.StrictMode>
            <App />
         </React.StrictMode>
      </ChatContextProvder>
   </UserAuthContextProvder>
);

// If you want to start measuring performance in your app, pass a function
// to log r esults (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
