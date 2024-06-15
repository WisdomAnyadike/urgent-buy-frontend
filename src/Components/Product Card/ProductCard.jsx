import React, { useState } from 'react'
import '/src/Components/Product Card/product.styles.scss'
import { useDispatch } from 'react-redux'
import { setCartArr } from '../Redux/Dropdownslice'
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FormattedNumber from '../numberFormatter/numFormattter';


import { useSelector } from 'react-redux';
import { setNotifyArr, setNotifyArrEmpty } from '../Redux/NotifySlice';
import { setIsLiked } from '../Redux/Likeslice';
import { setitemObj } from '../Redux/itemSlice';
import { useNavigate } from 'react-router-dom';







const ProductCard = ({ data: { _id, productName, productImage, productPrice , productDescription } }) => {

    const navigate = useNavigate()


    const userObj = useSelector(state => state.Userslice.userObj)

    const dispatch = useDispatch()
    const token = localStorage.getItem("urgentBuyToken")

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





    const handleLike = async (e, productName) => {
        const element = e.target
        dispatch(setIsLiked(element))
        const obj = {
            ProductName: productName,
            ProductLike: 1,
            ProductLiker: userObj.FullName
        }

        try {
            const res = await axios.post('https://urgent-buy-backend.onrender.com/Api/Notify/createNotification', obj, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "content-type": "application/json"
                }
            })
            if (res.data.status === 'okay') {
                // alert(res.data.userNotify )  


                dispatch(setNotifyArr({ message: res.data.message, time: res.data.timestamp }))

            }

        } catch (error) {

            alert(error.response.data.message)
        }


    }

    function seeMore(_id, productName, productImage, productPrice , productDescription) {
        const cartObject = {
            _id,
            productName,
            productImage,
            productPrice,
            quantity: 1,
            productDescription
        }

        dispatch(setitemObj(cartObject))

    }




    return (
        <>

            <div className="product-grid rounded">
                <div className="product-image ">
                    <Link onClick={() => seeMore(_id, productName, productImage, productPrice , productDescription)} to='/item'>
                        <a href="#" className="image">
                            <img width={150} height={150} className='rounded' src={productImage} />
                        </a>
                        <span className="product-discount-label">-23%</span>
                        <ul className="product-links">
                            <li><a ><i className="fa fa-search"></i></a></li>
                            <li onClick={(e) => handleLike(e, productName)}> <a ><i className="fa fa-heart"></i></a> </li>
                            <li><a ><i className="fa fa-random"></i></a></li>

                        </ul>
                    </Link>
                    <button className='border-0 add-to-cart' onClick={() => handleCart(_id, productName, productImage, productPrice)} > Add to Cart</button>
                </div>
                <div className="product-content " style={{ borderRadius: "0px 0px 5px 5px" }}>
                    <h3 className="title"><a href="#">{productName}</a></h3>
                    <div className="productPrice">

                        $<FormattedNumber number={productPrice} minimumFractionDigits={2} maximumFractionDigits={2} />

                        <span style={{ textDecoration: 'line-through' }}>
                           $<FormattedNumber number={(productPrice * (23 / 100)) + productPrice} minimumFractionDigits={2} maximumFractionDigits={2} />

                            </span></div>
                </div>

            </div>




        </>

    )
}

export default ProductCard