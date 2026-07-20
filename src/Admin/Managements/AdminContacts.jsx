import React, { useEffect, useState } from 'react'
import { supabase } from '../../supabaseClient';
import { toast } from 'sonner';

export const AdminContacts = () => {

  const [address, setAddress] = useState("");
  const [phoneNumber, setPhonenumber] = useState("");
  const [whatsappNumber, setWhatsappnumber]= useState("");
  const [email, setEmail] = useState("");
  const [submitLoading, setSubmitloading] = useState(false);
  const [contactArray, setContactarray] = useState([]);
  const [loading, setLoading] = useState(true);

  const submitData = async()=>{
    setSubmitloading(true);
    try{
      const {data , error} = await supabase
      .from("SS_contacts")
      .update({
        email,
        address,
        phone_number:phoneNumber,
        whatsapp_number:whatsappNumber
      })
      .eq("id", contactArray)
      if(error) throw error;
      toast.success("Uploaded successfully")
    }catch(error){
       toast.error(error.message);
    }finally{
      setSubmitloading(false);
    }
  }

  const fetchData = async()=> {
    try{
      const {data, error} = await supabase
      .from("SS_contacts")
      .select("*")
      .single()

      if(error) throw error;
      setContactarray(data.id)
      
      setAddress(data.address);
      setPhonenumber(data.phone_number);
      setWhatsappnumber(data.whatsapp_number);
      setEmail(data.email);
      setLoading(false)
    }catch(error){
      toast.error(error.message);
    }finally{

    }
  }

  useEffect(()=> {
    fetchData();
  }, []);

  if(loading){
      return(
        <div className='h-[60vh] flex justify-center place-items-center'>
            <p className='flex gap-2'>
                <span className=''>
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
                
                <span className='text-slate-500 animate-pulse font-bold'>Fetching data</span>
                </p>
        </div>
      )
    }

  return (
    <div>
      <div className='mb-3'>
              <h2 className='font-bold text-2xl text-slate-600'>Contacts</h2>
              <div className='h-1.5 w-18 bg-slate-500 rounded-2xl mt-1'></div>
         </div>

         <div className='grid lg:grid-cols-3 gap-2'>
           <div className='grid gap-1'>
             <label htmlFor="">Address</label>
             <input type="text" className='border w-full h-11 p-2' placeholder='Input your address' onChange={(e) => setAddress(e.target.value)} value={address}/>
           </div>

           <div className='grid gap-1'>
             <label htmlFor="">Phone Number</label>
             <input type="tel" className='border w-full h-11 p-2' placeholder='Input your phone' onChange={(e) => setPhonenumber(e.target.value)} value={phoneNumber}/>
           </div>

           <div className='grid gap-1'>
             <label htmlFor="">Whatsapp Number</label>
             <input type="email" className='border w-full h-11 p-2' placeholder='Input your Whatsapp Number' onChange={(e)=> setWhatsappnumber(e.target.value)} value={whatsappNumber} />
           </div>

           <div className='grid gap-1'>
             <label htmlFor="">Email</label>
             <input type="email" className='border w-full h-11 p-2' placeholder='Input your email' onChange={(e)=> setEmail(e.target.value)} value={email}/>
           </div>
         </div>

         <div className='mt-2 flex justify-center' onClick={submitData}><button className='bg-blue-500 text-white md:w-35 w-full p-1.5'>{submitLoading ? 
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
         :"Submit"
        }</button></div>
    </div>
  )
}
