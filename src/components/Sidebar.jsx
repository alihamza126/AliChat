import React from 'react'
import Navbar from './Navbar';
import Searchbar from './Searchbar'
import Chat from './Chat';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Navbar/>
      <Searchbar/>
      <Chat/>
    </div>
  )
}

export default Sidebar