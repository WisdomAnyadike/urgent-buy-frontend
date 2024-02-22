import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../../Components/Product Card/ProductCard'
import { ToastContainer } from 'react-toastify';


const ShopPage = () => {
  let [datas, setData] = useState([])
  const {category} = useParams()

  useEffect(()=> {
axios.get(`http://localhost:4000/Api/Products/getProductsByCategory/${category}`).then((res)=> 
setData(res.data.product)
).catch((err)=> console.log(err))
  }, [])

  console.log(category);
  return (
    <div className='products-container'>
    <h4 className='w-100 ms-3 mb-2 d-flex align-items-center justify-content-start'>{category} </h4>
    
    {datas.map((data) =>
      <ProductCard key={data.id}  data={data} />
    )}
<ToastContainer
position='bottom-left'
toastStyle={{ backgroundColor : 'white',
color:"BFE5B9"}}
/>
  </div>
  )
}

export default ShopPage