import React from 'react'
import DashboardLayout from '../../Layouts/DashboardLayout'
import { useEffect } from "react";
import Chart from "../../Components/Charts/Chart";
import Doughnutchart from '../../Components/Charts/DoughnutChart';
import Barchart from '../../Components/Charts/Barchart';
import { Icon } from "@iconify/react";
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios'
import ProductList from './ProductList';
import TimeAgo from '../../Components/Time/Timeago';
import { Divider, Form, Radio, Skeleton, Space, Switch } from 'antd';
import { DotChartOutlined } from '@ant-design/icons';
import { set } from 'date-fns';
import { manageAdminHook } from './manageAdminHook';
import { createProduct } from '../../../services/admin';





const Adminpage = () => {
  const [loaded, setLoaded] = useState(true)
  const [isloading, setIsLoading] = useState(false)
  const [active, setActive] = useState(false);
  const [block, setBlock] = useState(false);
  const [size, setSize] = useState('default');
  const [buttonShape, setButtonShape] = useState('default');
  const [products, setProducts] = useState([])
  const [Users, setUsers] = useState([])
  const [Users1, setUsers1] = useState([])
  const [Users2, setUsers2] = useState([])
  const [Users3, setUsers3] = useState([])
  const [Users4, setUsers4] = useState([])
  const [Users5, setUsers5] = useState([])
  const [Transactions, setTransactions] = useState([])
  const [Transactions1, setTransactions1] = useState([])
  const [Transactions2, setTransactions2] = useState([])
  const [Transactions3, setTransactions3] = useState([])
  const [Transactions4, setTransactions4] = useState([])
  const [Transactions5, setTransactions5] = useState([])
  const [MonthlyTransactions, setMonthlyTransactions] = useState([])
  const [productName, setProductName] = useState('')
  const [productImage, setProductImage] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productCategory, setProductCategory] = useState('')
  const [customer, setCustomer] = useState({})

  useEffect(() => {
    const element = document.getElementById("list-dashboard-list");
    if (element) {
      element.classList.add("buttonact2");
    }
    const secElement = document.getElementById("theSeclist-dashboard-list");
    if (secElement) {
      secElement.classList.add("buttonact2");
    }
  }, []);


  const { getUser, getUser1, getUser2, getUser3, getUser4, getUser5, getTransactions, getTransactions1, getTransactions2,
    getTransactions3,
    getTransactions4,
    getTransactions5,
    getMonthlyTransactions,
    getProducts } = manageAdminHook()


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const [userResponse, user1Response, user2Response, user3Response, user4Response, user5Response, transactions, transaction1, transaction2, transaction3, transaction4, transaction5, monthlyTransactions, Products] = await Promise.all([
          getUser(),
          getUser1(),
          getUser2(),
          getUser3(),
          getUser4(),
          getUser5(),
          getTransactions(),
          getTransactions1(),
          getTransactions2(),
          getTransactions3(),
          getTransactions4(),
          getTransactions5(),
          getMonthlyTransactions(),
          getProducts()
        ]);

        if (userResponse) setUsers(userResponse);
        if (user1Response) setUsers1(user1Response);
        if (user2Response) setUsers2(user2Response);
        if (user3Response) setUsers3(user3Response);
        if (user4Response) setUsers4(user4Response);
        if (user5Response) setUsers5(user5Response);
        if (transactions) {
          setLoaded(false)
          setTransactions(transactions);
        }
        if (transaction1) setTransactions1(transaction1);
        if (transaction2) setTransactions2(transaction2);
        if (transaction3) setTransactions3(transaction3);
        if (transaction4) setTransactions4(transaction4);
        if (transaction5) setTransactions5(transaction5);
        if (monthlyTransactions) setMonthlyTransactions(monthlyTransactions)
        if (Products) setProducts(Products);

      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [getUser, getUser1, getUser2, getUser3, getUser4, getUser5, getTransactions,
    getTransactions1,
    getTransactions2,
    getTransactions3,
    getTransactions4,
    getTransactions5, getProducts]);


  const [searcher, setSearcher] = useState('')
  const fliteredProducts = products.filter(({ productName }) => productName.toLowerCase().includes(searcher))


  const catchImage = (e) => {

    const reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
      let result = reader.result
      setProductImage(result);
    }

  }



  useEffect(() => {
    let sortedTransactions
    if (MonthlyTransactions) {
      sortedTransactions = MonthlyTransactions.sort((a, b) => {
        if (a.transactionValue < b.transactionValue) {
          return 1
        } else if (a.transactionValue > b.transactionValue) {
          return -1
        } else {
          return 0
        }
      })

    }
    setCustomer(sortedTransactions[0])
  }, [MonthlyTransactions])



  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const productObject = {
      productName,
      productImage,
      productPrice,
      productDescription,
      productCategory
    }

    const result = await createProduct(productObject);
    if (result && result.message) {
      alert(result.message);
      setIsLoading(false)
    } else {
      alert('An unknown error occurred.');
    }
    if (result && result.status === 'success') {
      setIsLoading(false)
    }


  }

  const data = {
    labels: [
      'Boys',
      'Girls',

    ],
    datasets: [{
      label: 'stats',
      data: [114, 200],
      backgroundColor: [
        'rgb(219,235,250)',
        'rgb(20,127,228)',


      ],
      hoverOffset: 4
    }]
  };

  let confirmStatus = async (id, status) => {
    let confirm = window.confirm(`${status === 'success' ? 'accept' : 'reject'},are you sure?`)
    if (confirm) {
      try {
        const res = await axios.post(`https://ecommerce-backend-pq9c.onrender.com/Api/Transaction/confirmStatus/${id}`, { status })
        if (res.data.status === 'okay') {
          alert('successfully updated')
        } else {
          alert('failed')
        }
      } catch (error) {
        console.log(error);
      }
    }
  }



  const chart2 = [

    { pv: Transactions2.reduce((a, b) => a + b.transactionAmount, 0) },
    { pv: Transactions1.reduce((a, b) => a + b.transactionAmount, 0) },
    // Add more data points as needed
  ];

  const chart3 = [
    { pv: Users5.length },
    { pv: Users4.length },
    { pv: Users3.length },
    { pv: Users2.length },
    { pv: Users1.length },
    // Add more data points as needed
  ];


  const chart4 = [
    { pv: Transactions5.reduce((a, b) => a + b.transactionAmount, 0) },
    { pv: Transactions4.reduce((a, b) => a + b.transactionAmount, 0) },
    { pv: Transactions3.reduce((a, b) => a + b.transactionAmount, 0) },
    { pv: Transactions2.reduce((a, b) => a + b.transactionAmount, 0) },
    { pv: Transactions1.reduce((a, b) => a + b.transactionAmount, 0) },

    // Add more data points as needed
  ];


  const [activeUsers, setActiveUsers] = useState('')
  const [activeUsers2, setActiveUsers2] = useState('')
  useEffect(() => {
    const todaysUsers = Transactions1.map(({ transactionUser }) => transactionUser)
    setActiveUsers(new Set(todaysUsers).size)
    const yesterdaysUsers = Transactions2.map(({ transactionUser }) => transactionUser)
    setActiveUsers2(new Set(yesterdaysUsers).size)
  }, [Transactions1, Transactions2])

  const chart1 = [
    { pv: activeUsers2 },
    { pv: activeUsers },

    // Add more data points as needed
  ];

  const [pending, setPending] = useState([])

  useEffect(() => {
    setPending(Transactions.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return 1
      } else if (a.createdAt < b.createdAt) {
        return -1
      } else {
        return 0
      }
    }).filter((product) => product.transactionStatus === 'pending...'))
  }, [Transactions])




  return (




    <div
      className="body w-100 d-flex flex-column align-items-center justify-content-start"
      style={{ height: "100vh", overflowY: "scroll" }}
    >
      {loaded ?

        <>

          <Space className='d-flex flex-column align-items-center'>
            <div className='mb-2'>
              <Skeleton.Button active={true} className='rounded' style={{ width: '98vw', height: '150px' }} />
            </div>
            <div className='d-flex align-items-center justify-content-between flex-wrap dashflexer' style={{ width: '98vw' }}>

              <Skeleton.Button className='dashwidth2 mb-2' active={true} style={{ height: '150px', minWidth: "280px" }} size={size} shape={buttonShape} block={block} />
              <Skeleton.Button className='dashwidth2 mb-2' active={true} style={{ height: '150px', minWidth: "280px" }} size={size} shape={buttonShape} block={block} />
              <Skeleton.Button className='dashwidth2 mb-2' active={true} style={{ height: '150px', minWidth: "280px" }} size={size} shape={buttonShape} block={block} />
              <Skeleton.Button className='dashwidth2 mb-2' active={true} style={{ height: '150px', minWidth: "280px" }} size={size} shape={buttonShape} block={block} />
            </div>

            <div className=' d-flex flex-wrap align-items-center justify-content-between mt-3 dashflexer' style={{ width: "98vw" }}>


              <Skeleton.Button active={true} className='rounded mb-2' style={{ minWidth: '300px', width: "47vw", height: "625px" }} />

              <Skeleton.Button active={true} className='rounded mb-2' style={{ minWidth: '300px', width: "47vw", height: "625px" }} />




            </div>


            <div className='mb-2'>
              <Skeleton.Button active={true} className='rounded' style={{ width: '98vw', height: '350px' }} />
            </div>

            <Skeleton.Button style={{ width: "98vw", height: "625px" }} />





          </Space>



        </>
        :

        <>
          <div className="d-flex mt-1 align-items-center justify-content-center p-2 shadow mb-2  rounded" style={{ width: "98%", backgroundColor: "white" }}>
            <div className="d-flex align-items-center justify-content-between flex-wrap " style={{ width: "98%" }}>
              <div className="mb-3 mt-2">
                <h5 style={{ fontWeight: "600" }}> Welcome back, Admin! </h5>
                <small> {new Date().toLocaleDateString()} </small>
              </div>

              <div style={{ width: "fit-content" }}>

              </div>

            </div>



          </div>
          <div className=" p-2 d-flex align-items-center justify-content-between dashflexer" style={{ width: '99%' }}>
            <div className="mb-2 dashwidth2  rounded d-flex align-items-center justify-content-center shadow" style={{ minWidth: "280px" }} >  <Chart data={chart1} name={'Active Users'} value={activeUsers} valueprops={activeUsers > activeUsers2 ? 'text-success' : 'text-danger'} time={'yesterday'}

              graphColor={activeUsers > activeUsers2 ? '#1b8655' : '#dc3446'}
              percent={`${(((activeUsers / Users.length) * 100) - ((activeUsers2 / Users.length) * 100)).toFixed()}%`}

              percentProps={(((activeUsers / Users.length) * 100) - ((activeUsers2 / Users.length) * 100)).toFixed() > 0 ? 'text-success' : 'text-danger'}
            /> </div>

            <div className="mb-2 dashwidth2  rounded d-flex align-items-center justify-content-center shadow" style={{ minWidth: "280px" }}>  <Chart name={'Daily Income'} data={chart2}
              valueprops={Transactions1.reduce((a, b) => a + b.transactionAmount, 0) > Transactions2.reduce((a, b) => a + b.transactionAmount, 0) ? 'text-success' : 'text-danger'} value={`N${Transactions1.reduce((a, b) => a + b.transactionAmount, 0)}`} time={'yesterday'}

              graphColor={Transactions1.reduce((a, b) => a + b.transactionAmount, 0) > Transactions2.reduce((a, b) => a + b.transactionAmount, 0) ? '#1b8655' : '#dc3446'}


              percentProps={Transactions1.reduce((a, b) => a + b.transactionAmount, 0) > Transactions2.reduce((a, b) => a + b.transactionAmount, 0) ? 'text-success' : 'text-danger'}

              percent={`${((Transactions1.reduce((a, b) => a + b.transactionAmount, 0) / Transactions.reduce((a, b) => a + b.transactionAmount, 0)) * 100).toFixed() - ((Transactions2.reduce((a, b) => a + b.transactionAmount, 0) / Transactions.reduce((a, b) => a + b.transactionAmount, 0)) * 100).toFixed()}%`} /> </div>


            <div className="mb-2 dashwidth2  rounded d-flex align-items-center justify-content-center shadow" style={{ minWidth: "280px" }} >  <Chart name={'Total Users'} data={chart3} value={Users.length} graphColor={Users1 > Users2 ? '#1b8655' : '#dc3446'}

              valueprops={Users1 > Users2 ? 'text-success' : 'text-danger'}

              percent={`${(((Users1.length / Users.length) * 100) - ((Users2.length / Users.length) * 100) - ((Users3.length / Users.length) * 100) - ((Users4.length / Users.length) * 100) - ((Users5.length / Users.length) * 100)).toFixed()}%`}

              percentProps={(((Users1.length / Users.length) * 100) - ((Users2.length / Users.length) * 100) - ((Users3.length / Users.length) * 100) - ((Users4.length / Users.length) * 100) - ((Users5.length / Users.length) * 100)).toFixed() > 0 ? 'text-success' : 'text-danger'}

              time={new Date().toLocaleTimeString()} /> </div>

            <div className="mb-2 dashwidth2  rounded d-flex align-items-center justify-content-center shadow" style={{ minWidth: "280px" }} >  <Chart name={'Total Income'}

              graphColor={Transactions1.reduce((a, b) => a + b.transactionAmount, 0) > Transactions2.reduce((a, b) => a + b.transactionAmount, 0) ? '#1b8655' : '#dc3446'} valueprops={Transactions1.reduce((a, b) => a + b.transactionAmount, 0) > Transactions2.reduce((a, b) => a + b.transactionAmount, 0) ? 'text-success' : 'text-danger'}

              data={chart4} value={`N${Transactions.reduce((a, b) => a + b.transactionAmount, 0)}`} time={new Date().toLocaleTimeString()}

              percentProps={
                ((Transactions1.reduce((a, b) => a + b.transactionAmount, 0) / Transactions.reduce((a, b) => a + b.transactionAmount, 0)) * 100).toFixed() - ((Transactions2.reduce((a, b) => a + b.transactionAmount, 0) / Transactions.reduce((a, b) => a + b.transactionAmount, 0)) * 100).toFixed() - ((Transactions3.reduce((a, b) => a + b.transactionAmount, 0) / Transactions.reduce((a, b) => a + b.transactionAmount, 0)) * 100).toFixed() - ((Transactions4.reduce((a, b) => a + b.transactionAmount, 0) / Transactions.reduce((a, b) => a + b.transactionAmount, 0)) * 100).toFixed() - ((Transactions5.reduce((a, b) => a + b.transactionAmount, 0) / Transactions.reduce((a, b) => a + b.transactionAmount, 0)) * 100).toFixed() > 0 ? 'text-success' : 'text-danger'}


              percent={`${((Transactions1.reduce((a, b) => a + b.transactionAmount, 0) / Transactions.reduce((a, b) => a + b.transactionAmount, 0)) * 100).toFixed() - ((Transactions2.reduce((a, b) => a + b.transactionAmount, 0) / Transactions.reduce((a, b) => a + b.transactionAmount, 0)) * 100).toFixed() - ((Transactions3.reduce((a, b) => a + b.transactionAmount, 0) / Transactions.reduce((a, b) => a + b.transactionAmount, 0)) * 100).toFixed() - ((Transactions4.reduce((a, b) => a + b.transactionAmount, 0) / Transactions.reduce((a, b) => a + b.transactionAmount, 0)) * 100).toFixed() - ((Transactions5.reduce((a, b) => a + b.transactionAmount, 0) / Transactions.reduce((a, b) => a + b.transactionAmount, 0)) * 100).toFixed()}%`} /> </div>


          </div>

          <div className="w-100 d-flex flex-wrap align-items-start justify-content-between">
            <div className="resultque1 d-flex align-items-center justify-content-between flex-column">
              <div
                className=" rounded  flex-column p-2 d-flex shadow align-items-center justify-content-start mb-3"
                style={{ width: "95%", minWidth: '300px', height: "625px", backgroundColor: "white" }}
              >
                <div className='rounded-circle bg-dark mt-5 mb-5' style={{ width: '270px', height: '270px' }} >
                  <img src={!customer || !customer.user.Picture ? 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg' : customer.user.Picture} width={"100%"} height={"100%"} className='rounded-circle' />
                </div>
                <h2 className='w-50' style={{ fontFamily: 'fantasy' }} > Most Valuable Customer  </h2>
                <div className='align-left bg-dark text-light p-3 rounded d-flex flex-column  ' style={{ minWidth: '270px' }} >
                  <h5> Name : {!customer ? 'loading...' : customer?.user.FullName}  </h5>
                  <span> Total expenses: {!customer ? 'loading...' : `N${customer?.transactionValue}`} </span>
                  <span> Most Purchased Product :  </span>
                </div>



              </div>





            </div>



            <div className="resultque1  d-flex align-items-center justify-content-between flex-column">




              <div
                className="activity shadow  p-2  rounded d-flex align-items-start justify-content-start flex-column"
                style={{ height: "625px", backgroundColor: "white", width: "95%" }}
              >
                <p className='p-2'> <h6 style={{ fontWeight: "600" }}> Transaction history </h6> </p>

                <div class=" w-100 " >
                  <div class="col-12 mb-3 mb-lg-5" >
                    <div class="position-relative card table-nowrap table-card" style={{ overflowY: "scroll", height: "550px" }}>
                      <div class="card-header align-items-center">
                        <h5 class="mb-0">Latest Transactions</h5>
                        <p class="mb-0 small text-muted">{pending.length} Pending</p>
                      </div>
                      <div class="table-responsive">
                        <table class="table mb-0">
                          <thead class="small text-uppercase bg-body text-muted">
                            <tr>
                              <th >Transaction ID</th>
                              <th > Time </th>
                              <th >Name</th>
                              <th >Amount</th>
                              <th >Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Transactions.sort((a, b) => {
                              if (a.createdAt < b.createdAt) {
                                return 1
                              } else if (a.createdAt > b.createdAt) {
                                return -1
                              } else {
                                return 0
                              }
                            }).map(({ _id, transactionAmount, transactionStatus, transactionUser, createdAt }) =>


                              <tr class="align-middle">
                                <td >
                                  {_id}
                                </td>
                                <td>{<TimeAgo timestamp={createdAt} />}</td>
                                <td>{transactionUser}</td>
                                <td >
                                  <div class="d-flex align-items-center">
                                    <span><i class="fa fa-arrow-up text-success me-1" aria-hidden="true"></i></span>
                                    <span>N{transactionAmount}</span>
                                  </div>
                                </td>
                                <td>
                                  <span class={transactionStatus === 'success' ? 'text-success badge fs-6 fw-normal bg-tint-warning' : 'text-danger badge fs-6 fw-normal bg-tint-warning'}>{transactionStatus}</span>
                                </td>
                              </tr>

                            )}



                          </tbody>
                        </table>
                      </div>

                    </div>
                  </div>
                </div>

              </div>





            </div>








          </div>
          <div className=" mt-3 align-items-center justify-content-center p-2 shadow mb-2 rounded " style={{ width: "95%", backgroundColor: "white", height: "fit-content" }}>



            <div class="table-responsive">
              <table class="table w-100 mb-0">
                <thead class="small text-uppercase bg-body text-muted">
                  <tr>
                    <th >Transaction ref</th>
                    <th > Time </th>
                    <th > Tag </th>
                    <th >Amount</th>
                    <th >order</th>
                    <th >Status</th>
                  </tr>
                </thead>
                <tbody>{
                  pending.length === 0 ?  'no pending transactions' :
                
                  pending.map(({ _id, transactionAmount, transactionOrder, transactionStatus, transactionReference, transactionTag, createdAt }) =>


                    <tr key={_id} class="align-middle">
                      <td >
                        {transactionReference}
                      </td>
                      <td>{<TimeAgo timestamp={createdAt} />}</td>
                      <td>{transactionTag}</td>
                      <td >
                        <div class="d-flex align-items-center">
                          <span><i class="fa fa-arrow-up text-success me-1" aria-hidden="true"></i></span>
                          <span>N{transactionAmount}</span>
                        </div>
                      </td>
                      <td>
                        <span class="badge fs-6 fw-normal bg-tint-warning text-success">{transactionOrder}</span>
                      </td>
                      <td>
                        <span className={transactionStatus === 'success' ? 'text-success badge fs-6 fw-normal bg-tint-warning' : 'text-danger badge fs-6 fw-normal bg-tint-warning'} >{transactionStatus}</span>
                      </td>
                      <td>
                        <button onClick={() => confirmStatus(_id, 'success')} class="badge fs-6 fw-normal bg-success"> accept </button>
                      </td>
                      <td>
                        <button onClick={() => confirmStatus(_id, 'failed')} class="badge fs-6 fw-normal bg-danger"> reject </button>
                      </td>
                    </tr>

                  )
                  
                  }

                


                </tbody>
              </table>
            </div>






          </div>

          <div className="d-flex mt-3 align-items-center justify-content-center p-2 shadow mb-2  rounded " style={{ width: "95%", backgroundColor: "white" }}>
            <div className="d-flex align-items-start justify-content-between flex-column " style={{ width: "98%" }}>
              <div className="mb-3 mt-2 ">
                <h6 style={{ fontWeight: "600" }}>  Add New Product </h6>

              </div>

              <div style={{ width: "fit-content" }}>



                <form className="flex-column p-0  d-flex align-items-start justify-content-start" role="form">

                  <div className="d-flex w-100 mb-3">
                    <label htmlFor="name" className="col-sm-4 control-label me-2">Product Category</label>
                    <div className="col-sm-3">
                      <select
                        onChange={(e) => setProductCategory(e.target.value)}
                        style={{ fontSize: "15px" }}
                        className="border rounded bg-white p-1"
                      >
                        {" "}
                        <option value={''}> Choose Category </option>
                        <option value={'Mens'}> Mens </option>
                        <option value={'Womens'}> Womens </option>
                        <option value={'Jackets'}> Jackets </option>
                        <option value={'Hats'}> Hats </option>
                        <option value={'Trainers'}> Trainers </option>
                      </select>
                    </div>
                  </div>
                  <div className="d-flex w-100 mb-3">
                    <label htmlFor="name" className="col-sm-4 control-label me-2">Product Name</label>
                    <div className="col-sm-9">
                      <input type="text" onChange={(e) => setProductName(e.target.value)} className="form-control" name="name" id="name" placeholder="Name" />
                    </div>
                  </div>
                  <div className="d-flex w-100 mb-3">
                    <label htmlFor="about" className="col-sm-4 control-label me-2">Description</label>
                    <div className="col-sm-9">
                      <textarea onChange={(e) => setProductDescription(e.target.value)} className="form-control"></textarea>
                    </div>
                  </div>
                  <div className="d-flex w-100 mb-3">
                    <label htmlFor="qty" className="col-sm-4 control-label me-2">Price</label>
                    <div className="col-sm-4">
                      <input type="number" onChange={(e) => setProductPrice(e.target.value)} className="form-control" name="qty" id="qty" placeholder="price" />
                    </div>
                  </div>

                  <div className="d-flex w-100 mb-3">
                    <label htmlFor="name" className="col-sm-4 control-label me-2">Upload</label>
                    <div className="col-sm-3">
                      <label className="control-label small" htmlFor="file_img">Image (jpg/png):</label>
                      <input onChange={(e) => catchImage(e)} type="file" name="file_img" />
                    </div>

                  </div>

                  <hr />
                  <div className="d-flex w-100 mb-3">
                    <div className="col-sm-offset-3 col-sm-9">
                      <button type="submit" disabled={isloading} style={{ width: "100px", height: "40px" }} onClick={(e) => handleSubmit(e)} className="btn btn-dark  d-flex align-items-center justify-content-center"> {isloading ? <main>
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
                      </main> : 'Submit'}</button>
                      <ToastContainer />
                    </div>
                  </div>
                </form>




              </div>





            </div>


          </div>



          <div className="d-flex mt-1 align-items-center justify-content-center p-2 shadow mb-2  rounded" style={{ width: "95%", backgroundColor: "white" }}>
            <div className="d-flex align-items-start justify-content-between flex-column " style={{ width: "98%" }}>
              <div className="mt-2">
                <h6 style={{ fontWeight: "600" }}> Update Products</h6>
                <input type='search' placeholder='Search by name' onChange={(e) => setSearcher(e.target.value.toLowerCase())} />

              </div>

              <div style={{ width: "100%", height: "fit-content" }}>

                <ProductList products={fliteredProducts} />

              </div>

            </div>



          </div>

        </>


      }




    </div>












  )
}

export default Adminpage