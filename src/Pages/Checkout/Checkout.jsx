import React, { useState } from 'react'
import '/src/Pages/Checkout/checkout.styles.scss'
import { useSelector , useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { decreaseQuantity, emptyCart, removeItem, setCartArr } from '../../Components/Redux/Dropdownslice'
import Button from '../../Components/Buttons/Button'
import { PaystackButton } from 'react-paystack'




const Checkout = () => {
 
  
    
    const dispatch = useDispatch()

    const cartArr = useSelector(state => state.DropSlicer.cartArr)
    const {Email} = useSelector(state => state.Userslice.userObj)
 
    let [arr, setArr] = useState([])
    useEffect(()=> {   
        setArr(cartArr)
    }, [arr ,cartArr])
   
const isEmpty = cartArr.length === 0;




let total = arr.reduce((a,b)=> a + (b.productPrice * b.quantity) , 0 )

const publicKey = 'pk_test_9a558288d1670a641dafa6f4e899ddb24f2fe749'; // Your Paystack public key
  const amount = total * 100; 

  const componentProps = {
    email: Email ,
    amount,
    metadata: {
      productName:'wisdom',
      phone:"+2348164934974",
    },
    publicKey,
    text: "Pay with Paystack",
    onSuccess: () =>
        dispatch(emptyCart()) ,
    onClose: () => alert("Wait! You need this clothes, don't go!!!!"),
   
  }


  return (

  
    <div className="d-flex justify-content-center flex-wrap align-items-start w-100 row " style={{marginTop:"100px" , marginBottom:"50px"}}>
      <div className="col-md-7 ms-2">
        <div className="card mb-4 me-3 ">
          <div className="card-header py-3">
            <h6 className="mb-0">Cart - {arr.length}</h6>
          </div>
          <div className="card-body">
           
       { isEmpty ? <small> Your Cart is Empty </small> : arr.map(({_id,productName , productImage , quantity , productPrice})=> 
        <div className="row mb-2">
              <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
               
                <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                  <img width={200} height={250} src={productImage}
                    className="w-100 rounded" alt={`${productName}`} />
                  <a href="#!">
                    <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.2)"}}></div>
                  </a>
                </div>
                
              </div>

              <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                
                <p><strong> {productName} </strong></p>
                <p>Color: blue</p>
                <p>Size: M</p>
                <button type="button" className="btn text-light btn-sm me-1 mb-2" style={{backgroundColor:'#212529'}} data-mdb-toggle="tooltip"
                  title="Remove item"   onClick={()=> dispatch(removeItem({_id,productName , productImage , quantity , productPrice}))}>
                
                  <i className="fas fa-trash"></i>
                </button>
              
                
              </div>

              <div className="col-lg-4 col-md-6 mb-4 mb-lg-0 ">
                
                <div className="d-flex mb-4" style={{maxWidth: "300px" }}>
                  <button className="btn text-light  me-2"
                  style={{backgroundColor:'#212529'}}
                  onClick={()=> dispatch(decreaseQuantity({_id,productName , productImage , quantity , productPrice}))}>
                    <i className="fas fa-minus"></i>
                  </button>

                  
                    <small  min="0" className='d-flex align-items-center justify-content-center' style={{width:"50px"}} >  { quantity} </small>
                    
                  

                  <button className="btn text-light  ms-2"
                  style={{backgroundColor:'#212529'}}
                    onClick={()=> dispatch(setCartArr({_id,productName , productImage , quantity , productPrice}))}>
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
                

                
                <p className="text-start text-md-center">
                  <strong>N{productPrice  * quantity}.00</strong>
                </p>
                
              </div>
            </div>)}
            

            <hr className="my-4" />

            
            
               

           
            
            
          </div>
        </div>
        <div className="card mb-2">
          <div className="card-body">
            <p><strong>Expected shipping delivery</strong></p>
            <p className="mb-0">12.10.2020 - 14.10.2020</p>
          </div>
        </div>
        <div className="card mb-4 mb-lg-0">
          <div className="card-body">
            <p><strong>We accept</strong></p>
            <img className="me-2" width="45px"
              src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
              alt="Visa" />
            <img className="me-2" width="45px"
              src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
              alt="American Express" />
            <img className="me-2" width="45px"
              src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
              alt="Mastercard" />
            <img className="me-2" width="45px"
              src="https://e7.pngegg.com/pngimages/711/9/png-clipart-paypal-logo-brand-font-payment-paypal-text-logo.png"
              alt="PayPal acceptance mark" />
          </div>
        </div>
      </div>
      <div className="col-md-4 mb-5 ms-2" >
        <div className="card mb-4">
          <div className="card-header py-3">
            <h6 className="mb-0">Summary</h6>
          </div>
          <div className="card-body">
            <ul className="list-group list-group-flush">
              <li
                className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                Products
                <span>N{total}.00</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                Shipping
                <span>Gratis</span>
              </li>
              <li
                className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                <div>
                  <strong>Total amount</strong>
                  <strong>
                    <p className="mb-0">(including VAT)</p>
                  </strong>
                </div>
                <span><strong>N{total}.00</strong></span>
              </li>
            </ul>

 

  
<PaystackButton   className="paystack-button rounded paycolor" {...componentProps} /> 

           
          </div>
        </div>
      </div>
    </div>
  

  )
}

export default Checkout