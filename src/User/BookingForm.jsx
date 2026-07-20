import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient';
import { toast } from 'sonner';
import { Scissors } from 'lucide-react';
import PhoneInput from 'react-phone-number-input';
import { isValidPhoneNumber } from 'react-phone-number-input';
import "react-phone-number-input/style.css";
import { useNavigate } from 'react-router-dom';

export const BookingForm = () => {

  const [priceArray , setPricearray] = useState([]);
  const [priceMenu, setPricemenu] = useState(false);
  const [selectedPrice, setSelectedprice] = useState(null);
  const [teamArray, setTeamarray] = useState([]);
  const [barber, setBarber] = useState(false);
  const [selectedTeam, setSelectedteam] = useState(null);
  const [teamMenu, setTeammenu] = useState(false);
  const [date, setDate] = useState("");
  const [dateMenu, setDatemenu] = useState(false);
  const [time, setTime] = useState(null);
  const [timeMenu, setTimemenu] = useState(false);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [whatsappNumber, setWhatsappnumber] = useState();
  const [preferredContact, setPreferredcontact] = useState(null);
  const [note, setNote] = useState("");
  const [submitLoading, setSubmitloading] =useState(false);
  const [selectedTime, setSelectedtime]=useState(null);
  const [bookedTimes, setBookedtimes] = useState([]);
  const navigate = useNavigate();

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
      setTeamarray(teamData);

      // bookedTimes
    }catch(error){
      toast.error(error.message);
    }finally{
      
    }
  }

  const handleBooked =async()=> {
     try{
       const {data:bookedData , error:bookedError} = await supabase
      .from("SS_bookingform")
      .select("time")
      .eq("team", selectedTeam?.id)
      .eq("service_price", selectedPrice?.id)
      .eq("date", date);

      if(bookedError) throw bookedError;
      setBookedtimes(bookedData.map(item=> Number(item.time)));
      console.log(bookedData);
     }catch(error){
      toast.error(error.message);
     }finally{

     }
  }

    const selectPrice = async(price)=> {
      setSelectedprice(price);
      setPricemenu(false);
      setBarber(true);
    }

    const selectTeam = async(team)=> {
      setSelectedteam(team);
      setTeammenu(false);
      setDatemenu(true);
    }

    const selectTime = async(item) => {
      setSelectedtime(item);
    }

    const times = ()=> {
      if(!selectedPrice) return [];
      // console.log(typeof selectedPrice.duration)

      const duration = Number(selectedPrice.duration);
      const openingTime = 540; //9:00
      const closingTime = 1110; //6:30
      const breakTime = 10;

      let currentTime = openingTime;
      const availableTimes = [];

      while (currentTime + duration <= closingTime){
        availableTimes.push(currentTime);
        currentTime += duration + breakTime;
      }
      return availableTimes;
    }

    const minutesToTime = (minutes)=> {
      const hour = Math.floor(minutes / 60);
      const minute = minutes % 60;

      return `${hour}:${minute.toString().padStart(2,0)}`;
    }

    const availabletimes = times();

    const resetForm = () => {
  setSelectedprice(null);
  setBarber(false);
  setSelectedteam(null);
  setTeammenu(false);
  setDatemenu(false);
  setTimemenu(false);
  setDate("");
  setSelectedtime(null);
  setFullname("");
  setEmail("");
  setWhatsappnumber(undefined);
  setPreferredcontact(null);
  setNote("");

  setBookedtimes([]);
}

    const submit =async(e)=> {
      e.preventDefault();
      setSubmitloading(true);

      try{
        const data = {
          selectedPrice,
          selectedTeam,
          date,
          selectedTime,
          fullname,
          email,
          whatsappNumber,
          preferredContact,
          note
        }

      if (preferredContact === "whatsapp" && !isValidPhoneNumber(whatsappNumber)) {
      toast.error("Please enter a valid phone number");
      return;
      }

        if(!selectedPrice || !selectedTeam || !date || !selectedTime || !detailedContact){
          toast.warning("Fields cant be empty, check again")
          return;
        }

        const character = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
        let randomCharacters = "";
        for (let i = 0; i < 6; i++){
          const randomIndex = Math.floor(Math.random() * character.length);
          randomCharacters += character[randomIndex];
        }

        const bookingCode = `SS-${randomCharacters}`;

        const {error} = await supabase
        .from("SS_bookingform")
        .insert({
          service_price:selectedPrice.id,
          team:selectedTeam.id,
          date,
          time:selectedTime,
          fullname,
          email,
          whatsapp_number:whatsappNumber,
          preferred_contact:preferredContact,
          notes:note,
          booking_code:bookingCode
        })

        if(error) throw error;
        toast.success("uploaded successfully");
         resetForm();
        // console.log(data);
      }catch(error){
        toast.error(error.message);
      }finally{
         setSubmitloading(false);
      }
    }
    
    const detailedContact = 
    fullname && (email || whatsappNumber) && preferredContact;

  useEffect(()=> {
    fetchData();
  }, [])

  useEffect(() => {
  if (selectedTeam && selectedPrice && date) {
    handleBooked();
  }
}, [selectedTeam, selectedPrice, date]);

  return (
    <div className='p-3 lg:w-2xl border border-slate-200 rounded-2xl'>
       <div>
         <h2 className='text-5xl text-center' style={{fontFamily:"fantasy", letterSpacing:"2px"}}>Book An Appointment</h2>
         <p className='text-center mt-2'>Pick a time that works best for you.</p>
       </div><br />

       <div className='grid grid-cols-4 mt-2'>
         <div className='grid gap-2'>
           <span className={`border text-black rounded-full w-8 h-8 flex justify-center place-items-center mx-auto ${selectedPrice ? "bg-black border-white text-white" : ""}`}><span className='text-xl font-bold'>
            {selectedPrice ? 
            <span>
             <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
	           <path d="M0 0h24v24H0z" fill="none" />
	           <path fill="none" stroke="currentColor" stroke-dasharray="26" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11l6 6l10 -10">
		         <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="26;0" />
	           </path>
             </svg>
           </span> 
           : "1" 
          }
            </span></span>
           <p className='font-bold uppercase text-xs text-center'>Service</p>
         </div>


         <div className='grid gap-2'>
           <span className={`border text-black rounded-full w-8 h-8 flex justify-center place-items-center mx-auto ${selectedTeam ? "bg-black border-white text-white" : ""}`}><span className='text-xl font-bold'>
            {selectedTeam ? 
            <span>
             <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
	           <path d="M0 0h24v24H0z" fill="none" />
	           <path fill="none" stroke="currentColor" stroke-dasharray="26" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11l6 6l10 -10">
		         <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="26;0" />
	           </path>
             </svg>
           </span> 
           : "2" 
          }
            </span></span>
           <p className='font-bold uppercase text-xs text-center'>barber</p>
         </div>

         <div className='grid gap-2'>
           <span className={`border text-black rounded-full w-8 h-8 flex justify-center place-items-center mx-auto ${date && selectedTime ? "bg-black border-white text-white" : ""}`}><span className='text-xl font-bold'>
            {date && selectedTime ? 
            <span>
             <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
	           <path d="M0 0h24v24H0z" fill="none" />
	           <path fill="none" stroke="currentColor" stroke-dasharray="26" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11l6 6l10 -10">
		         <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="26;0" />
	           </path>
             </svg>
           </span> 
           : "3" 
          }
            </span></span>
           <p className='font-bold uppercase text-xs text-center'>date & time</p>
         </div>

         <div className='grid gap-2'>
           <span className={`border text-black rounded-full w-8 h-8 flex justify-center place-items-center mx-auto ${detailedContact ? "bg-black text-white" : ""}`}><span className='text-xl font-bold'>
             {detailedContact ? 
            <span>
             <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
	           <path d="M0 0h24v24H0z" fill="none" />
	           <path fill="none" stroke="currentColor" stroke-dasharray="26" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11l6 6l10 -10">
		         <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="26;0" />
	           </path>
             </svg>
           </span> 
           : "4" 
          }
            </span></span>
           <p className='font-bold uppercase text-center text-xs'>details</p>
         </div>
       </div><br />
       
       <form action="" className='border border-slate-200 rounded-2xl p-3 mx-auto' onSubmit={submit}>
          <div className={`grid grid-cols-1 gap-4 ${barber ? "md:grid-cols-2" : ""}`}>
            {/* Select Services */}
              <div className='border border-slate-200 rounded-2xl p-2 '>
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
          {barber && (
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
                  <div className='flex gap-2 w-full'>
                  <img src={selectedTeam.img_url} alt="" className='w-14 h-14 object-cover rounded-lg my-auto' />
                  <div className='flex flex-col my-auto w-full'>
                     <div className='flex justify-between'>
                      <span className='font-bold text-xl'>{selectedTeam.username}</span>
                      <span className='text-sm my-auto capitalize'>{selectedTeam.position}</span>
                     </div>
                     <span className=''>{selectedTeam.description}</span>
                  </div>
                 </div>

                 <button className='text-red-500 h-fit my-auto' type='button' onClick={()=> {setSelectedteam(null); setDatemenu(false); setDate(false); setSelectedtime(null)}}>
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
          )}

          {/* date */}
          {dateMenu && (
          <div className='border border-slate-200 p-2 rounded-xl'>
             <div>
              <h2 className='font-bold uppercase'>Select Date</h2>
             </div>

             <div className='mt-1.5'>
                <input type="date" className='border w-full h-10 p-2' required onChange={(e)=>  setDate(e.target.value)}/>
             </div>

             <div className='md:py-2.5 p-1'>
                <h2 className='text-3xl font-bold text-center'>{date}</h2>
                <p className='text-2xl text-center'>{minutesToTime(selectedTime)}</p>
             </div>
          </div>
          )}

          {date && (
            <div className='border border-slate-200 p-2 rounded-xl'>
              <div>
               <h2 className='font-bold uppercase'>Select time</h2>
              </div>

              <div className='mt-2 grid lg:grid-cols-4 grid-cols-3 gap-2'>
                {availabletimes.map((item)=> {
                   const booked = bookedTimes.includes(item);
                  return(
                    <button key={item} type='button' disabled={booked} onClick={()=> selectTime(item)} className={`border p-2 transition-all
                    ${booked ? "bg-slate-200 text-slate-400 border-slate-200 cursor-not-allowed" : selectedTime === item ? "bg-black text-white border-black" : "bg-green-500 text-white hover:bg-green-600" }`}>
                    {minutesToTime(item)}
                  </button>
                  )
                 })}
              </div>
              
              <div className='mt-2.5 flex gap-5'>
                <span className='flex gap-1 font-bold'><span className='w-4 h-4 bg-green-400 block rounded-full my-auto'></span>Available</span>
                <span className='flex gap-1 font-bold'><span className='w-4 h-4 bg-slate-300 block rounded-full my-auto'></span>Booked</span>
                <span className='flex gap-1 font-bold'><span className='w-4 h-4 bg-black block rounded-full my-auto'></span>Selected</span>
              </div>
            </div>
          )}
          </div>

          {/* Details */}
            {selectedTime && (
                           <div>
              <div className='mt-2 flex md:flex-row flex-col gap-2'>
               <div className=''>
                  <h2 className='font-bold uppercase mb-1'>Preferred contact</h2>
                  <div className='flex gap-2'>
                     <button className={`border border-slate-300 flex p-1.5 gap-1 font-bold `} onClick={()=> setPreferredcontact("whatsapp")} type='button'>
                      <span className={`w-3 h-3  rounded-full border my-auto ${preferredContact === "whatsapp" ? "bg-black" : "bg-white"}`}></span>
                      <span className='my-auto'>
                         <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 512 512">
	                       <path d="M0 0h512v512H0z" fill="none" />
	                       <path fill="#b3b3b3" d="m143.8 431.2l7.7 4.5c32.2 19.1 69.2 29.2 106.8 29.2h.1c115.7 0 209.8-94.1 209.9-209.8c0-56.1-21.8-108.8-61.4-148.4c-39.3-39.5-92.7-61.7-148.4-61.5c-115.8 0-209.9 94.1-210 209.8c-.1 39.5 11.1 78.2 32.1 111.7l5 7.9L64.4 452zM3.7 512l35.8-130.8C17.5 342.9 5.8 299.5 5.9 255C5.9 115.8 119.2 2.6 258.4 2.6c67.5 0 130.9 26.3 178.6 74s73.9 111.1 73.9 178.6c-.1 139.2-113.3 252.4-252.5 252.4h-.1c-42.3 0-83.8-10.6-120.7-30.7z" />
                      	<path fill="#fff" d="M1.1 509.4L37 378.6C14.8 340.2 3.2 296.7 3.3 252.4C3.3 113.2 116.6 0 255.8 0c67.5 0 130.9 26.3 178.6 74s73.9 111.1 73.9 178.6C508.2 391.8 394.9 505 255.8 505h-.1c-42.3 0-83.8-10.6-120.7-30.7z" />
                      	<linearGradient id="SVGshpjYc9B" x1="254.658" x2="256.786" y1="345.363" y2="704.074" gradientTransform="translate(0 -277.552)" gradientUnits="userSpaceOnUse">
		                    <stop offset="0" stop-color="#57d163" />
		                    <stop offset="1" stop-color="#23b33a" />
	                      </linearGradient>
	                      <path fill="url(#SVGshpjYc9B)" d="M255.8 42.6c-115.8 0-209.9 94.1-210 209.8c0 39.5 11.2 78.2 32.2 111.7l5 7.9l-21.2 77.4l79.4-20.8l7.7 4.5c32.2 19.1 69.2 29.2 106.8 29.2h.1c115.7 0 209.8-94.1 209.9-209.8c.2-55.7-21.9-109.1-61.4-148.4c-39.3-39.4-92.8-61.6-148.5-61.5" />
	                      <path fill="#fff" fill-rule="evenodd" d="M192.7 146.9c-4.7-10.5-9.7-10.7-14.2-10.9l-12.1-.1c-4.2 0-11 1.6-16.8 7.9s-22.1 21.6-22.1 52.6s22.6 61 25.8 65.2s43.6 69.9 107.8 95.2c53.3 21 64.1 16.8 75.7 15.8c11.6-1.1 37.3-15.3 42.6-30s5.3-27.4 3.7-30s-5.8-4.2-12.1-7.4s-37.3-18.4-43.1-20.5s-10-3.2-14.2 3.2c-4.2 6.3-16.3 20.5-20 24.7s-7.4 4.7-13.7 1.6c-6.3-3.2-26.6-9.8-50.7-31.3c-18.8-16.7-31.4-37.4-35.1-43.7s-.4-9.7 2.8-12.9c2.8-2.8 6.3-7.4 9.5-11.1s4.2-6.3 6.3-10.5s1.1-7.9-.5-11.1c-1.8-3-14-34.2-19.6-46.7" />
                        </svg>
                      </span>
                      <span>Whatsapp</span>
                     </button>
                     
                     <button className={`border border-slate-300 flex p-1.5 w-full gap-1 font-bold`} type='button' onClick={()=> setPreferredcontact("email")}>
                      <span className={`w-3 h-3 rounded-full border my-auto ${preferredContact === "email" ? "bg-black" : "bg-white"}`}></span>
                       <span className='my-auto'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
	                      <path d="M0 0h24v24H0z" fill="none" />
	                      <path fill="currentColor" d="M4.616 19q-.691 0-1.153-.462T3 17.384V6.616q0-.691.463-1.153T4.615 5h14.77q.69 0 1.152.463T21 6.616v10.769q0 .69-.463 1.153T19.385 19zM12 12.116L4 6.885v10.5q0 .269.173.442t.443.173h14.769q.269 0 .442-.173t.173-.443v-10.5zM12 11l7.692-5H4.308zM4 6.885V6v11.385q0 .269.173.442t.443.173H4z" />
                        </svg>
                       </span>
                       <span>Email</span>
                     </button>
                  </div>
               </div>
            </div>

            <div className='mt-2 border border-slate-300 p-2 rounded-xl'>
            <div className='mb-1'>
              <h2 className='font-bold uppercase'>Your details</h2>
            </div>

           {preferredContact && (
             <div className='flex md:flex-row flex-col flex-wrap gap-2 w-full'>
              <div>
                <label htmlFor="">Full Name</label>
                <input type="text" className='w-full border h-11 p-2' value={fullname} placeholder='Enter your full name' onChange={(e)=> setFullname(e.target.value)} required/>
              </div>

              {preferredContact === "email" ? 
              (
                <div>
                <label htmlFor="">Email</label>
                <input type="email" className='w-full border h-11 p-2' value={email} placeholder='youremail@gmail.com' onChange={(e)=> setEmail(e.target.value)} required/>
              </div>
              )
              :
              (
                <div>
                 <label htmlFor="">WhatsApp Number</label>
                 <PhoneInput international defaultCountry='GB' value={whatsappNumber}  className="w-full h-11 border rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={setWhatsappnumber} required/>
              </div>
              )
              }

              <div className='w-full'>
                <h2 className='font-bold uppercase mb-1'>Notes (optional)</h2>
                <textarea name="" id="" className='border w-full h-15 p-2' onChange={(e)=> setNote(e.target.value)}></textarea>
              </div>
            </div>
           )}
          </div>

           <div className='mt-2'>
            <button className={`bg-blue-500 text-white font-bold w-full p-2 ${submitLoading ? "cursor-wait bg-blue-100/20" : ""}`} disabled={submitLoading || !selectedTime || !preferredContact}>{submitLoading ?
             <span className='flex justify-center'>
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
            : "Book Appointment"}</button>
           </div>
             </div>
            )}
       </form>
       
       <button className='bg-slate-500 text-white w-full mt-2 p-2' onClick={()=> navigate("/booking")}>View Booking</button>
    </div>
  )
}
