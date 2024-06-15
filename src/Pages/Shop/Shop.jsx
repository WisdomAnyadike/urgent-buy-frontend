import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProductCard from '../../Components/Product Card/ProductCard'
import '/src/Pages/Shop/shop.styles.scss'
import { ToastContainer } from 'react-toastify';
import { Divider, Form, Radio, Skeleton, Space, Switch } from 'antd';
import Ads from '../../Components/ad/ads';

const Shop = () => {
  const array = [0, 1, 2, 3, 4, 5, 6, 7]
  const [datas, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    axios.get('https://ecom-backend-mezo.onrender.com/Api/Products/getProducts').then((res) => {
      setIsLoading(false)
      setData(res.data.data);

    }).catch((err) => {
      console.log(err);
    })
  }, [])



  console.log(datas);
  return (
    <>
      <Ads />
      <div >
        {
          isLoading ? <div className='w-100 d-flex mt-0 flex-wrap justify-content-around ' style={{ marginTop: "80px" }}>
            {array.map(() =>
              <Skeleton.Button className=' mb-2 ' active={true} style={{ width: '300px', height: '320px', minWidth: "280px" }} />
            )}

          </div> :


            <div className='products-container mt-0'>

              {datas.map((data) =>
                <ProductCard key={data._id} data={data} loading={isLoading} />
              )}
            </div>




        }

        <ToastContainer
          position='bottom-right'
            progressStyle={{
            backgroundColor : '#black'
          }
          }
          toastStyle={{
            backgroundColor: 'rgb(46, 46, 46)',
            color: "white"
          }}/>
      </div>
    </>
  )
}

export default Shop