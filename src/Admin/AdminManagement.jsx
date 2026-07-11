import React, { useState } from 'react'
import { AdminTeams } from './Managements/AdminTeams';
import { AdminGallery } from './Managements/AdminGallery';
import { AdminReviews } from './Managements/AdminReviews';
import { AdminContacts } from './Managements/AdminContacts';
import { AdminPositions } from './Managements/AdminPositions';

export const AdminManagement = () => {

  const [active, setActive] = useState("gallery");
  return (
    <div className=''>
      <div>
        <h2 className='text-2xl font-bold'>Managements</h2>
      </div>

      <div className='shadow-sm bg-slate-700 md:w-sm py-3 flex justify-around px-1 mt-3 rounded-xl'>
        <button className={`text-white p-2 lg:p-1  border-r border-l hover:bg-slate-400 hover:text-white ${active === "gallery" ? "bg-slate-400/90 text-white font-bold" : " "}`} onClick={()=> setActive("gallery")}>Gallery</button>
        <button className={`text-white p-2 lg:p-1 border-r border-l hover:bg-slate-400 hover:text-white ${active === "position" ? "bg-slate-400/90 text-white font-bold" : " "}`} onClick={()=> setActive("position")}>Position</button>
        <button className={`text-white p-2 lg:p-1 border-r border-l hover:bg-slate-400 hover:text-white ${active === "reviews" ? "bg-slate-400/90 text-white font-bold" : " "}`} onClick={(()=> setActive("reviews"))}>Reviews</button>
        <button className={`text-white p-2 lg:p-1 border-r border-l hover:bg-slate-400 hover:text-white ${active === "contacts" ? "bg-slate-400/90 text-white font-bold" : " "}`} onClick={()=> setActive("contacts")}>Contacts</button>
      </div>

      <div className='p-3 w-full'>
          {active === "position" && (
            <div className='mt-2'>
              <AdminPositions/>
            </div>
          )}

         {active === "gallery" && (
           <div className='mt-2'>
             <AdminGallery/>
           </div>
          )}

         {active === "reviews" && (
          <div>
             <AdminReviews/>
          </div>
          )}

         {active === "contacts" && (
           <div>
             <AdminContacts/>
           </div>
          )}
      </div>


    </div>
  )
}
