import React, { useEffect } from 'react'
import { useState } from 'react';
import { supabase } from '../../supabaseClient';
import { toast } from 'sonner';

export const ProfileInfo = () => {

   const [saveLoading , setSaveloading] = useState(false);
   const [adminProfile , setAdminprofile] = useState(null);
   const [fullname, setFullname] = useState("");
   const [username, setUsername] = useState("");
   const [phoneNumber, setPhonenumber] = useState("");
   const [loading , setLoading] = useState(true)

   const submitData = async(e)=> {
    e.preventDefault();
    setSaveloading(true);

     try{
        const {error} = await supabase
        .from("SS_adminsignup")
        .update({
          fullname,
          username,
          phone_number:phoneNumber
        })
        .eq("id", adminProfile?.id)

        if(error) throw error;
        setSaveloading(false);
        toast.success("Saved successfully");
     }catch(error){
       toast.error(error.message);
     }finally{
       setSaveloading(false)
     }
   }

   const fetchData = async()=> {
    try{
      const adminprofile = JSON.parse(localStorage.getItem("AdminProfile"));
      // console.log(adminprofile?.id)

      const {data:dbData , error:dbError} = await supabase
      .from("SS_adminsignup")
      .select("*")
      .eq("id", adminprofile?.id)
      .maybeSingle();

      if(dbError) throw dbError;
      setAdminprofile(dbData);
      setFullname(dbData?.fullname || "");
      setUsername(dbData?.username || "");
      setPhonenumber(dbData?.phone_number || "");
      setLoading(false);
    }catch(error){
      toast.error(error.message);
    }finally{

    }
   }

   useEffect(()=> {
      fetchData();
   }, [])

  if(loading){
    return(
      <div className='h-[80vh] flex flex-col gap-2 justify-center place-items-center'>
        <span>
           <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
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
         <span className='animate-pulse'>Fetching Details . . .</span>
      </div>
    )
  }

  return (
    <div>
      <div>
        <h2 className='text-3xl font-bold text-center'>Personal Details</h2>
        <span className='mt-2 block text-center'>Enter your personal details. These help customers and your team identify you.</span>
      </div><br />

      <div className='mt-3'>
        <form action="" className='px-2 grid gap-3 md:w-md w-full mx-auto' onSubmit={submitData}>
          <div className='grid gap-1'>
            <label htmlFor="" className='font-bold text-md '>Fullname <span className='text-xs'>(required)</span></label>
            <input type="text" className='border h-11 p-3 w-full' value={fullname} placeholder='Input Fullname' onChange={(e)=> setFullname(e.target.value)}/>
          </div>

          <div className='grid gap-1'>
            <label htmlFor="" className='font-bold text-md'>UserName</label>
            <input type="text" className='border h-11 p-3 w-full' value={username} placeholder='Input UserName' onChange={(e)=> setUsername(e.target.value)}/>
          </div>

           <div className='grid gap-1'>
            <label htmlFor="" className='font-bold text-md'>Email</label>
            <span className='w-full border h-11 rounded-lg p-3 text-slate-500 border-black'>{adminProfile?.email}</span>
          </div>

          <div className='grid gap-1'>
            <label htmlFor="" className='font-bold text-md'>Phone Number <span className='text-xs'>(required)</span></label>
            <input type="tel" className='border h-11 p-3 w-full' placeholder='Input PhoneNumber' maxLength={15} minLength={10} onChange={(e)=> setPhonenumber(e.target.value)} value={phoneNumber}/>
          </div>

          <div className='absolute top-1.5 right-2'>
            <button className={`h-fit font-bold bg-blue-600/90 text-white w-15 p-0.5 ${!fullname || !phoneNumber ? "hidden" : ""}`}>{saveLoading ? 
             <span className='flex justify-center'>
           <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
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
            : "Save"}</button>
          </div>
        </form>
      </div>

    </div>
  )
}
