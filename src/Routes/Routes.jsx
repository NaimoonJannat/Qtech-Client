import Main from "../Layout/Main";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Registration from "../Pages/Authentication/Register";
import Login from "../Pages/Authentication/LogIn";
import Admin from "../Pages/Admin/Admin";
import JobDetail from "../Pages/JobDetailsPage/JobDetail";

import { createBrowserRouter } from "react-router";
import Home from "../Pages/HomePage/Home";
import AllJobs from "../Pages/AllJobsPage/AllJobs";


const Routes = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children:
            [
                {
                    path: '/',
                    element:<Home></Home>
                },
                {
                    path: '/registration',
                    element: <Registration></Registration>,
                },
                {
                    path: '/login',
                    element: <Login></Login>,
                },
                {
                    path: '/admin',
                    element:<Admin></Admin>
                },
                {
                    path: '/jobs/:id',
                    element:<JobDetail></JobDetail>
                },
                 {
                    path: '/jobs',
                    element:<AllJobs></AllJobs>
                },
            ]
    }
]);


export default Routes;