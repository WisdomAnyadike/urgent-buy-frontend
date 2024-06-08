import React from 'react'
import AOS from 'aos';
import { useEffect } from 'react';



const Animate = ({ children }) => {


    useEffect(() => {
        AOS.init({
          duration: 1000, // Animation duration
          easing: 'ease-in-out', // Animation easing
          once: true, // Whether animation should happen only once
        });
      }, []);


    return (
        <div>
            {children}

        </div>
    )
}

export default Animate