import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient';
import { toast } from 'sonner';
import { Scissors } from 'lucide-react';

export const BookingForm = () => {

  const [priceArray , setPricearray] = useState([]);
  const [priceMenu, setPricemenu] = useState(false);
  const [selectedPrice, setSelectedprice] = useState(null);
  const [teamArray, setTeamarray] = useState([]);
  const [selectedTeam, setSelectedteam] = useState(null);
  const [teamMenu, setTeammenu] = useState(false);

  const fetchData = async()=> {
    try{
      // price
      const {data:priceData, error:priceError} = await supabase
      .from("SS_price")
      .select("*")

      if(priceError) throw priceError;
      setPricearray(priceData);

      // teams
      const {data:teamData, error:teamError} = await supabase
      .from("SS_adminsignup")
      .select("*")

      if(teamError) throw teamError;
      setTeamarray(teamData)
    }catch(error){
      toast.error(error.message);
    }finally{
      
    }
  }

    const selectPrice = async(price)=> {
      setSelectedprice(price);
      setPricemenu(false);
    }

    const selectTeam = async(team)=> {
      setSelectedteam(team);
      setTeammenu(false);
    }

  useEffect(()=> {
    fetchData();
  }, [])
  return (
    <div className='p-3'>
       <div>
         <h2 className='text-5xl text-center' style={{fontFamily:"fantasy", letterSpacing:"2px"}}>Book An Appointment</h2>
         <p className='text-center'>Pick a time that works best for you.</p>
       </div><br />

       <div className='flex justify-evenly mt-2'>
         <div className='grid'>
           <span className='bg-black text-white rounded-full w-8 h-8 flex justify-center place-items-center mx-auto'><span className='text-xl font-bold'>1</span></span>
           <p className='font-bold uppercase text-xs text-center'>Service</p>
         </div>


         <div className='grid gap-2'>
           <span className='border text-black rounded-full w-8 h-8 flex justify-center place-items-center mx-auto'><span className='text-xl font-bold'>2</span></span>
           <p className='font-bold uppercase text-xs text-center'>barber</p>
         </div>

         <div className='grid gap-2'>
           <span className='border text-black rounded-full  w-8 h-8 flex justify-center place-items-center mx-auto'><span className='text-xl font-bold'>3</span></span>
           <p className='font-bold uppercase text-xs text-center'>date & time</p>
         </div>

         <div className='grid gap-2'>
           <span className='border text-black rounded-full w-8 h-8 flex justify-center place-items-center mx-auto'><span className='text-xl font-bold'>4</span></span>
           <p className='font-bold uppercase text-center text-xs'>details</p>
         </div>
       </div><br />
       
       <form action="" className='border border-slate-200 rounded-2xl p-3 grid md:grid-cols-2 grid-cols-1 lg:w-4xl mx-auto'>
          {/* Select Services */}
          <div className='border border-slate-200 rounded-2xl p-2 lg:w-sm'>
             <div className='mb-1.5'>
               <p className='font-bold text-black uppercase'>Select Services</p>
             </div>

             <div className=''>
              <div className='border cursor-pointer border-slate-400 p-2 rounded-lg flex justify-between' onClick={()=> setPricemenu(!priceMenu)}>
                <span>--Choose services--</span>
                <span className={`text-black hover:bg-slate-300 rounded-full my-auto transition-all ${priceMenu ? "-rotate-180" : ""}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
	                <path d="M0 0h24v24H0z" fill="none" />
	                <path fill="currentColor" d="m5.84 9.59l5.66 5.66l5.66-5.66l-.71-.7l-4.95 4.95l-4.95-4.95z" />
                  </svg>
                </span>
              </div>

              {priceMenu && (
               <div className='mt-2 grid h-26 overflow-y-scroll border border-slate-200 p-1 rounded-md'>
                {priceArray.map((price)=> (
                  <>
                    <div key={price.id} className='hover:bg-black/10 p-1 rounded-sm cursor-pointer' onClick={()=> selectPrice(price)}>
                      <button className='' type='button'>{price.service_name}</button>
                    </div>
                  </>
                ))}
              </div>
             )}
             </div>

            {selectedPrice ? (
               <div className='border border-slate-200 mt-2 p-4 flex justify-between rounded-2xl'>
                <div className='grid'>
                  <span className='font-bold text-lg'>{selectedPrice.service_name}</span>
                  <span className='mt-1.5 text-sm'>Duration: {selectedPrice.duration} mins</span>
                </div>
                <span className='text-2xl my-auto font-bold'>£{selectedPrice.price}</span>
             </div>
            ) : (
               <div className='shadow-sm shadow-slate-500 mt-2 p-4 flex justify-center items-center rounded-2xl h-25'>
                <span className='text-slate-400 font-bold'>Choose a service</span>
             </div>
            )}

          </div>

          {/* choose barber */}
          <div className='border border-slate-200 rounded-2xl p-2'>
             <div>
                <h2 className='font-bold uppercase'>Choose Barber</h2>
             </div>

             <div className='w-full border border-slate-500 rounded-lg mt-1.5 p-2 flex justify-between cursor-pointer' onClick={()=> setTeammenu(!teamMenu)}>
               <span className=''>--Choose team--</span>
               <span className={`text-black hover:bg-slate-300 rounded-full my-auto transition-all ${priceMenu ? "-rotate-180" : ""}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
	                <path d="M0 0h24v24H0z" fill="none" />
	                <path fill="currentColor" d="m5.84 9.59l5.66 5.66l5.66-5.66l-.71-.7l-4.95 4.95l-4.95-4.95z" />
                  </svg>
                </span>
             </div>

             {teamMenu && (
               <div className='grid border border-slate-200 rounded-xl p-2 mt-1 h-26 overflow-y-scroll'>
                {teamArray.map((team)=> (
                  <div key={team.id} className='flex justify-between hover:border border-amber-300 rounded-lg p-2 cursor-pointer' onClick={()=> selectTeam(team)}>
                     <div className='flex gap-3'>
                        <img src={team.img_url} alt="" className='w-12 h-12 object-cover rounded-xl' />
                        <div className='flex flex-col my-auto'>
                         <span className='font-bold'>{team.fullname}</span>
                         <span className=' capitalize'>{team.position}</span>
                        </div>
                     </div>

                     <button className={`border border-slate-500 h-3.5 w-3.5 rounded-full my-auto ${selectedTeam === team ? "bg-black" : ""}`}></button>                     
                  </div>
                ))}
             </div>
             )}

             <div className='mt-2'>
               {selectedTeam ? (
                <div className='flex border rounded-xl border-slate-400 p-2 justify-between'>
                  <div className='flex gap-2'>
                  <img src={selectedTeam.img_url} alt="" className='w-14 h-14 object-cover rounded-lg my-auto' />
                  <div className='flex flex-col my-auto'>
                     <div className='grid'>
                      <span className='font-bold'>{selectedTeam.username}</span>
                      <span className='text-sm my-auto capitalize'>{selectedTeam.position}</span>
                     </div>
                     <span className='lg:w-xs w-full'>{selectedTeam.description}</span>
                  </div>
                 </div>

                 <button className='text-red-500 h-fit my-auto' type='button' onClick={()=> setSelectedteam(null)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
	                <path d="M0 0h24v24H0z" fill="none" />
	                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243" />
                  </svg>
                 </button>
                </div>
                )
               :
                (
              <div className='border border-slate-400 h-25 rounded-xl flex justify-center items-center'>
                 <span className='font-bold text-slate-400'>Choose a team</span>
              </div>
              )}
             </div>
          </div>
       </form>
    </div>
  )
}
