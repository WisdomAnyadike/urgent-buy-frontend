import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast , ToastContainer } from 'react-toastify';

const ProductList = ({products}) => {

   
  
    const handleDelete = async(e , id)=> {
        e.preventDefault()
  let confirm =    window.confirm('are you sure')
  if (confirm) {
    try {
        const res = await axios.post(`https://urgent-buy-backend.onrender.com/Api/Products/deleteProduct/${id}`)
        if(res.data.status == 'okay'){
            alert(res.data.message)
        }
    } catch (error) {
        alert(error.response.data.message)
    }
  }
      

    }


  return (
    <>
    {  products.lenght !== 0 &&    
    < > 
   {products.map(({productName , productImage , productPrice , productDescription , productCategory , _id})=> 
   
   < >
      <div  key={_id} className="row mb-2 mt-2">
        <div className="col-lg-8 mx-auto">
          {/* List group*/}
          <ul className="list-group shadow">
            {/* list group item*/}
            <li className="list-group-item">
              {/* Custom content*/}
              <div className="media align-items-lg-center flex-column flex-lg-row p-3">
                <div className="media-body order-2 order-lg-1">
                  <h5 className="mt-0 font-weight-bold mb-2">{productName}</h5>
                  <h6 className="mt-0 font-weight-bold mb-2">{productCategory}</h6>
                  <p className="font-italic text-muted mb-0 small">{productDescription}</p>
                  <div className="d-flex align-items-center justify-content-between mt-1">
                    <h6 className="font-weight-bold my-2">&#x20B9;{productPrice}</h6>
                    <ul className="list-inline small">
                      <li className="list-inline-item m-0"><i className="fa fa-star text-success"></i></li>
                      <li className="list-inline-item m-0"><i className="fa fa-star text-success"></i></li>
                      <li className="list-inline-item m-0"><i className="fa fa-star text-success"></i></li>
                      <li className="list-inline-item m-0"><i className="fa fa-star text-success"></i></li>
                      <li className="list-inline-item m-0"><i className="fa fa-star-o text-gray"></i></li>
                    </ul>
                  </div>
              
                </div>
                <img src={productImage} width={'230px'} height={400} alt="Generic placeholder image"  className="ml-lg-5 order-1 order-lg-2" />
              </div> {/* End */}
          
            </li> {/* End */}
          <div className='mb-3'> 
          <button className='btn btn-success mb-2 w-25 ms-4 mt-2'> Edit </button>
                  <button className='btn btn-danger mb-2 mt-2 w-25 ms-4' onClick={(e)=> handleDelete(e , _id)} style={{backgroundColor:"#dc3446"}}> Delete</button>
                  <ToastContainer/>
          </div>
                 
          
          </ul> {/* End */}
        </div>
      </div>
   </>
   )} 
   
      </>   }
     
      </>
  );
}

export default ProductList;
