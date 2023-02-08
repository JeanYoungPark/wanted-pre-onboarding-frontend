import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div>
        <Link to="/signup">signup</Link>
        <Link to="/signin">signin</Link>
    </div>
  )
}
