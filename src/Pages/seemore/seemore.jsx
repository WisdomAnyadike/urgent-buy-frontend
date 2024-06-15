import React from 'react';
import '/src/Pages/seemore/seemore.styles.scss'
import { Button } from 'antd';
import Ads from '../../Components/ad/ads';
import { useSelector,useDispatch } from 'react-redux';
import { setCartArr } from '../../Components/Redux/Dropdownslice';
import { Link } from 'react-router-dom';
import FormattedNumber from '../../Components/numberFormatter/numFormattter';





const ProductShowcase = () => {

  const cartObj = useSelector(state => state.itemSlice.cartObj)
  const dispatch = useDispatch()
  const { _id ,productName , productPrice , productImage , productDescription} = cartObj


  const handleCart = (_id, productName, productImage, productPrice) => {
    const cartObject = {
        _id,
        productName,
        productImage,
        productPrice,
        quantity: 1,
    }

    dispatch(setCartArr(cartObject))

}

  

  return (
    <>
      <Ads />
      <div className="con mt-1">


        <div className="rounded cardo shadow-none border-0">
          <div className="row">

            <div className="col-md-6 text-start align-self-left ">
              <img width={'300px'} height={'300px'} className="img-fluid" src={productImage} />
            </div>

            <div className="col-md-6 info mt-4"> <div className="row title">
              <div className="col  text-right">
                <h1 className='ms-3'>{productName}</h1></div>

              <div className="col text-right">

                

              </div> </div>

              <p>Natural herbal wash pro</p>

              <p className='d-flex justify-content-start p-0'>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star-half-full"></span> </p>

              <h3 className='mt-2'> Details </h3>
              <p className='mb-2'>{productDescription}</p>



              <div className="row price mt-2">


                <label className="radio"> <input type="radio" name="size2" value="large" checked /> <span>
                  <div className="row">
                    <big><b>Price</b></big>

                  </div>
                  <div className="row"> <big><b>$<FormattedNumber number={productPrice} minimumFractionDigits={2} maximumFractionDigits={2} /> </b></big></div>

                </span> </label> </div>

            </div> </div>


          <div className="row lower mt-2">
            <div className="col">

            </div>

            <div className="mt-5 text-right align-self-left"> 
            
            <Link to="/checkout">  <Button onClick={()=> handleCart( _id, productName, productImage, productPrice)} className='' size='large' style={{ color: "black" }}>
              Add to cart </Button> </Link>
              
              </div> 
              </div> 
              </div> 
              
              
              </div>

        
     
    </>
  );
};

export default ProductShowcase;
