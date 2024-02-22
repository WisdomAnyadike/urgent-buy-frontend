import React from 'react'
import '/src/Components/Product Card/product.styles.scss'
import {  useDispatch } from 'react-redux'
import { setCartArr } from '../Redux/Dropdownslice'
import '@fortawesome/fontawesome-free/css/all.min.css';




const ProductCard = ({ data : { _id, productName, productImage, productPrice } }) => {

   const dispatch = useDispatch()
    

    const handleCart = (_id , productName , productImage , productPrice)=> {
        const cartObject = {
            _id,
            productName,
            productImage,
            productPrice,
            quantity: 1 ,
        }

        dispatch(setCartArr(cartObject))

    }

    return ( 
        <div className="product-grid rounded">
            <div className="product-image ">
                <a href="#" className="image">
                    <img width={150} height={150} className='rounded' src={productImage}/>
                </a>
                <span className="product-discount-label">-23%</span>
                <ul className="product-links">
                    <li><a href="#"><i className="fa fa-search"></i></a></li>
                    <li><a href="#"><i className="fa fa-heart"></i></a></li>
                    <li><a href="#"><i className="fa fa-random"></i></a></li>
                </ul>
                <button className='border-0 add-to-cart' onClick={()=> handleCart(_id , productName , productImage , productPrice)}   >Add to Cart</button>
            </div>
            <div className="product-content " style={{borderRadius:"0px 0px 5px 5px"}}>
                <h3 className="title"><a href="#">{productName}</a></h3>
                <div className="productPrice">N{productPrice}.00  <span style={{  textDecoration:'line-through'}}> N{(productPrice * (23/100)) + productPrice }</span></div>
            </div>
        </div>
 
    )
}

export default ProductCard