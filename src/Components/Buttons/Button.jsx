import React from 'react'
import '/src/Components/Buttons/Buttons.styles.scss'




const Button = ({children , buttonType , styles , func , btype}) => {
    const ButtonComponent = {
        normal: 'normal-button' ,
        inverted : 'inverted'
     }

  return (
    <>
 <button onClick={func} type={btype} className={`button-container rounded ${ButtonComponent[buttonType]}  ${styles} `} > {children} </button>
    </>
   
  )
}

export default Button