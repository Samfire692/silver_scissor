import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient';
import { toast } from 'sonner';

export const Booking = () => {

    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const [submitLoading, setSubmitloading] = useState(false);
    
    const fetch = async(e)=> {
        e.preventDefault();
        setSubmitloading(true);

        try{
           if(search.includes("@")){
             const {data, error} = await supabase
             .from("SS_bookingform")
             .select("*")
             .eq("email", search.trim())

             if(error) throw error;
             if(data.length === 0){
                toast.error("No bookings found");
                return;
             }else{
                toast.success("Please wait");
                 localStorage.setItem("CustomerId", search);
                setTimeout(()=> {
                  navigate("/mybooking")
                }, 3000)
             }
            //  console.log("data", data);
           }else{
             const {data, error} = await supabase
             .from("SS_bookingform")
             .select("*")
             .eq("whatsapp_number", search.trim())

             if(error) throw error;
             if(data.length === 0){
                toast.error("No bookings found");
                return;
             }else{
                toast.success("Please wait");
                 localStorage.setItem("CustomerId", search);
                setTimeout(()=> {
                  navigate(`/mybooking`)
                }, 1000)
             }
            //  console.log("data", data);
           }
        }catch(error){
           toast.error(error.message);
        }finally{
           setSubmitloading(false);
        }
    }

  return (
    <div className='p-2'>
        <div className='flex'>
            <button className='bg-slate-300 p-2' onClick={()=> navigate(-1)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
	            <path d="M0 0h24v24H0z" fill="none" />
 	            <g fill="none">
		        <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
		        <path fill="currentColor" d="M3.636 11.293a1 1 0 0 0 0 1.414l5.657 5.657a1 1 0 0 0 1.414-1.414L6.757 13H20a1 1 0 1 0 0-2H6.757l3.95-3.95a1 1 0 0 0-1.414-1.414z" />
	            </g>
                </svg>
            </button>

            <h2 className='font-bold text-3xl m-auto'>View My Bookings</h2>
        </div>

        <p className='text-center mt-2'>Enter the whatsapp number or email you used during booking to view your appointments.</p><br />

        <div className=''>
            <form action="" onSubmit={fetch}>
                <div className='grid gap-1'>
                    <label htmlFor="" className='font-bold text-lg'>Email or WhatsApp number (<small>required</small>)</label>
                    <input type="text" placeholder='Input Email or Whatsapp number' className='border h-11 w-full p-3' onChange={(e)=> setSearch(e.target.value)}/>
                    <small className='flex gap-1 mt-1.5'><span className='bg-slate-200 w-5 h-5 rounded-full flex justify-center items-center'>?</span> We'll search for bookings linked to this phone number or email.</small>
                </div>

                <div className='mt-2 flex justify-center'>
                    <button className={`w-full md:w-45 text-white p-2 ${!search.trim() ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"}`} disabled={!search.trim() || submitLoading}>{submitLoading ? "Loading . . ." : "Continue →"}</button>
                </div>
            </form>
        </div>
    </div>
  )
}
