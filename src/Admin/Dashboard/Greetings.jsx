import React, { useState } from 'react'
import { useContext } from 'react';
import { AdminContext } from '../../Context/AdminProvider';
import { Waves } from 'lucide-react';

export const Greetings = () => {

  const {admin, setAdmin} = useContext(AdminContext);

  return (
    <>
     <div className='mx-auto rounded-xl'>
      <h4 className='text-3xl font-bold'>Welcome back,{admin?.username}</h4>
      <p className='mt-1'>Hope you're ready for another amazing day at Silver Scissors.</p>
    </div>

    <div className='shadow-sm bg-slate-500/60 shadow-slate-500 p-3 mt-3 rounded-xl flex justify-between'>
       <div className='flex gap-2'>
          <div className='w-fit h-fit my-auto p-2 rounded-lg bg-linear-180 from-green-900 to-green-900'><div className='w-4 h-4 rounded-full bg-green-500 animate-pulse'></div></div>
          <div className='flex flex-col'>
           <span className='font-bold text-lg text-white'>You're Available Today</span>
           <span className='text-sm text-white'>Working Hours: 9:00 AM - 6:00 PM</span>
          </div>
       </div>

       <button className='bg-slate-600 p-2 text-white font-bold h-fit my-auto'>Change Status</button>
    </div>
    </>
  )
}
