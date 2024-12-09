import React from 'react'
import Logo from './Logo';
import { IoSearch } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { PiShoppingCartFill } from "react-icons/pi";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { serverPath } from '../helpers/constant';
// import { refreshPage } from '../helpers/refreshPage';
import { toast } from 'react-toastify'
import { setUserDetails } from '../store/userSlice';
const Header = () => {
  
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch()
  
  const handleLogout = async () => {
    const apiUrl = `${serverPath}/api/users/user-logout`;
    const apiResponse = await fetch(apiUrl, {
      method: "GET",
      credentials: "include"
    });

    const dataResponse = await apiResponse.json();

    if (dataResponse.success) {
      toast.success(dataResponse.message)
        dispatch(setUserDetails(null));
    }
    if (dataResponse.error) {
      toast.error(dataResponse.message)
    }
  }
  return (
    <header className='h-17 shadow-md'>
      <div className='h-full container mx-auto flex px-4 items-center justify-between'>
        <div className='w-60 h-16 relative items-center'>

          <Logo width={20} height={12} color={"teal-600"} size={"xs"} />
          <div className='text-teal-600 hidden md:flex font-serif absolute top-3 left-20 md:text-3xl sm:text-xs p-2 cursor-pointer'>
              TaxonMart
          </div>
        </div>
        <div className=' hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-2'>
          <input type='text' placeholder='search product here...' className='w-full outline-none ' />
          <div className='text-lg min-w-[50px] h-9 flex items-center justify-center bg-teal-600 rounded-r-full text-white hover:bg-teal-500'>
            <IoSearch />
          </div>
        </div>
        <div className='flex items-center justify-center gap-7'>
          <div className='text-3xl cursor-pointer text-teal-800'>
            {user?.profilePic ? (<img src={user.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />) : (<FaRegUserCircle />)}
          </div>
          <div className='flex  items-center justify-center relative '>
            <span className='text-3xl text-teal-700' ><PiShoppingCartFill /></span>
            <div className='d-flex justify-content-center w-5 p-2  bg-teal-600 h-5 rounded-full absolute -top-2 -right-3'>
              <p className='text-xs text-white  position-absolute top-50 start-50  translate-middle'>0</p>
            </div>
          </div>
          <div className=''>{
            user?._id ?
              (<button onClick={handleLogout} className='bg-teal-700 text-white px-2 py-1 rounded-full w-full hover:bg-teal-600' >Logout</button>) :
              (
                <Link to={"/login"} className='bg-teal-700 text-white px-2 py-1 rounded-full w-full hover:bg-teal-600 text-decoration-none'>Login</Link>
              )


          }
          </div>
        </div>
      </div>
    </header>


  )
}

export default Header;