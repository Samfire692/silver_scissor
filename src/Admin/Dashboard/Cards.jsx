import { Calendar, Check, Clock, Cross } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { supabase } from '../../supabaseClient';
import { toast } from 'sonner';
import { AdminContext } from '../../Context/AdminProvider';
import CountUp from 'react-countup'

export const Cards = () => {

    const {admin, setAdmin} = useContext(AdminContext);
    const [totalBookings, setTotalbookings] = useState(0);
    const [completedBookings, setCompletedbookings]= useState(0);
    const [upcomingBookings, setUpcomingbookings]= useState(0);
    const [cancelledBookings, setCancelledbookings] = useState(0);

    const fetchData = async()=>{
     try{
        const today = new Date(). toISOString().split("T")[0];
        const {count, error} = await supabase
        .from("SS_bookingform")
        .select("*", {count:"exact", head:true})
        .eq("team", admin?.id)
        .eq("date", today)
        // console.log(admin);

        if(error) throw error;
        setTotalbookings(count || 0);

        const {count:completedCount, error:completedError} = await supabase
        .from("SS_bookingform")
        .select("*", {count:"exact", head:true})
        .eq("status", "completed")
        .eq("team", admin.id)
        .eq("date", today)

        if(completedError) throw completedError;
        setCompletedbookings(completedCount || 0);

        const {count:upcomingCount, error:upcomingError} = await supabase
        .from("SS_bookingform")
        .select("*", {count:"exact", head:true})
        .eq("status", "upcoming")
        .eq("team", admin.id)
        .eq("date", today)

        if(upcomingError) throw uploadedError;
        setUpcomingbookings(upcomingCount || 0);

        const {count:cancelledCount, error:cancelledError} = await supabase
        .from("SS_bookingform")
        .select("*", {count:"exact", head:true})
        .eq("status", "cancelled")
        .eq("team", admin.id)
        .eq("date", today)

        if(cancelledError) throw cancelledError;
        setCancelledbookings(cancelledCount || 0);
     }catch(error){
        console.log(error.message);
     }finally{

     }
    }

    useEffect(()=> {
        if(admin?.id){
            fetchData();
        }
    }, [admin]);
  return (
    <div className='grid md:grid-cols-4 grid-cols-2 mt-3 gap-3'>

        <div className='gap-2 hover:shadow-md cursor-pointer border border-purple-400 p-3 rounded-2xl h-40 flex justify-evenly items-center hover:shadow-purple-400 transition-all duration-500'>
            <p className='my-auto p-3 bg-purple-300/30 text-purple-500 rounded-xl'><Calendar size={25}/></p>
            <div className='flex flex-col'>
                <span className='font-bold text-4xl text-center text-purple-500 stats'>{totalBookings}</span>
                <span className='font-medium text-purple-500'>Bookings</span>
                
            </div>
        </div>

        <div className='gap-2 hover:shadow-md cursor-pointer border border-green-400 p-3 rounded-2xl h-40 flex justify-evenly items-center hover:shadow-green-400 transition-all duration-500'>
            <p className='my-auto p-3 bg-green-300/30 text-green-500 rounded-xl'><Check size={25}/></p>
            <div className='flex flex-col text-green-500'>
                <span className='font-bold text-4xl text-center'>{completedBookings}</span>
                <span className='font-medium'>Completed</span>
                
            </div>
              
        </div>

        <div className='gap-2 hover:shadow-md cursor-pointer border border-amber-400 p-3 rounded-2xl h-40 flex justify-evenly items-center hover:shadow-amber-400 transition-all duration-500'>
            <p className='my-auto p-3 bg-amber-300/30 text-amber-500 rounded-xl'><Clock size={25}/></p>
            <div className='flex flex-col'>
                <span className='font-bold text-4xl text-center text-amber-500'>{upcomingBookings}</span>
                <span className='font-medium text-amber-500'>Upcoming</span>
                
            </div>
        </div>

        <div className='gap-2 hover:shadow-md cursor-pointer border border-red-400 p-3 rounded-2xl h-40 flex justify-evenly items-center hover:shadow-red-400 transition-all duration-500'>
            <p className='my-auto p-3 bg-red-400/30 text-red-500 rounded-xl'><FaTimes size={25} className='rotate-180'/></p>
            <div className='flex flex-col'>
                <span className='font-bold text-4xl text-center text-red-500'>{cancelledBookings}</span>
                <span className='font-medium text-red-500'>Cancelled</span>
                
            </div>
        </div>
    </div>
  )
}
