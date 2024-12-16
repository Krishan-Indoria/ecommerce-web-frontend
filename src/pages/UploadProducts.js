import React, { useState } from 'react'
import { CgClose } from "react-icons/cg"

const UploadProducts = ({onClose}) => {
const [data , setData] = useState({
        productName : "",
        brandName  : "",
        category : "",
        productImage : "",
        description : "",
        price : "",
        selling : ""
})
  return (
    <div className='fixed w-full h-full  bottom-0 top-0 left-0 right-0 flex justify-center items-center bg-slate-200 bg-opacity-40'>
        <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[75%]'>
            <div className='flex justify-between items-center'>
                <h3 className='font-bold text-lg'>Add Product</h3>
                <div className='w-fit ml-auto text-2xl hover:text-red-600' onClick={() => onClose()}>
                <CgClose />
                </div>
            </div>

            <div>
              <form>
                <div>
                  <label>Product Name</label>
                  <input type='text' name='productName'></input>
                </div>
                <div>
                  <label>Brand Name</label>
                  <input type='text' name='brandName'></input>
                </div>
                <div>
                  <label>Category</label>
                  <input type='text' name='category'></input>
                </div>
                <div>
                  <label>Price</label>
                  <input type='text' name='price'></input>
                </div>
                <div>
                  <label>Selling</label>
                  <input type='text' name='selling'></input>
                </div>
                <div>
                  <label>Product Image</label>
                  <input type='file' name='productImage'></input>
                </div>
                <div>
                  <label>Description</label>
                  <input type='text' name='description'></input>
                </div>
                <button type="submit" value={"Add Product"} >Add Product</button>
              </form>
            </div>
        </div>
        
        
    </div>
  )
}

export default UploadProducts