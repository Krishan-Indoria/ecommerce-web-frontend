import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { serverPath } from './helpers/constant';
// import { toast } from 'react-toastify';
import Context from "./context/index";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
function App() {
  const dispatch = useDispatch();

  const fetchUserDetails = async () => {
    const apiUrl = `${serverPath}/api/users/user-details`;
    const apiResponse = await fetch(apiUrl, {
      method: 'GET',
      credentials: 'include'
    })

    const dataResponse = await apiResponse.json();
    if(dataResponse.success){
      dispatch(setUserDetails(dataResponse.data));
    }
    // console.log(dataResponse);
  }

  useEffect(() => {
    fetchUserDetails();
  }, )

  return (
    <>
      <Context.Provider value={{
        // user detail fetch
        fetchUserDetails
      }}>
        <ToastContainer />
        <Header />
        <main className="min-h-[calc(100vh-120px)]">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
