import React from 'react'
import '/src/Components/category-items/categories.styles.scss'
import { useNavigate } from 'react-router-dom'

const CategoryItems = ({ category: { title, imageUrl, id } }) => {
  const navigate = useNavigate()

  const seeMore = (title) => {
    console.log(title);
    navigate(`/category/${title}`)
  }


  return (

    <div data-aos="fade-up" onClick={() => seeMore(title)} className='category-container ' style={{
      backgroundImage: `url(${imageUrl})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',

    }} >
      <div className='category-body-container' data-aos="zoom-in"
      >
        <h2 className='bg-light'> {title} </h2>
        <p className='bg-light mt-2'> Shop Now</p>
      </div>


    </div>


  )
}

export default CategoryItems