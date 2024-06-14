import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../../Components/Product Card/ProductCard'
import { ToastContainer } from 'react-toastify';
import { Skeleton } from 'antd';
import Ads from '../../Components/ad/ads';



const ShopPage = () => {
  let [datas, setData] = useState([])
  const { category } = useParams()
  const array = [0, 1, 2, 3, 4, 5, 6, 7]
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios.get(`https://ecommerce-backend-pq9c.onrender.com/Api/Products/getProductsByCategory/${category}`).then((res) => {
      setData(res.data.product)
      setIsLoading(false)
    }
    ).catch((err) => console.log(err))
  }, [])

  console.log(category);
  return (
    <div className='products-container'>
      <h4 className='w-100  mb-0 d-flex border align-items-center justify-content-center'> {category} </h4>
      <Ads style={'ms-0'}/>

      {
        isLoading || datas.length == 0 ? <div className='w-100 d-flex flex-wrap justify-content-around mt-2' >
          {array.map(() =>
            <Skeleton.Button className=' mb-2 ' active={true} style={{ width: '300px', height: '320px', minWidth: "280px" }} />
          )}

        </div> :
          <>
            {datas.map((data) =>
              <ProductCard key={data.id} data={data} />
            )}
            <ToastContainer
              position='bottom-left'
              toastStyle={{
                backgroundColor: 'white',
                color: "BFE5B9"
              }}
            />
          </>
      }
    </div>
  )
}

export default ShopPage