import React, { useContext, useEffect, useState } from 'react'
import { supabase } from '../../supabaseClient';
import { toast } from 'sonner';
import { AdminContext } from '../../Context/AdminProvider';
import Swal from 'sweetalert2';
import { Calendar } from 'lucide-react';

export const Appointment = () => {

    const {admin, setAdmin} = useContext(AdminContext);
    const [bookings, setBookings] = useState([]);
    const [modal, setModal] = useState(true);

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

    const statusColor = {
    upcoming : "border-amber-200 bg-amber-500",
    completed : "border-green-200 bg-green-500",
    cancelled : "border-red-200 bg-red-500"
    }

    const view = async (book) => {
  const startTime = Number(book.time);
  const duration = Number(book.SS_price?.duration || 0);

  Swal.fire({
    title: "Booking Details",
    html: `
      <div">
      <p class=" text-2xl font-bold"> ${book.fullname} </p><br>
        <div class="flex justify-evenly">
          <div class="grid gap-2">
            <p>${book.SS_price?.service_name || "N/A"}</p>
            <p class="text-md">${book.booking_code}</p>
          </div>

          <div class="grid gap-2">
            <p> ${formatTime(startTime)} - ${formatTime(startTime + duration)}</p>
            <p> ${duration} mins</p>          
          </div>
        </div><br>
        <p class="capitalize"> ${book.status}</p>
      </div>
    `,
    confirmButtonText: "Close",
    confirmButtonColor: "#7c3aed",
  });
};

    const fetchData = async()=>{
       try{
          const today = new Date(). toISOString().split("T")[0];
          console.log(today);
          const {data, error} = await supabase
          .from("SS_bookingform")
          .select("*, SS_price(*)")
          .eq("team", admin?.id)
          .eq("date", today)

          if(error) throw error;
          setBookings(data);
       }catch(error){
          toast.error(error.message);
       }finally{

       }
    }

    useEffect(()=>{
        if(admin?.id){
            fetchData();
        }
    }, [admin]);
  return (
    <div className={`border border-slate-300 mt-3 md:w-2xl w-full p-3 rounded-xl overflow-y-auto ${bookings.length === 0 ? "h-45" : "max-h-77"}`}>
        <div>
          <h2 className='font-bold text-center text-2xl'>Today's Appointment</h2>
        </div><br />

        {bookings.length === 0 ? (
           <div className='text-center flex flex-col justify-center'>
              <Calendar size={40} className='text-slate-400 mx-auto'/>
              <p className='font-medium text-lg'>No appointments today</p>
               <p className="text-sm text-slate-400">
               You don't have any bookings scheduled for today.
               </p>
           </div>
        ) : (
          <div className='grid gap-2'>
          {bookings.map((book)=> {
            const startTime = Number(book.time);
            const duration = Number(book.SS_price?.duration || 0);
            return(
              <>
              <div key={book.id} className='shadow-sm shadow-slate-400 p-2 rounded-xl flex justify-between cursor-pointer' onClick={()=> view(book)}>
              <div className='my-auto'>
                 <p className='capitalize font-bold text-lg'>{book.fullname}</p>
                 <p className='text-xs font-medium text-slate-400 uppercase'>{book.SS_price?.service_name}</p>
              </div>

               {/* <div className='my-auto'>
                 <p className='font-bold text-slate-400'>{book.booking_code}</p>
               </div> */}

               <div>
                <p className='text-sm'>{formatTime(startTime)} - {getEndTime(startTime, duration)}</p>
                 <p className={`capitalize w-25 text-center text-white mx-auto p-1 rounded-lg font-medium border-3 ${statusColor[book.status]}`}>{book.status}</p>
               </div>
            </div>
              </>
            )
          })}
        </div>
        )}
    </div>
  )
}
