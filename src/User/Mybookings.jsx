import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient';
import { toast } from 'sonner';
import { BookAIcon, Calendar, Check, Clock } from 'lucide-react';
import { FaCalendar, FaCalendarAlt, FaTimesCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { BookingModal } from './BookingModal';

export const Mybookings = () => {

    const [bookingArray, setBookingarray] = useState([]);
    const [customerName, setCustomername] = useState("");
    const [activeState, setActivestate] = useState("all");
    const [selectedBooking, setSelectedBooking] = useState(null);

    const navigate = useNavigate();

    const filteredBooking =
    activeState === "all"
    ? bookingArray
    : bookingArray.filter((book)=> book.status.toLowerCase() === activeState);

    const totalBookings = bookingArray.length;

    const upcomingBookings = bookingArray.filter(
      book => book.status === "upcoming"
    ).length;

    const completedBookings = bookingArray.filter(
      book => book.status === "completed"
    ).length;

    const cancelledBookings = bookingArray.filter(
      book => book.status === "cancelled"
    ).length;


    const fetchData = async()=> {
      try{
        const customerId = localStorage.getItem("CustomerId");
        // console.log(customerId);

        if (!customerId) {
         navigate("/booking")
        }

        if(customerId.includes("@")){
           const {data, error} = await supabase
           .from("SS_bookingform")
           .select(`
            *,
            SS_price(*),
            SS_adminsignup(*)
            `)
           .eq("email", customerId)
           .order("created_at", {ascending:true});

           if(error) throw error;
           setBookingarray(data);

           if(data.length > 0 ){
            setCustomername(data[0].fullname)
           }
        }else{
            const {data, error} = await supabase
           .from("SS_bookingform")
           .select(`
            *,
            SS_price(*),
            SS_adminsignup(*)
            `)
           .eq("whatsapp_number", customerId)
           .order("created_at", {ascending:true});

           if(error) throw error;
           setBookingarray(data);

            if(data.length > 0 ){
            setCustomername(data[0].fullname)
           }
        }
      }catch(error){
         toast.error(error.message);
      }finally{

      }
    }

    const formatDate = (date) => {
     return new Date(date).toLocaleDateString("en-GB", {
     day: "numeric",
     month: "short",
     year: "numeric",
     });
    };

    const formatTime = (minutes) => {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;

    const date = new Date();
    date.setHours(hour, minute);

    return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
};

const getRelativeDate = (dateString) => {
  const today = new Date();
  const bookingDate = new Date(dateString);

  today.setHours(0, 0, 0, 0);
  bookingDate.setHours(0, 0, 0, 0);

  const diff =
    (bookingDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  if (diff === -1) return "Yesterday";
  if (diff > 1) return `In ${diff} days`;
  return `${Math.abs(diff)} days ago`;
};

const statusColor = {
    upcoming:"border-l-4 border-amber-500",
    completed:"border-l-4 border-green-500",
    cancelled:"border-l-4 border-red-500"
};

const statusBall = {
    upcoming :"bg-amber-500",
    completed :"bg-green-500",
    cancelled : "bg-red-500"
}

const back = ()=> {
        localStorage.removeItem("CustomerId");
       navigate(-1)
}

    useEffect(()=> {
        fetchData();
    }, [])

  return (
    <div className='p-2'>
        <div className='flex'>
            <button className='bg-slate-300 p-2' onClick={back}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
	            <path d="M0 0h24v24H0z" fill="none" />
 	            <g fill="none">
		        <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
		        <path fill="currentColor" d="M3.636 11.293a1 1 0 0 0 0 1.414l5.657 5.657a1 1 0 0 0 1.414-1.414L6.757 13H20a1 1 0 1 0 0-2H6.757l3.95-3.95a1 1 0 0 0-1.414-1.414z" />
	            </g>
                </svg>
            </button>
        </div>

        {/* greetings */}
        <div className='rounded-xl p-2 mt-2'>
            <h2 className='font-semibold text-3xl text-blue-900'>Hello, {customerName} 
                <span className='text-amber-400 inline-block'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24">
	                <path d="M0 0h24v24H0z" fill="none" />
	                <g fill="none">
		            <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
            		<path fill="currentColor" d="m10.71 2.888l4.724 4.724c0-.394.018-.766.066-1.107c.153-1.095.623-2.113 1.78-2.597l.156-.055c.735-.216 1.462.184 1.75.822l.055.14l2.01 6.027a8 8 0 0 1-1.933 8.187l-.476.477a8 8 0 0 1-11.314 0l-4.596-4.597a1.5 1.5 0 0 1 0-2.121l.114-.103a1.5 1.5 0 0 1 2.007.104l1.796 1.797a.25.25 0 0 0 .354-.354l-3.919-3.919a1.5 1.5 0 0 1 0-2.12l.114-.103a1.5 1.5 0 0 1 2.008.102l3.256 3.256a.25.25 0 0 0 .354 0a.25.25 0 0 0 0-.354L4.522 6.6a1.75 1.75 0 0 1 0-2.474l.133-.121a1.75 1.75 0 0 1 2.342.12l5.156 5.157a.25.25 0 0 0 .354-.354L8.587 5.01a1.5 1.5 0 0 1 .002-2.123l.113-.102a1.5 1.5 0 0 1 2.008.102M4.006 17.234l.054.255c.18.711.74 1.273 1.452 1.451l.254.054a1 1 0 0 1-.33 1.963l-.41-.077a4 4 0 0 1-2.906-2.905l-.076-.412a1 1 0 0 1 1.962-.329m9.16-16.179a4 4 0 0 1 2.685 1.758l.16.278a1.001 1.001 0 0 1-1.722.996l-.176-.27a2 2 0 0 0-1.107-.752l-.171-.037a1 1 0 0 1 .33-1.973" />
	                </g>
                    </svg>
                </span>
            </h2>
            <p className='mt-1.5 text-lg'>Here's your Appointment overview.</p>
        </div>

        {/* cards */}
        <div className='grid md:grid-cols-4 grid-cols-2 gap-2 mt-2'>
            <div className={`flex md:flex-row flex-col border border-blue-400 p-2 lg:gap-2 h-40 items-center justify-between rounded-2xl ${activeState === "all" ? "bg-blue-50" : "" }`} onClick={()=> setActivestate("all")}>
               <span className='h-fit p-3 rounded-full text-blue-500 bg-blue-100/50'><Calendar size={50}/></span>
               <div className='text-center text-blue-600'>
                 <h2 className='text-4xl font-bold'>{bookingArray.length}</h2>
                 <p>Total Appointments</p>
               </div>
            </div>

             <div className={`flex border md:flex-row flex-col border-amber-400 p-2 gap-2 h-40 items-center justify-between rounded-2xl ${activeState === "upcoming" ? "bg-amber-50" : "" }`}
             onClick={()=> setActivestate("upcoming")}>
               <span className='h-fit p-3 rounded-full text-amber-500 bg-amber-100/50'><Clock size={50}/></span>
               <div className='text-center text-amber-600'>
                 <h2 className='text-4xl font-bold'>{upcomingBookings}</h2>
                 <p>Upcoming</p>
               </div>
            </div>

             <div className={`flex md:flex-row flex-col border border-green-400 p-2 gap-2 h-40 items-center justify-between rounded-2xl ${activeState === "completed" ? "bg-green-50" : "" }`} onClick={()=> setActivestate("completed")}>
               <span className='h-fit p-3 rounded-full text-green-500 bg-green-100/50'><Check size={50}/></span>
               <div className='text-center text-green-600'>
                 <h2 className='text-4xl font-bold'>{completedBookings}</h2>
                 <p>Completed</p>
               </div>
            </div>

             <div className={`flex md:flex-row flex-col border border-red-400 p-2 gap-2 h-40 items-center justify-between rounded-2xl ${activeState === "cancelled" ? "bg-red-50" : "" }`} onClick={()=> setActivestate("cancelled")}>
               <span className='h-fit p-3 rounded-full text-red-500 bg-red-100/50'><FaTimesCircle size={50}/></span>
               <div className='text-center text-red-600'>
                 <h2 className='text-3xl font-bold'>{cancelledBookings}</h2>
                 <p>Cancelled</p>
               </div>
            </div>
        </div><br />

      <div className='pb-2'>
        {activeState && (
             <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-2.5'>
                {filteredBooking.map((book, index)=> (
                 <div className={`border p-2 flex gap-2 justify-between lg:w-md rounded-2xl bg-white w-full shadow-sm cursor-pointer ${statusColor[book.status]}`} key={book.id} onClick={()=> setSelectedBooking(book)}>
                   <div className='flex'>
                     <p className='my-auto p-3 rounded-full'>{index + 1}. </p>

                  <div className='w-full'>
                     <p className='font-bold text-xl text-slate-900 capitalize border-b w-fit mb-1'>{book.SS_price.service_name}</p>

                     <small className='flex mt-1.5'><span className='my-auto font-medium text-gray-500 text-sm'>Barber: {book.SS_adminsignup.username}</span></small>
 
                     <div className='grid gap-1 mt-1'>
                        <span className='flex'><Calendar size={18} className='my-auto text-gray-400'/> <span className='my-auto text-gray-600'>{getRelativeDate(book.date)} <span>({formatDate(book.date)})</span></span></span>

                        <span className='flex'><Clock size={18} className='my-auto text-slate-400'/><span className='my-auto text-gray-600'>{formatTime(book.time)}</span></span>
                     </div>

                     <p className='capitalize flex gap-0.5 mt-1.5'><span className={`w-4.5 h-4.5 my-auto block animate-pulse rounded-full ${statusBall[book.status]}`}></span>{book.status}</p>
                     <p className="mt-1 text-gray-500 text-sm">Booked on:{" "}
                        {new Date(book.created_at).toLocaleString("en-GB", {
                         day: "numeric",
                         month: "short",
                         year: "numeric",
                         hour: "numeric",
                         minute: "2-digit",
                         hour12: true,
                         })}
                         </p>
                  </div>
                   </div>

                   <div className='my-auto'>
                      <span className='text-3xl font-bold block text-slate-900'>£{book.SS_price.price}</span>
                      <span className='text-center block'>{book.SS_price.duration}mins</span>
                   </div>
                 </div>
                ))}
             </div>
        )}

        {/* modal */}
         <div className=''>
           <BookingModal
           booking={selectedBooking}
           onClose={()=> setSelectedBooking(null)}
           refresh={fetchData}
           />
         </div>
      </div>
    </div>
  )
}
