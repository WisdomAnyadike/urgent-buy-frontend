import React, { useState } from 'react'
import Button from '../Buttons/Button'
import '/src/Components/Cart -dropdown/cartdrop.styles.scss'
import Cartitems from '../Cart-items/Cart-items'
import { useSelector , useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setDropOpen } from '../Redux/Dropdownslice'



const CartDropdown = () => {
const dispatch = useDispatch()

const cartArr = useSelector(state => state.DropSlicer.cartArr)
 

const isEmpty = cartArr.length === 0;

  return (
    <div className='cart-dropdown-container rounded'>
    <div className='cart-items'>

{ isEmpty ? <small> Your cart is empty </small> : cartArr.map((cartItem)=> 

<Cartitems  key={cartItem._id}  cartItem={cartItem}/>

)  }

    
    </div>

    <Link className='d-flex align-items-center w-100 ms-3'  to='/checkout'> <Button func={()=> dispatch(setDropOpen())} buttonType={'normal-button'} styles={{color:'#fd1f6f'}} >
    CHECKOUT 
    </Button> </Link> 
    


    </div>
  )
}

export default CartDropdown