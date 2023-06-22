import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main/Main";
import Error from "../pages/Error/Error";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/LoginAndRegistration/Login/Login";
import Registration from "../pages/LoginAndRegistration/Registration/Registration";
import Instructors from "../pages/Instructors/Instructors";
import Classes from "../pages/Classes/Classes";
import DashBoard from "../layouts/DashBoard/DashBoard";
import StudentDashboard from "../pages/Dashboard/StudentDashboard/StudentDashboard";
import MySelectedClass from "../pages/Dashboard/StudentDashboard/MySelectedClass";
import MyEnrolledClass from "../pages/Dashboard/StudentDashboard/MyEnrolledClass";
import PaymentHistory from "../pages/Dashboard/StudentDashboard/PaymentHistory";
import InstructorDashboard from "../pages/Dashboard/InstructorDashboard/InstructorDashboard";
import MyClasses from "../pages/Dashboard/InstructorDashboard/MyClasses";
import AddAClass from "../pages/Dashboard/InstructorDashboard/AddAClass";
import AdminDashboard from "../pages/Dashboard/AdminDashboard/AdminDashboard";
import ManageClasses from "../pages/Dashboard/AdminDashboard/ManageClasses";
import ManageUsers from "../pages/Dashboard/AdminDashboard/ManageUsers";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import InstructorRoute from "./InstructorRoute";
import PaymentSuccessful from "../pages/Dashboard/StudentDashboard/PaymentSuccessful";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <Error></Error>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/registration',
                element: <Registration></Registration>
            },
            {
                path: '/instructors',
                element: <Instructors></Instructors>,
                loader: () => { return fetch(`https://summer-camp-school-server-five.vercel.app/all-instructors`)}
            },
            {
                path: '/classes',
                element: <Classes></Classes>,
                loader: () => { return fetch(`https://summer-camp-school-server-five.vercel.app/classes`)}
            }
        ]
    },
    {
        path:"/dashboard",
        element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
        children: [
            // student
            {
                path: '/dashboard/student',
                element: <StudentDashboard></StudentDashboard>
            },
            {
                path: '/dashboard/my-selected-class',
                element: <MySelectedClass></MySelectedClass>
            },
            {
                path: '/dashboard/my-enrolled-class',
                element: <MyEnrolledClass></MyEnrolledClass>
            },
            {
                path: '/dashboard/payment-history',
                element: <PaymentHistory></PaymentHistory>
            },
            {
                path: '/dashboard/payment-successful/:tranId',
                element: <PaymentSuccessful></PaymentSuccessful>
            },
            // instructor
            {
                path: '/dashboard/instructor',
                element: <InstructorRoute><InstructorDashboard></InstructorDashboard></InstructorRoute>
            },
            {
                path: '/dashboard/my-classes',
                element: <InstructorRoute><MyClasses></MyClasses></InstructorRoute>
            },
            {
                path: '/dashboard/add-a-class',
                element: <InstructorRoute><AddAClass></AddAClass></InstructorRoute>
            },
            // admin
            {
                path: '/dashboard/admin',
                element: <AdminRoute><AdminDashboard></AdminDashboard></AdminRoute>
            },
            {
                path: '/dashboard/manage-classes',
                element: <AdminRoute><ManageClasses></ManageClasses></AdminRoute>
            },
            {
                path: '/dashboard/mange-users',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            }
        ]
    }
]);

export default router;