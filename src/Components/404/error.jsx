import React from 'react'
import '/src/Components/404/error.styles.scss'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div className="c">
    <div className="drope drop1"></div>
    <div className="drope drop2"></div>
    <div className="text-c ">
      <h2 className='theH1'> Page Not Found </h2>
      <p className='theH3'> 404 error</p>
     <Link to={'/'}> <button className='btn btn-dark thebutton'> Go back </button> </Link>
    </div>
  </div>
  )
}

export default Error