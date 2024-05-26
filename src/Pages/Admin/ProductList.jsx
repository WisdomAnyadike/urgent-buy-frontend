import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';




const ProductList = ({ products }) => {
  const [searchedProducts, setSearchedProducts] = useState([...products])
  const [isLoading, setIsLoading] = useState(false)
  const [isloading2, setIsLoading2] = useState(false)

  const handleDelete = async (e, id) => {
    setIsLoading2(true)
    e.preventDefault()
    let confirm = window.confirm('are you sure')
    if (confirm) {
      try {
        const res = await axios.post(`https://urgent-buy-backend.onrender.com/Api/Products/deleteProduct/${id}`)
        if (res.data.status == 'okay') {
          setIsLoading2(false)
          alert(res.data.message)
        }
      } catch (error) {
        setIsLoading2(false)
        alert(error.response.data.message)
      }
    }


  }
  const [editIndex, setEditIndex] = useState(null);
  const [editedProductName, setEditedProductName] = useState('');
  const [editedProductCategory, setEditedProductCategory] = useState('');
  const [editedProductDescription, setEditedProductDescription] = useState('');
  const [editedProductPrice, setEditedProductPrice] = useState('');
  const [editedProductImage, setEditedProductImage] = useState('');


  const handleEdit = (index) => {
    setEditIndex(index);
    const productToEdit = products[index];
    setEditedProductName(productToEdit.productName);
    setEditedProductCategory(productToEdit.productCategory);
    setEditedProductDescription(productToEdit.productDescription);
    setEditedProductPrice(productToEdit.productPrice);
    setEditedProductImage(productToEdit.productImage);
  };

  const setFile = (e) => {
    let File = e.target.files[0]
    const reader = new FileReader()
    let result = reader.readAsDataURL(File)
    reader.onload = () => {
      setEditedProductImage(reader.result)
    }


  }

  const handleSaveChanges = async () => {
    setIsLoading(true)

    const productToEdit = products[editIndex];

    const productObject = {
      productName: editedProductName,
      productImage: editedProductImage,
      productPrice: editedProductPrice,
      productDescription: editedProductDescription,
      productCategory: editedProductCategory
    }

    try {
      const res = await axios.post(`https://urgent-buy-backend.onrender.com/Api/Products/editProduct/${productToEdit._id}`, productObject)

      if (res.data.status == 'okay') {
        setIsLoading(false)
        alert(res.data.message)

      }
    } catch (error) {
      setIsLoading(false)
      alert(error.response.data.message)

    }

    // Implement the logic to save edited product details
    // You can use editedProductName, editedProductCategory, etc.
    // to get the edited values

  };


  return (
    <>
      {searchedProducts.lenght !== 0 ?
        < >
          {products.map(({ productName, productImage, productPrice, productDescription, productCategory, _id }, index) =>

            < >
              <div key={_id} className="row mb-2 mt-2">
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
                        <img src={productImage} width={'230px'} height={400} alt="Generic placeholder image" className="ml-lg-5 order-1 order-lg-2" />
                      </div> {/* End */}

                    </li> {/* End */}
                    <div className='mb-3'>
                      <button type="button" className='btn btn-success mb-2 w-25 ms-4 mt-2' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleEdit(index)}> Edit </button>

                      <div class="modal modal-xl fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog ">
                          <div class="modal-content  "  >
                            <div class="modal-header ">
                              <h1 class="modal-title fs-5" id="exampleModalLabel"> Edit Product </h1>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body" >
                              <div className="media align-items-lg-center flex-column flex-lg-row p-3">
                                <div className="media-body order-2 order-lg-1 mb-2">
                                  <input className="mt-0 form-control font-weight-bold mb-2" value={editedProductName} onChange={(e) => setEditedProductName(e.target.value)} />
                                  <select className='form-control mb-2' value={editedProductCategory} onChange={(e) => setEditedProductCategory(e.target.value)}>
                                    <option value={''}> Choose Category </option>
                                    <option value={'Mens'}> Mens </option>
                                    <option value={'Womens'}> Womens </option>
                                    <option value={'Jackets'}> Jackets </option>
                                    <option value={'Hats'}> Hats </option>
                                    <option value={'Trainers'}> Trainers </option>
                                  </select>

                                  <input className="font-italic form-control text-muted mb-2 small" value={editedProductDescription} onChange={(e) => setEditedProductDescription(e.target.value)} />
                                  <input className="d-flex align-items-center form-control mb-2 justify-content-between" value={editedProductPrice} onChange={(e) => setEditedProductPrice(e.target.value)} />

                                </div>
                                <img src={editedProductImage} width={'230px'} height={400} alt="Generic placeholder image" className="ml-lg-5 order-1 order-lg-2" />

                                <input type='file' onChange={(e) => setFile(e)} />
                              </div>

                              <div>


                              </div>

                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                              <button type="button" style={{ width: "150px", height: "40px" }} class="btn btn-primary d-flex align-items-center justify-content-center" onClick={() => handleSaveChanges(index)}>{isLoading ? <main>
                                <svg class="sp" viewBox="0 0 128 128" width="28px" height="28px" xmlns="http://www.w3.org/2000/svg">
                                  <defs>
                                    <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="0%" stop-color="#000" />
                                      <stop offset="40%" stop-color="#fff" />
                                      <stop offset="100%" stop-color="#fff" />
                                    </linearGradient>
                                    <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="0%" stop-color="#000" />
                                      <stop offset="60%" stop-color="#000" />
                                      <stop offset="100%" stop-color="#fff" />
                                    </linearGradient>
                                    <mask id="mask1">
                                      <rect x="0" y="0" width="128" height="128" fill="url(#grad1)" />
                                    </mask>
                                    <mask id="mask2">
                                      <rect x="0" y="0" width="128" height="128" fill="url(#grad2)" />
                                    </mask>
                                  </defs>
                                  <g fill="none" stroke-linecap="round" stroke-width="16">
                                    <circle class="sp__ring" r="56" cx="64" cy="64" stroke="#ddd" />
                                    <g stroke="hsl(223,90%,50%)">
                                      <path class="sp__worm1" d="M120,64c0,30.928-25.072,56-56,56S8,94.928,8,64" stroke="hsl(343,90%,50%)" stroke-dasharray="43.98 307.87" />
                                      <g transform="translate(42,42)">
                                        <g class="sp__worm2" transform="translate(-42,0)">
                                          <path class="sp__worm2-1" d="M8,22c0-7.732,6.268-14,14-14s14,6.268,14,14" stroke-dasharray="43.98 175.92" />
                                        </g>
                                      </g>
                                    </g>
                                    <g stroke="hsl(283,90%,50%)" mask="url(#mask1)">
                                      <path class="sp__worm1" d="M120,64c0,30.928-25.072,56-56,56S8,94.928,8,64" stroke-dasharray="43.98 307.87" />
                                      <g transform="translate(42,42)">
                                        <g class="sp__worm2" transform="translate(-42,0)">
                                          <path class="sp__worm2-1" d="M8,22c0-7.732,6.268-14,14-14s14,6.268,14,14" stroke-dasharray="43.98 175.92" />
                                        </g>
                                      </g>
                                    </g>
                                    <g stroke="hsl(343,90%,50%)" mask="url(#mask2)">
                                      <path class="sp__worm1" d="M120,64c0,30.928-25.072,56-56,56S8,94.928,8,64" stroke-dasharray="43.98 307.87" />
                                      <g transform="translate(42,42)">
                                        <g class="sp__worm2" transform="translate(-42,0)">
                                          <path class="sp__worm2-1" d="M8,22c0-7.732,6.268-14,14-14s14,6.268,14,14" stroke-dasharray="43.98 175.92" />
                                        </g>
                                      </g>
                                    </g>
                                  </g>
                                </svg>
                              </main> : 'Save Changes'}</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button className='btn btn-danger mb-2 mt-2 w-25 ms-4' onClick={(e) => handleDelete(e, _id)} style={{ backgroundColor: "#dc3446" }}> {isloading2 ?
                        <div class="spinner-border text-light " style={{width:'23px' , height:"23px"}} role="status">
                          <span class="visually-hidden">Loading...</span>
                        </div>
                        : 'Delete'} </button>
                      <ToastContainer />
                    </div>


                  </ul> {/* End */}
                </div>
              </div>
            </>
          )}

        </> : 'this product doesnt exist'}

    </>
  );
}

export default ProductList;
