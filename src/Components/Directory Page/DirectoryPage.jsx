import React from 'react'
import '/src/Components/Directory Page/directory.styles.scss'
import CategoryItems from '../category-items/CategoryItems'

const DirectoryPage = () => {
const catergories = [
  {
    title: 'Hats',
    imageUrl: 'https://i.pinimg.com/originals/69/5a/1e/695a1eb459ecd6e6f7d0e04e64bfaadc.jpg',
    id: 1,
    linkUrl: 'shop/hats'
  },
  {
    title: 'Jackets',
    imageUrl: 'https://s3.amazonaws.com/images.nidacaserta.it/P23---BALENCIAGA---725275-TYD361000_4_P.JPG',
    id: 2,
    linkUrl: 'shop/jackets'
  },
  {
    title: 'Trainers',
    imageUrl: 'https://media.glamourmagazine.co.uk/photos/63064ad263d110ee64653af0/16:9/w_2580,c_limit/WHITE%20TRAINERS%20240822%20MAIN.jpg',
    id: 3,
    linkUrl: 'shop/sneakers'
  },
  {
    title: 'Womens',
    imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
    size: 'large',
    id: 4,
    linkUrl: 'shop/womens'
  },
  {
    title: 'Mens',
    imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
    size: 'large',
    id: 5,
    linkUrl: 'shop/mens'
  }
]

  return (
    <div className='directory-container'>

    {catergories.map((category)=> 
    <CategoryItems key={category.id} category={category}  />
 
    
    )}
  
    


    </div>
  )
}

export default DirectoryPage