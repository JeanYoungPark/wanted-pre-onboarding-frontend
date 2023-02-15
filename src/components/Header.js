import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const location = useLocation();
  const [userLocation, setUserLocation] = useState(location.pathname);

  return (
    <header>
        <Link to="/signup" className={userLocation === 'signup' ? 'on' : ''} onClick={() => setUserLocation('signup')}>signup</Link>
        <Link to="/signin"  className={userLocation === 'signin' ? 'on' : ''} onClick={() => setUserLocation('signin')}>signin</Link>
    </header>
  )
}
