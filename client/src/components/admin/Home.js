import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
    <div className='text-6xl text-purple-400 p-3 ml-36 mt-24'>Home Page</div>
    <p className='text-xl font-medium p-2 ml-3' ><Link to={'/admin/login'}>Login</Link></p>
    <p className='text-xl font-medium p-2 ml-3'><Link to={'/admin/register'}>Register</Link></p>
    </>
  )
}

export default Home;