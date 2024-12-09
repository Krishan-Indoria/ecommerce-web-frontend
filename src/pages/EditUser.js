import React from 'react'
import { RxCross2 } from "react-icons/rx";
import {useState} from 'react'
import { serverPath } from '../helpers/constant';
import { toast } from 'react-toastify'
const EditUser = ({user,onClose}) => {

  // console.log(user);
  const [userData, setUserData] = useState({
    name : user?.name || "",
    email : user?.email || "",
    userType: user?.userType || "",
  })


  const handleOnChange = (e) => {
      const { name , value} = e.target;
      setUserData((prev) => {
        return {
          ...prev,
          [name] : value
        }
      })
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    //  console.log("updateUserData : " + userData,
    //  );
     const updateUser = async (user) => {
        console.log(user);
        const apiUrl = `${serverPath}/api/users/updateUser/${user?.id}`
        const apiResponse = await fetch(apiUrl,{
                 method : 'POST',
                 credentials: 'include',
                 headers : {
                  'content-type' : 'application/json',
                  // 'Access-Control-Allow-Origin': '*',
              },
              body : JSON.stringify(userData)
        })
        const apiData = await apiResponse.json();
        if(apiData.success){
                 toast.success(apiData.message)
                 onClose();
        }else{
         toast.error(apiData.message);
         onClose();
         console.log(apiData.data);
        }
     }
     updateUser(user);
  }
  return (
    <div className=' fixed top-0 bottom-0 right-0 left-0 w-full h-full z-10 flex justify-center items-center rounded bg-slate-200 bg-opacity-40'>
      <div className='w-full mx-auto bg-white shadow-md max-w-sm text-teal-700 p-2' >
        <button onClick={() => onClose()} className='text-2xl font-medium rounded-full p-1 hover:bg-red-500 hover:text-white block ml-auto text-slate-900'><RxCross2 /></button>
        <h4 className='flex justify-center text-slate-900' >User Info</h4>
        <form className='p-4 ' onSubmit={handleOnSubmit}>
          <div className='mb-4 flex items-center w-full'>
            <label className='mr-4 w-26 text-right font-medium'>Name: </label>
            <input type='text' name="name" className='w-full border-box flex-1 outline-none border-b-2 bg-white'  value={userData.name} onChange={handleOnChange} required/>
          </div>
          <div className='mb-4 flex items-center '>
            <label className='mr-4 w-26 text-right font-medium'>Email: </label>
            <input type='email' name="email" className='w-full border-box flex-1 outline-none mx-1 border-b-2 bg-white' value={ userData.email} onChange={handleOnChange} required />
          </div>
          <div className='mb-4 flex items-center justify-between'>
            <label className='mr-4 w-26 text-right font-medium'>UserType: </label>
            <select name="userType"  className='border-teal-800  w-20 mx-10 flex-1  outline-none border-2' value ={userData.userType} onChange={handleOnChange}  required>
              <option value={"Admin"}>Admin</option>
              <option value={"General"}>General</option>
            </select>
          </div>
          <button type='submit' className='px-2 py-1 font-medium border-none bg-teal-600 hover:bg-teal-700 text-white rounded'>Edit-User</button>

        </form>
      </div>
    </div>
  )
}

export default EditUser;