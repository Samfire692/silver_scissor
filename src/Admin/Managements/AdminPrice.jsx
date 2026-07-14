import React from 'react'

export const AdminPrice = () => {
  return (
    <div>
        <div className='mb-3'>
              <h2 className='font-bold text-2xl text-slate-600'>Add Price</h2>
              <div className='h-1.5 w-18 bg-slate-500 rounded-2xl mt-1'></div>
         </div>

         <div>
            <form action="">
                <div className='flex flex-wrap gap-2'>
                     <div className='grid w-full'>
                       <label htmlFor="">Service Name</label>
                       <input type="text" className='border h-11 p-2' placeholder='Add Services' />
                     </div>

                     <div className='my-auto grid w-full'>
                        <label htmlFor="">Duration</label>
                        <select name="" id="" className='border p-1 h-11 rounded-lg'>
                            <option value="">---Choose duration---</option>
                            <option value="">15 mins</option>
                            <option value="">20 mins</option>
                            <option value="">30 mins</option>
                            <option value="">45 mins</option>
                            <option value="">60 mins</option>
                            <option value="">90 mins</option>
                        </select>
                     </div>

                      <div className='my-auto grid'>
                        <label htmlFor="">Price {}</label>
                        <input type="text" className='w-10 border h-11 text-center' />
                     </div>
                </div>
                
                <div className='mt-2 flex lg:justify-end'>
                    <button className='bg-blue-500 lg:w-45 w-full p-2 text-white'>Submit</button>
                </div>
            </form>
         </div>
    </div>
  )
}
