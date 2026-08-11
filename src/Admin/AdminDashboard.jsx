import React, { useEffect, useState } from 'react'
import { Greetings } from './Dashboard/Greetings';
import { Store } from 'lucide-react';
import { Cards } from './Dashboard/Cards';
import { Appointment } from './Dashboard/Appointment';
import { NextAppointment } from './Dashboard/NextAppointment';

export const AdminDashboard = () => {
  return (
    <div className='p-2'>
{/* greeting */}
     <div className=''>
      <Greetings/>
     </div>

     {/* cards */}
     <div>
      <Cards/>
     </div>

     <div className='flex flex-col md:flex-row justify-evenly gap-2'>
        <div>
          <Appointment/>
        </div>

        <div>
          <NextAppointment/>
        </div>
     </div>
    </div>
  )
}
