import React from 'react'
import '/src/Components/Cart-items/cart-item.styles.scss'

const Cartitems = ({cartItem: {_id , productName , productPrice , quantity , productImage}}) => {
   
  return (
    <div className='cart-item-container'>
    <img src={productImage} alt={`${productName}`} />
    
    <div className='item-details'> 
    <h2 className='name'> {productName}</h2>
    <span className='price'> <i> {quantity}  x N{productPrice}  </i>  &nbsp; <b>N{ Number(quantity) * Number(productPrice)} </b></span> 
    </div>
   
    
    </div>
  )
}

export default Cartitems