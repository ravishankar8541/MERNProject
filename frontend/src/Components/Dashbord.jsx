import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import Context from '../context/Context'
import { useNavigate } from 'react-router-dom'

const Dashbord = () => {

  

  return (
    <div>
     
      <h1 className='bg-yellow-300 p-3'>Dashbord</h1>
      <div className='mx-[500px] my-[300px] text-6xl'>
        Welcome To Admin Panel
      </div>
    </div>
  )
}

export default Dashbord
