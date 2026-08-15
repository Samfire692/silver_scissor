import React from 'react'
import { Charts } from './Bookings/Charts'

export const AdminBookings = () => {
  return (
    <div>
       <div>
        <h2 className='text-xl font-bold'>Bookings</h2>
        <p>Manage and track all customer bookings</p>
       </div><br />

       <div>
         <Charts/>
       </div>
    </div>
  )
}
