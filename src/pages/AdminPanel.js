import {React}from 'react'
import { FaRegUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link ,Outlet, useNavigate} from 'react-router-dom';
import { TbUsersPlus } from "react-icons/tb";
import { AiOutlineProduct } from "react-icons/ai";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  if(user){
    if(user?.userType === "General"){
    navigate('/')
    }
  }
  return (
    <div className='min-h-[calc(100vh-120px)] md:flex hidden  '>
      <aside className='bg-teal-700 min-h-full w-full max-w-60 shadow-md text-white'>
        <div className='w-full p-1 flex flex-col  items-center justify-center'>
          <div className='text-3xl cursor-pointer text-teal-800 mt-10'>
            {user?.profilePic ? (<img src={user.profilePic} className='w-20 h-20 rounded-full' alt={user?.name} />) : (<FaRegUserCircle className='w-16 h-16 text-white' />)}
          </div>
          <p className='capatilize text-xl pt-2 font-semibold'>{user?.name || "USER"}</p>
          <p className='text-sm mt-0'>{user?.userType}</p>
        </div>
        <hr className='w-full'/>
        <div>
          <nav className='grid p-4'>
            <div className='flex flex-row w-full  hover:bg-teal-800 p-2 items-center'>
            <TbUsersPlus className='mx-2'/>
            <Link to={'all-users'} className='px-1 text-white text-decoration-none '>All Users</Link>
            </div>
            <div className='flex flex-row w-full  hover:bg-teal-800 p-2 items-center'>
            < AiOutlineProduct className='mx-2'/>
            <Link to={'product-list'} className='px-1  text-white text-decoration-none'>Products</Link>
            </div>
          </nav>
        </div>
      </aside>
      <main className='w-full h-full p-2'>
        <Outlet/>
      </main>


    </div>
  )
}

export default AdminPanel