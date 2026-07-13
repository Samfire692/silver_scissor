import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

export const Navbar = () => {

    const [navbar , setNavbar] = useState(false);
    const links = ["About", "Services" , "Teams", "Gallery", "Contacts"];
  return (
    <div className='fixed text-white w-full z-20'>
        <header className='lg:grid grid-cols-3 justify-items-normal p-3 backdrop-blur-xl bg-black/20 border-b border-white/10'>
          <div className='flex justify-between w-full'>
            <div className='w-fit lg:w-60 lg:text-center px-2 grid'>
              <span className='text-xl font-bold' style={{fontFamily:"fantasy" , letterSpacing:"2px"}}>Silver Scissors</span>
              <small className='-mt-1.5 uppercase' style={{letterSpacing:"2px"}}>Barbing saloon</small>
             </div>

          <div className='lg:hidden my-auto'>
            <button className='border p-1 h-fit transition-all duration-500' onClick={()=> setNavbar(!navbar)}>
              {!navbar ? 
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="24" viewBox="0 0 24 24">
	          <path d="M0 0h24v24H0z" fill="none" />
	          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5l14 0M5 19l14 0M5 12h14">
		      <animate fill="freeze" attributeName="d" dur="0.4s" values="M5 5l14 14M5 19l14 -14M12 12h0;M5 5l14 0M5 19l14 0M5 12h14" />
	          </path>
              </svg>
              :
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
	          <path d="M0 0h24v24H0z" fill="none" />
	          <path fill="none" stroke="currentColor" stroke-dasharray="12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 12l7 7M12 12l-7 -7M12 12l-7 7M12 12l7 -7">
		      <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="12;0" />
	          </path>
              </svg>
              }
            </button>
           </div>
          </div>

          <div className='justify-around lg:flex hidden my-auto'>
             {links.map((lik)=> (
                <NavLink>{lik}</NavLink>
             ))}
          </div>

         {navbar && (
             <div className='lg:hidden bg-black/30 w-full h-fit flex flex-col gap-4 my-2 rounded-2xl p-3'>
               {links.map((lik)=> (
                <NavLink className={`p-2 text-center font-bold`}>{lik}</NavLink>
               ))}
             </div>
         )}
           
        </header>
    </div>
  )
}
