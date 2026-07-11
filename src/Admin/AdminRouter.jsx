import React, { useEffect, useState } from 'react';
import {Routes , Route, Outlet} from "react-router-dom";
import { AdminSignup } from './AdminSignup';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';
import { AdminNavbar } from './AdminNavbar';
import { useNavigate } from 'react-router-dom';
import { AdminManagement } from './AdminManagement';
import { AdminBookings } from './AdminBookings';
import { AdminSettings } from './AdminSettings';
import { SubadminSignup } from './SubadminSignup';
import { supabase } from '../supabaseClient';
import profilepic from '../assets/profile pic.jfif'
import { ProfileSetup } from './ProfileSetup';

export const AdminRouter = () => {

  const [navbar , setNavbar] = useState(true);
  const [admin, setAdmin] = useState(null);
  const [dropDown , setDropdown] = useState(false);
  const navigate = useNavigate();

  const fetchData = async()=> {

    try{
      const adminProfile = JSON.parse(localStorage.getItem("AdminProfile"));

      if(!adminProfile){
      navigate("/adminlogin");
      }

      const {data:adminData , error:adminError} = await supabase
      .from("SS_adminsignup")
      .select("*")
      .eq("id", adminProfile?.id)
      .limit(1)
      .maybeSingle();

      if(adminError) throw adminError;
      setAdmin(adminData);

    }catch(error){
       console.log(error.message)
    }finally{

    }
  }

  useEffect(()=>{
    fetchData();
  }, [])

  return (
   <Routes>
     <Route element={
        <>
         <div className='flex overflow-x-auto'>
                 <div className={`fixed transition-all duration-500 h-screen overflow-hidden ${navbar ? "w-60" : "w-0"}`}>
                   <AdminNavbar navbar={navbar}/> 
                 </div> 
         
              <div className={`w-full p-2 transition-all duration-500 h-screen ${navbar ? "ms-60" : "ms-0"}`}>
                <div className='flex justify-between mb-2'>
                    <div className='flex gap-2 my-auto'>
                         <button className='p-1 h-fit border' onClick={()=> setNavbar(!navbar)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
	                        <path d="M0 0h24v24H0z" fill="none" />
	                        <path fill="currentColor" fill-rule="evenodd" d="M3 16h18v2H3zm0-5h18v2H3zm0-5h18v2H3z" />
                          </svg>
                         </button>

                         
                    </div>

                    <div className='shadow-sm px-2 py-1 gap-1 rounded-xl text-white bg-slate-700'>
                       <div className={`flex gap-2 transition-all duration-500 overflow-hidden cursor-pointer h-9 ${dropDown ? "w-35" : "w-8"}`} onClick={()=> setDropdown(!dropDown)}>
                          <img src={admin?.img_url} alt={`profile pic for ${admin?.firstname}`} className={`w-8 rounded-full h-8 my-auto transition-all duration-500 object-cover ${dropDown ? "rotate-360" :""}`}/>

                          <div className='my-auto'>
                            <p className='text-xs font-bold'>{admin?.role || "Admin"}</p>
                            <p className='text-sm font-bold capitalize'><span>{admin?.username}</span></p>   
                          </div>
                         </div>  
                    </div>
                </div><hr className='text-slate-300'/>

                <div className='py-1'>
                   <Outlet/>
                </div>
              </div>
         </div>
        </>
     }>
        <Route path='/' element={<AdminSignup/>}/>
        <Route path='/admindashboard' element={<AdminDashboard/>}/>
        <Route path='/adminmanagement' element={<AdminManagement/>}/>
        <Route path='/adminbookings' element={<AdminBookings/>}/>
        <Route path='/adminsetting' element={<AdminSettings/>}/>
        <Route path='/subadminsignup' element={<SubadminSignup/>}/>
     </Route>

      <Route path='/adminlogin' element={<AdminLogin/>}/>
      <Route path='/profilesetup' element={<ProfileSetup/>}/>
   </Routes>
  )
}
