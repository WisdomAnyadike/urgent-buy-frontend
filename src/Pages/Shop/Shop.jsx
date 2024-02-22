import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProductCard from '../../Components/Product Card/ProductCard'
import '/src/Pages/Shop/shop.styles.scss'
import { ToastContainer } from 'react-toastify';

const Shop = () => {
 
  let [datas, setData] = useState([])

  useEffect(() => {
    axios.get('https://urgent-buy-backend.onrender.com/Api/Products/getProducts').then((res) => {
      setData(res.data.data);
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <div className='products-container'>
      {datas.map((data) =>
        <ProductCard key={data._id}  data={data} />
      )}
<ToastContainer
  position='bottom-left'
//   progressStyle={{
//   backgroundColor : '#4e05b2'
// }
// }
toastStyle={{ backgroundColor : 'white',
color:"BFE5B9"}}
/>
    </div>
  )
}

export default Shop