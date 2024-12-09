
import React, { useState } from 'react'
import loginImage from '../assets/img/user-profile1.jpeg';
import { FaRegEye } from "react-icons/fa";
import { IoIosEyeOff } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { imageTobase64 } from '../helpers/ImageTobase64'
import { serverPath } from '../helpers/constant'
import { toast } from 'react-toastify';
const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        profilePic: ""
    })
    const navigate = useNavigate();
    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const handleUploadPic = async (e) => {
        const file = e.target.files[0];

        const imagePic = await imageTobase64(file);


        setData((prev) => {
            return {
                ...prev,
                profilePic: imagePic
            }
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (data.password === data.confirmPassword) {
            const apiUrl = `${serverPath}/api/users/signup`;

            let apiResponse = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(data)
            })

            const dataResponse = await apiResponse.json();
            if (dataResponse.success) {
                toast.success(dataResponse.message);
                navigate('/login')
            }
            if (dataResponse.error) {
                toast.error(dataResponse.message);
            };
        } else {
            toast.error('password & confirmPassword does not match!');
        }
    }
    return (
        <section id='signup'>
            <div className='mx-auto container p-4'>

                <div className='bg-gray-50 p-5 py-5 w-full max-w-sm mx-auto mt-20 bg-transparent rounded shadow-md'>

                    <div className='w-20 h-20 mx-auto rounded-full relative overflow-hidden'>
                        <div>
                            <img className='' src={data.profilePic || loginImage} alt='profile-image' />
                        </div>
                        <form>
                            <label>
                                <div className='text-xs text-center  bg-opacity-80 absolute  bottom-0 bg-slate-100 pb-4 pt-2 w-full cursor-pointer'>
                                    Upload Photo
                                </div>
                                <input type='file' className='hidden' onChange={handleUploadPic} />
                            </label>
                        </form>

                    </div>

                    <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label>Name : </label>
                            <div className='bg-slate-100 p-2'>
                                <input
                                    type='text'
                                    placeholder='enter your name'
                                    name='name'
                                    onChange={handleOnChange}
                                    value={data.name}
                                    required
                                    className='w-full h-full outline-none bg-transparent'></input>
                            </div>
                        </div>
                        <div className='grid'>
                            <label>Email : </label>
                            <div className='bg-slate-100 p-2'>
                                <input
                                    type='email'
                                    placeholder='enter email'
                                    name='email'
                                    onChange={handleOnChange}
                                    value={data.email}
                                    required
                                    className='w-full h-full outline-none bg-transparent'></input>
                            </div>
                        </div>
                        <div>
                            <label>Password : </label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input type={showPassword ? "text" : "password"}
                                    placeholder='enter password'
                                    name='password'
                                    value={data.password}
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent'></input>
                                <div className='cursor-pointer text-xl' onClick={() => setShowPassword((prev) => !prev)} >
                                    <span>
                                        {
                                            showPassword ? (
                                                <FaRegEye />
                                            ) :
                                                (
                                                    <IoIosEyeOff />
                                                )
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label>Confirm Password : </label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input type={showConfirmPassword ? "text" : "password"}
                                    placeholder='re-enter password'
                                    name='confirmPassword'
                                    value={data.confirmPassword}
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent'></input>
                                <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword((prev) => !prev)} >
                                    <span>
                                        {
                                            showConfirmPassword ? (
                                                <FaRegEye />
                                            ) :
                                                (
                                                    <IoIosEyeOff />
                                                )
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button className='bg-teal-600 text-white  px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Sign Up</button>
                    </form>
                    <p className='py-5'>Already have an account? <Link to={'/login'} className='w-fit text-teal-500 hover:underline hover:text-teal-700'>Login</Link></p>
                </div>
            </div>
        </section>
    )
}

export default SignUp