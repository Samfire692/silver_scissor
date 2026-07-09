import React, { useState } from 'react'
import { AdminTeams } from './Managements/AdminTeams';
import { AdminGallery } from './Managements/AdminGallery';
import { AdminReviews } from './Managements/AdminReviews';
import { AdminContacts } from './Managements/AdminContacts';

export const AdminManagement = () => {

  const [active, setActive] = useState("team");
  return (
    <div className=''>
      <div>
        <h2 className='text-2xl font-bold'>Managements</h2>
      </div>

      <div className='bg-black md:w-sm py-3 flex justify-around px-1 mt-3 rounded-xl'>
        <button className={`text-amber-400 p-2 lg:p-1 border-r border-l hover:bg-amber-400 hover:text-black ${active === "team" ? "bg-amber-400 text-black" : " "}`} onClick={()=> setActive("team")}>Teams</button>
        <button className={`text-amber-400 p-2 lg:p-1  border-r border-l hover:bg-amber-400 hover:text-black ${active === "gallery" ? "bg-amber-400 text-black" : " "}`} onClick={()=> setActive("gallery")}>Gallery</button>
        <button className={`text-amber-400 p-2 lg:p-1 border-r border-l hover:bg-amber-400 hover:text-black ${active === "reviews" ? "bg-amber-400 text-black" : " "}`} onClick={(()=> setActive("reviews"))}>Reviews</button>
        <button className={`text-amber-400 p-2 lg:p-1 border-r border-l hover:bg-amber-400 hover:text-black ${active === "contacts" ? "bg-amber-400 text-black" : " "}`} onClick={()=> setActive("contacts")}>Contacts</button>
      </div>

      <div className='p-3 w-full'>
          {active === "team" && (
            <div>
              <AdminTeams/>
            </div>
          )}

         {active === "gallery" && (
           <div>
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
