import React, { useContext } from 'react';
import "./Dashboard.css"
import { Link, NavLink, Outlet } from 'react-router-dom';
import { FaWallet, FaShoppingCart, FaCalendarAlt, FaHome, FaHeadSideVirus } from 'react-icons/fa';
import DashboardHeader from '../DashboardHeader/DashboardHeader';
import { AuthContext } from '../../AuthoncationAll/AuthProvider/AuthProvider';
const Dashboard = () => {

    let { logOutUser } = useContext(AuthContext)

    let LogOut = () => {
        logOutUser()
            .then(result => {
                navigate("/")
            })
    }

    return (
        <div className="drawer md:drawer-open  bg-[#F6F6F6]">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle " />
            <div className="drawer-content flex flex-col ">

                {/* jahatu page content nicha thi oupore outlate deta hova  */}

                {/* ===================================== */}
                {/* Dashboard are open drawer header Dashboard component are betore bosacha ..sayjano aykana lagva nah use kore open drawer */}

                <DashboardHeader></DashboardHeader>

                {/* <label htmlFor="my-drawer-2" className="btn w-[60px] md:hidden"><i class="fa text-black text-2xl fa-bars" aria-hidden="true"></i></label> */}

                {/* ===================================== */}

                <Outlet></Outlet>
                {/* Page content here */}

            </div>



            <div className="drawer-side fixed">
                <label htmlFor="my-drawer-2" className=" drawer-overlay"></label>

                <ul className="menuParent menu px-6 pt-[28px] w-90 h-[100%] text-base-content">

                    <div className='NameInformation mb-[14px]'>

                        {/* <div className="img ">
                            <img className="w-full" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&amp;fit=crop&amp;q=80&amp;w=1480&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="img" />
                        </div> */}

                        <h3 className="text-[18px] font-[700] text-black text-center pt-[14px] leading-[26px]">
                            This is Admin
                        </h3>


                    </div>

                    {/* Sidebar content here */}

                    {/* admin panel  */}

                    <>
                        <li className='Dashboard'> <Link to="/"> Home</Link></li>
                        <li> <NavLink to="/dashboard/NPORSUserInformationAdd"><span><FaWallet></FaWallet></span>User Info Add</NavLink></li>
                        <li> <NavLink to="/dashboard/NPORSUserAllInformation"><span><FaWallet></FaWallet></span>All User Info</NavLink></li>
                        <li> <NavLink to="/dashboard/AdminSeeAllUser"><span><FaWallet></FaWallet></span>All Users</NavLink></li>

                    </>

                    {/* ================================= */}
                    <div className="pt-[20px]">
                        <hr className="pt-4" />
                        <li><button className="LogOut" onClick={LogOut}>LogOut</button></li>
                    </div>



                </ul>


            </div>
        </div >
    );
};

export default Dashboard;