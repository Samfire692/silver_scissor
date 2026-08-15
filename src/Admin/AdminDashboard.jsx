import React, { useEffect, useState } from 'react'
import { Greetings } from './Dashboard/Greetings';
import { Store } from 'lucide-react';
import { Cards } from './Dashboard/Cards';
import { Appointment } from './Dashboard/Appointment';
import { NextAppointment } from './Dashboard/NextAppointment';

export const AdminDashboard = () => {
  return (
    <div className='p-2 w-full'>
{/* greeting */}
     <div className=''>
      <Greetings/>
     </div>

     {/* cards */}
     <div>
      <Cards/>
     </div>

     <div className='grid lg:grid-cols-2 gap-2'>
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
