import React from 'react'
import { Link } from "react-router-dom";
import logoImage from "../assets/img/shoping-basket.jpg";

const Logo = (props) => {
    let classes = `w-${props.width} h-${props.height}  text-${props.color} text-${props.size} mx-1  outline-none `
    

  return (
    
        <div>
            <Link to="/">
                <img src={logoImage} alt = "APP-LOGO" className={classes}/>
                {/* <small  className='font-serif font-medium'>Taxon-Shop</small> */}
            </Link>
        </div>
    
  )
}

export default Logo