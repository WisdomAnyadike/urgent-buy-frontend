// import { useState } from "react";
// import { createContext } from "react";
// import  products from  '/urgent buy/urgentbuy.json'

// export const ProductContext = createContext({
//     Products: [],
//     setProducts: () => null
// })

// export const ProductProvider = ({ children }) => {
//     const [Products, setProducts] = useState(products)
//     const productValue = { Products, setProducts }

//     return (
//         <ProductContext.Provider value={productValue}>
//             {children}
//         </ProductContext.Provider>
//     )
// }