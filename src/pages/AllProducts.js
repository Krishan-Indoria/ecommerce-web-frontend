import React, { useState } from 'react'


import UploadProducts from './UploadProducts'
const AllProducts = () => {

  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  return (
    <div>
      <div className='bg-white p-2 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Products</h2>
        <button className='border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white transition-all rounded-full py-1 px-2 font-medium' onClick={() => setOpenUploadProduct(true)}>Add Product</button>
      </div>
      {/* {upload product popup page} */}

      { openUploadProduct && ( <UploadProducts onClose = {() => setOpenUploadProduct(false)}/>) }
     
    </div>
  )
}

export default AllProducts