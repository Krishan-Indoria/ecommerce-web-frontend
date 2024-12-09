import React, { useEffect, useState } from 'react'
import { serverPath } from '../helpers/constant';
import { DateRangePicker } from 'rsuite';
import Moment from 'moment';
// import { FaArrowsAlt, FaCalendarCheck } from 'react-icons/fa';
import { Input, InputGroup } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import 'rsuite/dist/rsuite.min.css';
// import { MdEditCalendar } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import ConfirmAlert from "../components/ConfirmAlert"
import { toast } from 'react-toastify'
import EditUser from './EditUser';
const AllUser = () => {
    const { afterToday } = DateRangePicker;

    const [currentPage, setCurrentPage] = useState(1);
    const [userType, setUserType] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [datalength, setDatalength] = useState(0);
    const [dateRange, setDateRange] = useState({
        from: null,
        to: null,
        arr: []
    });
    const [allUser, setallUser] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [userChoice, setUserChoice] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userEdit , setUserEdit] = useState({
        user_id : "",
        name : "",
        email : "",
        userType : ""
    });
    const [isupdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

    const perPage = 2;
   
   
    const handleCurrentPage = (page) => {
        setCurrentPage(page);
    }
    const handleEdit = (user) => {
         
        const obj = {
            id : user._id,
            name : user.name,
            email : user.email,
            userType : user.userType
        }
        setUserEdit({...obj});
        setIsUpdateDialogOpen(true);
    }
    // console.log(userData);
    const handleUserType = (user_type) => {
        setUserType(user_type);
    }
    const handleSearchValue = (search_value) => {
        setSearchValue(search_value);
    }

    const handleDateRange = (date_value) => {
        setDateRange((prev) => ({ ...prev, from: new Date(date_value?.[0]), to: new Date(date_value?.[1]) }));
    }
    const removeDateRange = (date_value) => {
        setDateRange((prev) => ({ ...prev, from: null, to: null }));
    }
    // console.log(dateRange);
    let numberOfPages = Math.ceil(datalength / perPage)
    let pageIndex = Array.from({ length: numberOfPages }, (_, idx) => idx + 1);

    // fetch All user function
    const fetchAllUser = async () => {
        const apiUrl = `${serverPath}/api/users/all-users`;
        // console.log(dateRange);
        const apiResponse = await fetch(apiUrl + '?' + new URLSearchParams({
            currentPage: currentPage,
            perPage: perPage,
            userType: userType,
            searchValue: searchValue,
            dateRange: JSON.stringify(dateRange)
        }).toString(), {
            mehtod: 'GET',
            credentials: 'include'
        })

        const apiData = await apiResponse.json();
        if (apiData.success) {
            setallUser(apiData.data.data);
            setDatalength(apiData.data.metadata.totalCount)
        }
    }

    //delete user functionality
    const handleDeleteClick = (userId) => {
        setIsDialogOpen(true);
        console.log("user shouldbe deleted");
        setUserId(userId);
    }

    const handleConfirm = () => {
        setUserChoice(true);  // User chose OK
        setIsDialogOpen(false);  // Close dialog
        // console.log("userID" + userId);
        const deleteUser = async () => {
            const apiUrl = `${serverPath}/api/users/delete-user/${userId}`
            const apiResponse = await fetch(apiUrl, {
                method: 'GET',
                credentials: 'include'
            })
            const apiData = await apiResponse.json();
            if (apiData.success) {
                toast.success(apiData.message)
                setUserId(null);
            } else {
                toast.error(apiData.message);
                console.log(apiData.data);
                setUserId(null);
            }
        }

        deleteUser();
        setUserId(null);

    };

    const handleCancel = () => {
        setUserChoice(false);  // User chose Cancel
        setIsDialogOpen(false);  // Close dialog
        setUserId(null);
    };
    const handleClose = () => {
        setIsUpdateDialogOpen(false);
    };
    useEffect(() => {
        fetchAllUser();
    }, [currentPage, userType, dateRange, searchValue,isupdateDialogOpen])
    return (
        <>
            <h3>Users</h3>
            {/* filters for users */}
            <div>
                <div className='flex flex-row gap-4 justify-center'>
                    <div className='relative'>
                        <DateRangePicker size='lg' placeholder="Select Date Range" shouldDisableDate={afterToday()} className='' onChange={(value) => handleDateRange(value)} value={dateRange.arr} />
                        <button className={dateRange.from == null ? "hidden" : "absolute right-3 top-2.5 border-solid bg-teal-600 hover:bg-slate-50"} onClick={removeDateRange}><RxCross2 className='text-2xl text-slate-50 hover:text-red-500' /></button>
                    </div>
                    <div>
                        <InputGroup size='lg' style={{ color: 'teal' }}>
                            <Input placeholder={"email or name..."} onChange={handleSearchValue} />
                            <SearchIcon size='lg' className='text-2xl items-center mr-3 mt-2' />
                        </InputGroup>
                    </div>
                    <div className="dropdown">
                        <button className="bg-teal-600 hover:bg-teal-700 border-solid rounded px-2 py-2 text-white shadow-md" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                            User-Type
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                            <li className='hover:bg-slate-300 text-emerald-600' ><button className="px-3  hover:text-white" type="button" onClick={(e) => handleUserType(e.target.value)} value={"Admin"}>Admin</button></li>
                            <li className='hover:bg-slate-300 text-emerald-600'><button className="px-3  hover:text-white" type="button" onClick={(e) => handleUserType(e.target.value)} value={"General"}>General</button></li>
                            <li className='hover:bg-slate-300 text-emerald-600'><button className="px-3  hover:text-white" type="button" onClick={(e) => handleUserType(e.target.value)} value={""}>all</button></li>
                        </ul>
                    </div>
                </div>
            </div>



            {/* users table */}
            <div className="w-full bg-gray-100 min-h-[calc(80vh-120px)] mt-12 mx-auto p-4">
                <table className="table table-fixed h-full justify-center">
                    <caption>List of users</caption>
                    <thead className='border-solid border-b-2 text-teal-700 table-dark'>
                        <tr className='text-start text-teal-800'>
                            <th>#</th>
                            <th className=''>Name</th>
                            <th>Email</th>
                            <th>UserType</th>
                            <th>CreatedAt</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {allUser.length ?
                            (allUser.map((user, idx) => {
                                return (
                                    <tr key={idx} className='text-wrap  font-normal hover:bg-slate-400'>
                                        <td className='text-wrap  overflow-hidden'>{idx + 1}</td>
                                        <td className='text-wrap  overflow-x-auto'>{user.name}</td>
                                        <td className='text-wrap  overflow-x-auto'>{user.email}</td>
                                        <td className='text-wrap  overflow-hidden'>{user.userType}</td>
                                        <td className='text-wrap  overflow-hidden'>{Moment(user.createdAt).format('DD-MM-YYYY')}</td>
                                        <td className='text-wrap'>
                                            <div className='flex flex-row justify-items-center gap-5'>
                                                <span title='Edit' >
                                                    <MdModeEditOutline onClick={() => handleEdit({...user})}  className='text-2xl text-emerald-500 cursor-pointer hover:text-teal-700' />
                                                </span>
                                                <span title='Delete'>
                                                    <RiDeleteBin6Fill onClick={() => handleDeleteClick(user._id)} className='text-2xl text-red-300 cursor-pointer hover:text-red-500' />
                                                </span>

                                            </div>
                                        </td>
                                    </tr>)
                            }))
                            :
                            (<tr className='w-full'>
                                <td colSpan="6" className='text-center'>No Records Found</td>
                            </tr>)
                        }
                    </tbody>
                </table>

            </div>
  {/* {update dialog box} */}
            {
               isupdateDialogOpen && <EditUser user = {userEdit} onClose = {handleClose}  />
            }


            {/* {delete confirm box} */}
            {isDialogOpen && (
                <ConfirmAlert
                    title="Hello!"
                    message="Do you want to proceed?"
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            )}







            {/* paggination section*/}
            <div className='text-xl gap-8 absolute bottom-18 right-5'>
                <button disabled={currentPage <= 1 ? true : false} onClick={() => handleCurrentPage(currentPage - 1)} className='p-1 rounded-full bg-slate-300'>&lt;</button>
                {
                    pageIndex.slice(Math.max(0, currentPage - 2), Math.min(numberOfPages, currentPage + 3))
                        .map((page) => <button key={page} onClick={() => handleCurrentPage(page)} className={page === currentPage ? "active p-1 bg-teal-600 text-white w-fit rounded-full mt-1" : "p-1 rounded-full bg-slate-300"} >{page}</button>)
                }
                <button disabled={currentPage >= numberOfPages ? true : false} onClick={() => handleCurrentPage(currentPage + 1)} className='p-1 rounded-full bg-slate-300'>&gt;</button>
            </div>
        </>
    )
}

export default AllUser