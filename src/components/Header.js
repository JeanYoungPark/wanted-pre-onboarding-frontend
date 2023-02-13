import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  const [userToken, setUserToken] = useState(localStorage.getItem("access-token"));

  const handleLogout = () => {
    localStorage.removeItem("access-token");
    setUserToken('');
  }

  if(userToken){
    return (
      <header>
        <span onClick={handleLogout}>logout</span>
      </header>
    )
  }else{
    return (
      <header>
          <Link to="/signup">signup</Link>
          <Link to="/signin">signin</Link>
      </header>
    )
  }
}
