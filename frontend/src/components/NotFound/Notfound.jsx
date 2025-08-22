import React from 'react'
import { Link } from 'react-router-dom'

function Notfound() {
  return (
    <div>
    <h1 className='text-purple-600'>404 - Not Found!</h1>
    <Link className='text-pink-600' to="/">Go Home</Link>
    </div>
  )
}

export default Notfound