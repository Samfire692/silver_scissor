import React, { useState } from 'react'
import { Profilepic } from './Profilesetup/Profilepic'
import { ProfileInfo } from './Profilesetup/ProfileInfo'
import { Profiledescription } from './Profilesetup/Profiledescription'

export const ProfileSetup = () => {

    const [steps , setStep] = useState(1)
  return (
    <div className='p-2'>
        {/* <div>
            <h2 className='text-center text-3xl font-bold'>Profile Setup</h2>
        </div><br /> */}
        <div className='flex justify-between pt-3'>
            <div className='flex gap-3 my-auto mx-auto'>
               <div className={`h-1 w-15 rounded-2xl ${steps >= 1 ? "bg-blue-500" : "bg-slate-200"}`}></div>
               <div className={`h-1 w-15 rounded-2xl transition-all duration-500 ${steps >= 2 ? "bg-blue-500" : "bg-slate-200"}`}></div>
               <div className={`h-1 w-15 rounded-2xl transition-all duration-500 ${steps >= 3 ? "bg-blue-500" : "bg-slate-200"}`}></div>
            </div>
        </div>

        <div className='mt-5'>
            {steps === 1 && <Profilepic/>}
            {steps === 2 && <ProfileInfo/>}
            {steps === 3 && <Profiledescription/>}
        </div>

         <div className={`bottom-2 ${steps > 1 ? "fixed" : "hidden"}`}>
            <button className={`p-1.5 flex text-slate-500 font-bold`} onClick={()=> setStep(steps - 1)}>
                <span className='my-auto'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
	                <path d="M0 0h24v24H0z" fill="none" />
	                <path fill="currentColor" d="M17 11H9.414l2.293-2.293a.999.999 0 1 0-1.414-1.414L5.586 12l4.707 4.707a.997.997 0 0 0 1.414 0a1 1 0 0 0 0-1.414L9.414 13H17a1 1 0 0 0 0-2" />
                    </svg>
                </span>
                Back</button>
        </div>

        <div className='fixed bottom-2 flex right-2'>
            <button className='bg-blue-500 w-25 p-1.5 text-white' onClick={()=> setStep(steps + 1)}>Next</button>
        </div>
    </div>
  )
}
