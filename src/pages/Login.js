import React, { useState ,useContext} from 'react'
import loginImage from '../assets/img/user-profile1.jpeg';
import { FaRegEye } from "react-icons/fa";
import { IoIosEyeOff } from "react-icons/io";
import { Link , useNavigate} from 'react-router-dom';
import { serverPath } from '../helpers/constant';
import { toast } from 'react-toastify';
import Context from '../context/index'

const Login = () => {
    const [showPassword,setShowPassword] = useState(false);
    const [data,setData] = useState({
        email : "",
        password : ""
    })
    const navigate = useNavigate();
    const {fetchUserDetails} = useContext(Context)
    // console.log("userdetails - ",fetchUserDetails() )
    const handleOnChange = (e) => {
        const { name , value} = e.target;

        setData((prev) => {
            return {
                ...prev,
                [name] : value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const apiUrl = `${serverPath}/api/users/signin`;
        const apiResponse = await fetch(apiUrl,{
            method : 'POST',
            credentials : 'include',
            headers : {
                'content-type' : 'application/json',
                // 'Access-Control-Allow-Origin': '*',
            },
            body : JSON.stringify(data)
        })

        const dataResponse = await apiResponse.json();

        if(dataResponse.success){
            toast.success(dataResponse.message);
            navigate('/')
            fetchUserDetails()
        }
        if(dataResponse.error){
            toast.error(dataResponse.message);
        }
        
    }
    return (
        <section id='login'>
            <div className='mx-auto container p-4'>

                <div className='bg-gray-50 p-5 py-5 w-full max-w-sm mx-auto mt-20 bg-transparent rounded shadow-md'>

                    <div className='w-20 h-20 text-teal-400 bg-teal-400 mx-auto rounded-full'>
                        <img className='' src={loginImage} alt='profile-image' />
                    </div>

                    <form className='pt-6' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label>Email : </label>
                            <div className='bg-slate-100 p-2'>
                                <input 
                                type='email'
                                placeholder='enter email' 
                                name = 'email'
                                onChange = {handleOnChange}
                                value = {data.email}
                                required
                                className='w-full h-full outline-none bg-transparent'></input>
                            </div>
                        </div>
                        <div>
                            <label>Password : </label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input type={ showPassword ? "text" : "password"}
                                 placeholder='enter password'
                                  name = 'password'
                                  value = {data.password}
                                  onChange={handleOnChange}
                                  required
                                  className='w-full h-full outline-none bg-transparent'></input>
                                <div className='cursor-pointer text-xl' onClick = {()=> setShowPassword((prev) => !prev)} >
                                    <span>
                                    {
                                    showPassword ? (
                                        <FaRegEye/>
                                    ) : 
                                    (
                                        <IoIosEyeOff/>
                                    )
                                    }
                                    </span>
                                </div>
                            </div>
                            <Link to = {'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-teal-700'>Forgot-password?</Link>
                        </div>
                        <button className='bg-teal-600 text-white  px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Login</button>
                    </form>
                    <p className='py-5'>Don't have an account? <Link to={'/sign-up'} className='w-fit text-teal-500 hover:underline hover:text-teal-700'>Sign-up</Link></p>
                </div>
            </div>
        </section>
    )
}

export default Login