import React from 'react'
import '/src/Components/Directory Page/directory.styles.scss'
import CategoryItems from '../category-items/CategoryItems'

const DirectoryPage = () => {
const catergories = [
  {
    title: 'Skincare',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0070/7032/files/how-to-start-a-skincare-line-glow-oasis.jpg?v=1666895341',
    id: 1,
    linkUrl: 'shop/skincare'
  },
  {
    title: 'Cosmetics',
    imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/flawlessskin-1589384044.png?crop=0.5xw:1xh;center,top&resize=640:*',
    id: 2,
    linkUrl: 'shop/cosmetics'
  },
  {
    title: 'Supplements',
    imageUrl: 'https://www.forestessentialsindia.com/blog/wp-content/uploads/2021/12/1-1.jpg',
    id: 3,
    linkUrl: 'shop/supplements'
  },
  {
    title: 'Womens',
    imageUrl: 'https://www.revivalabs.com/wp-content/uploads/2023/07/power-of-daily-skincare-happy-african-american-la-2023-05-11-20-11-36-utc.jpg',
    size: 'large',
    id: 4,
    linkUrl: 'shop/womens'
  },
  {
    title: 'Mens',
    imageUrl: 'https://assets.nutrisense.io/62e18da95149ec2ee0d87b5b/65971a24ecda8be4af55505b_64b5c98d134cf435f44d882f_643cf6b3637c322d630fb241_thumbnail-skincare-tips-for-men.webp',
    size: 'large',
    id: 5,
    linkUrl: 'shop/mens'
  }
]

  return (
    <div className='directory-container ' data-aos="slide-up">

    {catergories.map((category)=> 
    <CategoryItems key={category.id} category={category}  />
 
    
    )}
  
    


    </div>
  )
}

export default DirectoryPage