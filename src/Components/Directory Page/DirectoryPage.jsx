import React from 'react'
import '/src/Components/Directory Page/directory.styles.scss'
import CategoryItems from '../category-items/CategoryItems'

const DirectoryPage = () => {
const catergories = [
  {
    title: 'Injections',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0070/7032/files/how-to-start-a-skincare-line-glow-oasis.jpg?v=1666895341',
    id: 1,
    linkUrl: 'shop/hats'
  },
  {
    title: 'Serums',
    imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/flawlessskin-1589384044.png?crop=0.5xw:1xh;center,top&resize=640:*',
    id: 2,
    linkUrl: 'shop/jackets'
  },
  {
    title: 'Masks',
    imageUrl: 'https://www.forestessentialsindia.com/blog/wp-content/uploads/2021/12/1-1.jpg',
    id: 3,
    linkUrl: 'shop/sneakers'
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
    imageUrl: 'https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2022/01/skin_care_different_skin_types_1296x728_header-1024x575.jpg?w=1155&h=1528',
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