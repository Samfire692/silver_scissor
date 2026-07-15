import React, { useState } from 'react'
import { AdminPrice } from './AdminPrice'
import { AdminContacts } from './AdminContacts'

export const AdminBusiness = () => {

  const [active, setActive] = useState("price")
  return (
    <div>
      <div className='bg-slate-600 p-2 rounded-xl text-white flex gap-2 w-fit'>
        <button className={`border-l border-r p-1.5 ${active === 'price' ? "bg-slate-400 font-bold" : ""}`} onClick={()=> setActive("price")}>Price</button>
        <button className={`border-l border-r p-1.5 ${active === 'contact' ? "bg-slate-400 font-bold" : ""}`} onClick={()=> setActive("contact")}>Contacts</button>
      </div><br />

        {active === "price" && (
          <div>
            <AdminPrice/>
          </div>
        )}
        
        {active === "contact" && (
          <div>
            <AdminContacts/>
        </div>
        )}
    </div>
  )
}
