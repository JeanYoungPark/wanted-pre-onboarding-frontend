import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const location = useLocation();

  return (
    <header>
        <Link to="/signup">signup</Link>
        <Link to="/signin">signin</Link>
    </header>
  )
}
