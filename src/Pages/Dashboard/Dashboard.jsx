import React from 'react'
import DirectoryPage from '../../Components/Directory Page/DirectoryPage'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const newObject = useSelector(state => state.Userslice.userObj)
  console.log(newObject);
  

  return (
   <DirectoryPage/>
  )
}

export default Dashboard