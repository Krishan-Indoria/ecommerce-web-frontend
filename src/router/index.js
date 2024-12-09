import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from "../pages/Home"
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";
import AdminPanel from '../pages/AdminPanel';
import AllUser from '../pages/AllUser';
import AllProducts from '../pages/AllProducts';
const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "",
                element :  <Home/>
            },
            {
                path : '/login',
                element : <Login/>
            },
            {
                path : '/sign-up',
                element : <SignUp/>
            },
            {
                path : '/forgot-password',
                element : <ForgotPassword/>
            },
            {
                path : '/login',
                element : <Login/>
            },
            {
                path : '/admin-panel',
                element : <AdminPanel/>,
                children : [
                    {
                    path : 'all-users',
                    element : <AllUser/>
                    },
                    {
                    path : 'product-list',
                    element : <AllProducts/>
                    }
                ]
            }

        ]
    }
])


export default router;