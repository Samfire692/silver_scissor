import React from 'react'
import { AdminPrice } from './AdminPrice'
import { AdminContacts } from './AdminContacts'

export const AdminBusiness = () => {
  return (
    <div>
        <div>
            <AdminPrice/>
        </div><br />
        
        <div>
            <AdminContacts/>
        </div>
    </div>
  )
}
