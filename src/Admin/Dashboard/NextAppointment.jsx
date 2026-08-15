import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner';
import { supabase } from '../../supabaseClient';
import { AdminContext } from '../../Context/AdminProvider';
import Swal from 'sweetalert2';
import { CgSpinner } from 'react-icons/cg';
import { Calendar } from 'lucide-react';

export const NextAppointment = () => {

    const {admin, setAdmin} = useContext(AdminContext);
    const [booking, setBooking] = useState([]);
    const [completedLoading, setCompletedloading] = useState(null);
    const [cancelledLoading, setCancelledloading] = useState(null);

    const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    const period = hours >= 12 ? "PM" : "AM";
    const displayHour = hours % 12 || 12;

    return `${displayHour}:${String(mins).padStart(2, "0")} ${period}`;
    };

    const getEndTime = (startMinutes, duration) => {
    return formatTime(Number(startMinutes) + Number(duration));
    };

    const complete = async(book)=> {
        setCompletedloading(book.id)
       try{
         const result = await Swal.fire({
            icon:"question",
            title:"Complete",
            text:"Are you sure?",
            showCancelButton:true,
            confirmButtonColor:"green",
            confirmButtonText:"Complete"
         })

         if(!result.isConfirmed)return;

         const {error} = await supabase
         .from("SS_bookingform")
         .update({
            status:"completed"
         })
         .eq("id", book.id)

         if(error) throw error;
         toast.success("Status changed to completed");
         fetchData();
       }catch(error){
         toast.error(error.message)
       }finally{
        setCompletedloading(null);
       }
    }

    const cancelled = async(book)=> {
       setCancelledloading(book.id);

       try{
           const result = await Swal.fire({
            icon:"question",
            title:"Cancel",
            text:"Are you sure?",
            showCancelButton:true,
            confirmButtonColor:"red",
            confirmButtonText:"Comfirm"
         })

         if(!result.isConfirmed)return;

         const {error} = await supabase
         .from("SS_bookingform")
         .update({
            status:"cancelled"
         })
         .eq("id", book.id)

         if(error) throw error;
         toast.success("Status changed to cancelled"); 
         fetchData();
       }catch(error){
          toast.error(error.message)
       }finally{
         setCancelledloading(null);
       }
    }

    const fetchData = async()=> {
       try{
         const today = new Date(). toISOString().split("T")[0];
         const {data, error} = await supabase
         .from("SS_bookingform")
         .select("*, SS_price(*)")
         .eq("status", "upcoming")
         .eq("team", admin?.id)
         .eq("date", today)
         .order("time", {ascending:true})
         .limit(1)

         if(error) throw error;
         setBooking(data);
       }catch(error){
         toast.error(error.message);
       }
    }

    useEffect(()=> {
        if(admin?.id){
            fetchData();
        }
    }, [admin])
  return (
    <div className={`border mt-3 mx-auto p-3 rounded-xl border-slate-300 ${booking.length === 0 ? "h-45" : ""}`}>
        <div>
          <h2 className='text-2xl font-bold text-center'>Next Appointment</h2><br />

          {booking.length === 0 ? (
            <div className='text-center flex flex-col justify-center'>
                          <Calendar size={40} className='text-slate-400 mx-auto'/>
                          <p className='font-medium text-lg'>No next appointments today</p>
                           <p className="text-sm text-slate-400">
                           You don't have any next appointent today.
                           </p>
            </div>
          ) : (
            <div className='h-40 flex items-center justify-center'>
                {booking.map((book)=> {
                    const startTime = Number(book.time);
                    const duration = Number(book.SS_price?.duration || 0);

                    return(
                        <div key={book.id} className='w-full'>
                            <p className='text-xl font-bold text-center mb-3'>{formatTime(startTime)} - {getEndTime(startTime, duration)}</p>
                            <div className='flex justify-between'>
                            <div>
                                <p className='font-medium text-xl'>{book.fullname}</p>
                                <p className='text-sm uppercase'>{book.SS_price.service_name}</p>
                                <p className='capitalize'>{book.status}</p>
                            </div>

                            <div className='my-auto'>
                                <p className='text-4xl font-bold my-auto'>£{book.SS_price.price}</p>
                            </div>
                            </div>

                            <div className='mt-4 flex justify-around gap-2'>
                                <button className='border-2 w-full p-1.5 text-green-500 font-bold border-green-500' onClick={()=> complete(book)}>{completedLoading === book.id ? <CgSpinner size={30} className='mx-auto animate-spin'/> : "Completed"}</button>
                                <button className='border-2 w-full p-1.5 text-red-500 font-bold border-red-500' onClick={()=> cancelled(book)}>{cancelledLoading === book.id ? <CgSpinner size={30} className='mx-auto animate-spin'/> : "Cancelled"}</button>
                            </div>
                        </div>
                    )
                })}
            </div>
          )}
        </div>
    </div>
  )
}
