import React, { useState } from "react";
import { X, Calendar, Clock, User, BadgePoundSterling } from "lucide-react";
import Swal from "sweetalert2";
import { supabase } from "../supabaseClient";
import { toast } from "sonner";

export const BookingModal = ({ booking, onClose }) => {
  if (!booking) return null;

  const [cancelLoading, setCancelloading] = useState(null);

  const statusColor = {
    upcoming : "border-amber-500 text-amber-500",
    completed : "border-green-500 text-green-500",
    cancelled : "border-red-500 text-red-500"
  }

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

const formatDate = (date) => {
     return new Date(date).toLocaleDateString("en-GB", {
     day: "numeric",
     month: "short",
     year: "numeric",
     });
    };

  const cancel = async(id)=> {
    setCancelloading(id);

    try{
      const result = await Swal.fire({
        icon:"warning",
        title:"Cancel Appointment?",
        text:"Are you sure you want to cancel your appointment?",
        showCancelButton:true,
        confirmButtonColor:"red",
        confirmButtonText:"Cancel Appointment"
      })

      if(!result.isConfirmed) return;
      const {error} = await supabase
      .from("SS_bookingform")
      .update({
        status:"cancelled"
      })
      .eq("id", booking.id)

      if(error) throw error;
      toast.success("Cancelled succesfully");
      onClose()
      window.location.reload();
    }catch(error){
      toast.error(error.message);
    }finally{
     setCancelloading(null);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">

      <div className="bg-white rounded-3xl w-[95%] md:w-125 p-5 animate-in fade-in zoom-in duration-300">

        {/* Header */}

        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="font-bold text-2xl">
            Appointment Details
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Service */}

        <div className="mt-5">

          <h2 className="text-2xl font-bold capitalize">
            {booking.SS_price.service_name}
          </h2>

          <p className="text-gray-500">
            Booking ID: {booking.booking_code}
          </p>

        </div>

        {/* Information */}

        <div className="grid gap-4 mt-6">

          <div className="flex justify-between">

            <span className="flex gap-2">
              <User size={18}/>
              Barber
            </span>

            <span>{booking.SS_adminsignup.fullname}</span>

          </div>

          <div className="flex justify-between">

            <span className="flex gap-2">
              <Calendar size={18}/>
              Date
            </span>

            <span>{formatDate(booking.date)}</span>

          </div>

          <div className="flex justify-between">

            <span className="flex gap-2">
              <Clock size={18}/>
              Time
            </span>

            <span>{formatTime(booking.time)}</span>

          </div>

          <div className="flex justify-between">

            <span>Duration</span>

            <span>{booking.SS_price.duration} mins</span>

          </div>

          <div className="flex justify-between">

            <span className="flex gap-2">
              <BadgePoundSterling size={18}/>
              Price
            </span>

            <span className="font-bold">
              £{booking.SS_price.price}
            </span>

          </div>

          <div className="flex justify-between">

            <span>Status</span>

            <span className={`capitalize font-bold w-25 border text-center rounded-lg animate-pulse ${statusColor[booking.status]}`}>
              {booking.status}
            </span>

          </div>

        </div>

        {/* Footer */}

        <div className="mt-8">

          <button className={`w-full bg-red-500 text-white rounded-xl p-3 ${booking.status === "upcoming" ? "" : "hidden"}`} onClick={()=> cancel(booking.id)} disabled={cancelLoading}>
            {cancelLoading === booking.id ? 
            <span className="flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
	            <path d="M0 0h24v24H0z" fill="none" />
	            <g>
		        <circle cx="12" cy="2.5" r="1.5" fill="currentColor" opacity=".14" />
		        <circle cx="16.75" cy="3.77" r="1.5" fill="currentColor" opacity=".29" />
		        <circle cx="20.23" cy="7.25" r="1.5" fill="currentColor" opacity=".43" />
		        <circle cx="21.5" cy="12" r="1.5" fill="currentColor" opacity=".57" />
		        <circle cx="20.23" cy="16.75" r="1.5" fill="currentColor" opacity=".71" />
		        <circle cx="16.75" cy="20.23" r="1.5" fill="currentColor" opacity=".86" />
		        <circle cx="12" cy="21.5" r="1.5" fill="currentColor" />
		        <animateTransform attributeName="transform" calcMode="discrete" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12" />
	            </g>
                </svg>
            </span>
            : "Cancel Appointment"}
          </button>

        </div>

      </div>

    </div>
  );
};