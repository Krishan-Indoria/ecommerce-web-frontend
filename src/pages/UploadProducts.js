import React, { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { serverPath } from '../helpers/constant';
const UploadProducts = ({ onClose }) => {
  const [categories,setCategoies] = useState([]);
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: "",
    description: "",
    price: "",
    selling: "",
  });
console.log(data);
  const handleOnChange = (e) => {
    const { name , value} = e.target;

    setData((prev) => {
        return {
            ...prev,
            [name] : value
        }
    })
}
 const handleUploadedImages = (e) => {
        const files = e.target.files[0];
 }

//  const handleCategoryChange = (e) => {
//       const 
//  }
  const handleSubmit = (e) => {
    e.preventDefault();
  }
  const getCategory = async () => {
   const apiUrl = `${serverPath}/api/products/categories`;
   const apiResponse = await fetch(apiUrl, {
                 method : 'Get',
                 credentials: 'include',
                 headers : {
                  'content-type' : 'application/json',
                  // 'Access-Control-Allow-Origin': '*',
              },
   })
    const apiData = await apiResponse.json();
           if(apiData.success){
            setCategoies(apiData.data);
           }else{
            console.log(apiData.data);
           }
  }
  useEffect(() => {
    getCategory();
  },[])
  return (
    <div className="fixed w-full h-full  bottom-0 top-0 left-0 right-0 flex justify-center items-center bg-slate-200 bg-opacity-40">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[75%]">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">Add Product</h3>
          <div
            className="w-fit ml-auto text-2xl hover:text-red-600"
            onClick={() => onClose()}
          >
            <CgClose />
          </div>
        </div>

        <div className="mx-auto font-semibold text-white flex justify-center mt-8 bg-teal-600 p-4 rounded">
          <form className="flex flex-col " onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="productName" className="flex flex-row justify-end">
                Product Name
                <input
                  className="ml-10  px-2 h-7 text-sm border rounded text-teal-600"
                  type="text"
                  name="productName"
                  id="productName"
                  onChange = {handleOnChange}
                  value =  {data.productName}
                  required
                />
              </label>
            </div>
            <div className="mb-4">
              <label htmlFor="brandName" className="flex flex-row justify-end">
                Brand Name
                <input
                  className="ml-10  px-2 h-7 text-sm border rounded text-teal-600"
                  type="text"
                  name="brandName"
                  id="brandName"
                  onChange = {handleOnChange}
                  value =  {data.brandName}
                />
              </label>
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="flex  justify-end">
                Category
                <select name="category" id="category" onChange = {handleOnChange} className="ml-10 w-48 border px-2 h-7 text-sm rounded text-teal-600">
                <option value="">Please choose category!</option>
                { categories.length &&  categories.map((category) => {
                  return (
                      <option key={category.id} value = {category.id}>{category.name}</option>
                  )
                }) }
                </select>
              </label>
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="flex flex-row justify-end">
                Price
                <input
                  className="ml-10 border px-2 h-7 text-sm rounded text-teal-600"
                  type="text"
                  name="price"
                  id="price"
                  onChange = {handleOnChange}
                  value =  {data.price}
                  required
                />
              </label>
            </div>
            <div className="mb-4">
              <label  htmlFor="selling" className="flex flex-row justify-end">
                Selling
                <input
                  className="ml-10 border px-2 h-7 text-sm rounded text-teal-600"
                  type="text"
                  name="selling"
                  id="selling"
                  onChange = {handleOnChange}
                  value =  {data.selling}
                />
              </label>
            </div>
            <div className="mb-4">
              <label htmlFor="description"  className="flex flex-row justify-end">
                Description
                <input
                  className="ml-10 border px-2 h-7 text-sm rounded text-teal-600"
                  type="text"
                  name="description"
                  id="description"
                  onChange = {handleOnChange}
                  value =  {data.description}
                />
              </label>
            </div>
            <div className="mb-4 flex flex-row justify-end">
              <label htmlFor="productImage" className="flex flex-row justify-end cursor-pointer border border-white w-fit rounded p-1">
                Upload Image
                <input
                  className="ml-10 px-2 h-7 text-sm rounded text-teal-600 hidden"
                  type="file"
                  name="productImage"
                  id="productImage"
                  onChange = {handleUploadedImages}
                  // value =  {data.productImage}
                />
              </label>
            </div>
            <button
              type="submit"
              value={"Add Product"}
              className="border-2 border-white rounded-full w-fit py-1 px-2  hover:bg-white hover:text-teal-600 transition-all"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadProducts;
