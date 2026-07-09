import React from 'react'
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

export const AdminNavbar = () => {
    const navigate = useNavigate();

    const logOut = ()=> {
       
       localStorage.clear();

    }

  return (
    <div className='w-60 h-screen navbar overflow-y-auto'>
        <div> 
            {/* logo */}
            <div className='w-50 mx-auto py-6'>
                <div className='flex gap-3 w-fit text-amber-300'>
                  <span className='my-auto'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 256 256">
	              <path d="M0 0h256v256H0z" fill="none" />
             	  <path fill="currentColor" d="m236.52 187.09l-143-97.87a36 36 0 1 0-14.38 17.27l21.39 21.69l-21.38 21.36a35.91 35.91 0 1 0 14.38 17.27l26.91-18.41L170 198.64a32.26 32.26 0 0 0 22.7 9.37a31.5 31.5 0 0 0 4.11-.27h.28l36.27-6.11a8 8 0 0 0 3.19-14.5Zm-162.38-97A20 20 0 1 1 80 76a20 20 0 0 1-5.86 14.13Zm0 104A20 20 0 1 1 80 180a20 20 0 0 1-5.86 14.15Zm61-101.5l34.8-35.19a32.19 32.19 0 0 1 26.84-9.14h.28l36 6.07a8.21 8.21 0 0 1 6.09 4.42a8 8 0 0 1-2.67 10.12l-69.93 47.85a4 4 0 0 1-4.51 0l-26.31-18a4 4 0 0 1-.55-6.07Z" />
                  </svg>
                  </span>
                  <span>
                    <h3 className=''>Silver Scissors</h3>
                    <small className='uppercase text-xs' style={{letterSpacing:"1px"}}>barber shop</small>
                  </span>
                </div>
            </div><br /><br />

            {/* Links */}
            <div className='p-3 grid gap-2'>
    
                <NavLink to={"/admindashboard"} className={({isActive}) =>`p-2 rounded-lg ${ isActive ? "bg-amber-500 text-white" : "text-amber-400 hover:bg-amber-500 hover:text-white"}`}>
                 <div className='flex gap-1'>
                    <span className='my-auto'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
	                    <path d="M0 0h24v24H0z" fill="none" />
	                    <path fill="currentColor" d="M5.6 2A2.6 2.6 0 0 0 3 4.6v4.8A2.6 2.6 0 0 0 5.6 12h2.8A2.6 2.6 0 0 0 11 9.4V4.6A2.6 2.6 0 0 0 8.4 2zm0 12A2.6 2.6 0 0 0 3 16.6v2.8A2.6 2.6 0 0 0 5.6 22h2.8a2.6 2.6 0 0 0 2.6-2.6v-2.8A2.6 2.6 0 0 0 8.4 14zm10-12A2.6 2.6 0 0 0 13 4.6v2.8a2.6 2.6 0 0 0 2.6 2.6h2.8A2.6 2.6 0 0 0 21 7.4V4.6A2.6 2.6 0 0 0 18.4 2zm0 10a2.6 2.6 0 0 0-2.6 2.6v4.8a2.6 2.6 0 0 0 2.6 2.6h2.8a2.6 2.6 0 0 0 2.6-2.6v-4.8a2.6 2.6 0 0 0-2.6-2.6z" />
                        </svg>
                    </span>
                    <span>
                        Dashboard
                    </span>
                 </div>
               </NavLink>

                <NavLink to={"/adminmanagement"} className={({isActive})=> `p-2 rounded-lg ${isActive ? "bg-amber-500 text-white" : "text-amber-400 hover:bg-amber-500 hover:text-white"}`}>
                 <div className='flex gap-1'>
                    <span className='my-auto'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 2048 2048">
	                    <path d="M0 0h2048v2048H0z" fill="none" />
	                    <path fill="currentColor" d="M960 1796q48 0 98-3q25 66 62 123q-40 4-80 6t-80 2q-134 0-262-22q-37-6-84-17t-96-29t-96-41t-84-55t-59-69t-23-87V452q0-45 19-80t51-66q34-34 81-60t103-45t115-33t119-21t114-11t102-4q72 0 159 8t175 27t167 54t133 85q31 29 50 66t20 80v572h-128V642q-60 37-131 62t-147 40t-152 21t-146 7q-69 0-145-6t-153-22t-147-40t-131-62v962q0 20 14 37t29 28q47 37 114 61t142 39t147 21t130 6m0-1536q-51 0-106 3t-112 12t-110 22t-101 33q-15 6-40 18t-49 29t-41 35t-17 40q0 8 3 15t8 14q22 32 63 57t92 43t108 30t113 19t104 11t85 3q35 0 84-3t105-10t112-20t109-30t91-42t64-58q5-7 8-14t3-15q0-21-17-40t-41-35t-49-28t-40-19q-47-19-101-32t-110-22t-111-12t-107-4m954 1279q6 30 6 61t-6 61l124 51l-49 119l-124-52q-35 51-86 86l52 124l-119 49l-51-124q-30 6-61 6t-61-6l-51 124l-119-49l52-124q-51-35-86-86l-124 52l-49-119l124-51q-6-30-6-61t6-61l-124-51l49-119l124 52q35-51 86-86l-52-124l119-49l51 124q30-6 61-6t61 6l51-124l119 49l-52 124q51 35 86 86l124-52l49 119zm-314 253q40 0 75-15t61-41t41-61t15-75t-15-75t-41-61t-61-41t-75-15t-75 15t-61 41t-41 61t-15 75t15 75t41 61t61 41t75 15" />
                        </svg>
                    </span>
                    <span>
                        Managements
                    </span>
                 </div>
               </NavLink>

                <NavLink to={"/adminbookings"} className={({isActive})=> `p-2 rounded-lg ${isActive ? "bg-amber-500 text-white" : "text-amber-400 hover:bg-amber-500 hover:text-white"}`}>
                 <div className='flex gap-1'>
                    <span className='my-auto'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
	                    <path d="M0 0h24v24H0z" fill="none" />
	                    <path fill="currentColor" d="M2 19c0 1.7 1.3 3 3 3h14c1.7 0 3-1.3 3-3v-8H2zM19 4h-2V3c0-.6-.4-1-1-1s-1 .4-1 1v1H9V3c0-.6-.4-1-1-1s-1 .4-1 1v1H5C3.3 4 2 5.3 2 7v2h20V7c0-1.7-1.3-3-3-3" />
                        </svg>
                    </span>
                    <span>
                       Bookings
                    </span>
                 </div>
               </NavLink>

                <NavLink to={"/adminsetting"} className={({isActive})=> ` p-2 rounded-lg ${isActive ? "bg-amber-500 text-white" : "text-amber-400 hover:bg-amber-500 hover:text-white"}`}>
                 <div className=' flex gap-1'>
                    <span className='my-auto'>
                       <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
	                   <path d="M0 0h24v24H0z" fill="none" />
	                   <path fill="currentColor" d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97s-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1s.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64z" />
                       </svg>
                    </span>
                    <span>
                        Settings
                    </span>
                 </div>
               </NavLink>

                <NavLink to={"/subadminsignup"} className={({isActive})=> `p-2 rounded-lg ${isActive ? "bg-amber-500 text-white" : "text-amber-400 hover:bg-amber-500 hover:text-white"}`}>
                 <div className='flex gap-1'>
                    <span className='my-auto'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
	                    <path d="M0 0h24v24H0z" fill="none" />
	                    <path fill="currentColor" fill-rule="evenodd" d="M8 4a4 4 0 1 0 0 8a4 4 0 0 0 0-8m-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4zm7.25-2.095c.478-.86.75-1.85.75-2.905a6 6 0 0 0-.75-2.906a4 4 0 1 1 0 5.811M15.466 20c.34-.588.535-1.271.535-2v-1a5.98 5.98 0 0 0-1.528-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2z" clip-rule="evenodd" />
                        </svg>
                    </span>
                    <span>
                        Admin Signup
                    </span>
                 </div>
               </NavLink>

                <NavLink to={"/adminlogin"} className='' onClick={logOut}>
                 <div className='text-amber-400 hover:bg-amber-500 hover:text-white flex gap-1 p-2 rounded-lg'>
                    <span className='my-auto'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
	                    <path d="M0 0h24v24H0z" fill="none" />
	                    <path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h6q.425 0 .713.288T12 4t-.288.713T11 5H5v14h6q.425 0 .713.288T12 20t-.288.713T11 21zm12.175-8H10q-.425 0-.712-.288T9 12t.288-.712T10 11h7.175L15.3 9.125q-.275-.275-.275-.675t.275-.7t.7-.313t.725.288L20.3 11.3q.3.3.3.7t-.3.7l-3.575 3.575q-.3.3-.712.288t-.713-.313q-.275-.3-.262-.712t.287-.688z" />
                        </svg>
                    </span>
                    <span>
                        Logout
                    </span>
                 </div>
               </NavLink>
            </div>
        </div>
    </div>
  )
}
