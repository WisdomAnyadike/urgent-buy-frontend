import React, { useEffect, useState } from 'react'
import '/src/Components/Cart-icon/carticon.styles.scss'
import { useDispatch } from 'react-redux'
import { setDropOpen } from '../Redux/Dropdownslice'
import { useSelector } from 'react-redux'





const Carticon = () => {
const dispatch = useDispatch()
const cartArr = useSelector(state => state.DropSlicer.cartArr)




  return (
    <div className='cart-icon-container' onClick={()=> dispatch(setDropOpen())}>



<svg className='shopping-icon' xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 16 16"><path fill="#000" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607L1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4a2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4a2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2a1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2a1 1 0 0 1 0-2"/></svg>
 <span className='item-count' style={{color:'red'}}> {cartArr.reduce((a,b)=> a + b.quantity , 0)} </span>
     

     

    </div>
  )
}

export default Carticon