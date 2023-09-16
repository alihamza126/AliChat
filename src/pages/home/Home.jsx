import React from 'react';
import './home.scss'
import Sidebar from '../../components/Sidebar';
import Chatpenel from '../../components/Chatpanel'

const Home = () => {
  return (
    <div className="home">
        <div className="homecontainer">
            <Sidebar/>
            <Chatpenel/>
        </div>
    </div>
  )
}

export default Home