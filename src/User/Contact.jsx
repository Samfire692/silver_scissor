import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { supabase } from '../supabaseClient';
import { Locate, LocateIcon, Lollipop, Mail, Phone} from 'lucide-react';

export const Contact = () => {

    const [contactArray, setContactarray] = useState([]);

    const fetchData =async()=> {
     try{
      const {data:contactData , error:contactError} = await supabase
      .from("SS_contacts")
      .select("*")
      .maybeSingle();

      if(contactError) throw contactError;
      setContactarray(contactData);
     }catch(error){
       toast.error(error.message)
     }finally{

     }
    }

    useEffect(()=> {
        fetchData();
    }, [])

  return (
    <div className='p-3'>
        <div className='text-center'>
            <h2 className='text-5xl mb-1' style={{fontFamily:"fantasy"}}>Contact US</h2>
            <p>Need more information? Get in touch with us.</p>
        </div>

       <div className='grid gap-4 mt-6'>

  <a
    href={`tel:${contactArray?.phone_number}`}
    className='flex items-center gap-5 bg-white border border-slate-200 hover:border-black hover:shadow-lg transition-all duration-300 p-5 rounded-2xl'
  >
    <span className='bg-black text-white p-4 rounded-2xl'>
      <Phone size={24} />
    </span>

    <div>
      <p className='text-sm text-slate-500 uppercase font-semibold'>Phone</p>
      <p className='font-bold text-lg'>{contactArray?.phone_number}</p>
    </div>
  </a>

  <a
    href={`mailto:${contactArray?.email}`}
    className='flex items-center gap-5 bg-white border border-slate-200 hover:border-black hover:shadow-lg transition-all duration-300 p-5 rounded-2xl'
  >
    <span className='bg-black text-white p-4 rounded-2xl'>
      <Mail size={24} />
    </span>

    <div>
      <p className='text-sm text-slate-500 uppercase font-semibold'>Email</p>
      <p className='font-bold break-all'>{contactArray?.email}</p>
    </div>
  </a>

  <a
    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactArray?.address || "")}`}
    target="_blank"
    rel="noreferrer"
    className='flex items-center gap-5 bg-white border border-slate-200 hover:border-black hover:shadow-lg transition-all duration-300 p-5 rounded-2xl'
  >
    <span className='bg-black text-white p-4 rounded-2xl'>
      <LocateIcon size={24} />
    </span>

    <div>
      <p className='text-sm text-slate-500 uppercase font-semibold'>Address</p>
      <p className='font-bold'>{contactArray?.address}</p>
    </div>
  </a>

  <a
    href={`https://wa.me/${contactArray?.whatsapp_number?.replace(/\D/g, "")}`}
    target="_blank"
    rel="noreferrer"
    className='flex items-center gap-5 bg-green-500 hover:bg-green-600 text-white transition-all duration-300 p-5 rounded-2xl'
  >
    <span className='bg-white p-3 rounded-2xl'>
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 512 512">
        <path fill="#25D366" d="m143.8 431.2l7.7 4.5c32.2 19.1 69.2 29.2 106.8 29.2h.1c115.7 0 209.8-94.1 209.9-209.8c0-56.1-21.8-108.8-61.4-148.4c-39.3-39.5-92.7-61.7-148.4-61.5c-115.8 0-209.9 94.1-210 209.8c-.1 39.5 11.1 78.2 32.1 111.7l5 7.9L64.4 452z"/>
        <path fill="#fff" d="M192.7 146.9c-4.7-10.5-9.7-10.7-14.2-10.9l-12.1-.1c-4.2 0-11 1.6-16.8 7.9s-22.1 21.6-22.1 52.6s22.6 61 25.8 65.2s43.6 69.9 107.8 95.2c53.3 21 64.1 16.8 75.7 15.8c11.6-1.1 37.3-15.3 42.6-30s5.3-27.4 3.7-30s-5.8-4.2-12.1-7.4s-37.3-18.4-43.1-20.5s-10-3.2-14.2 3.2c-4.2 6.3-16.3 20.5-20 24.7s-7.4 4.7-13.7 1.6c-6.3-3.2-26.6-9.8-50.7-31.3c-18.8-16.7-31.4-37.4-35.1-43.7s-.4-9.7 2.8-12.9c2.8-2.8 6.3-7.4 9.5-11.1s4.2-6.3 6.3-10.5s1.1-7.9-.5-11.1c-1.8-3-14-34.2-19.6-46.7"/>
      </svg>
    </span>

    <div>
      <p className='text-sm uppercase font-semibold'>WhatsApp</p>
      <p className='font-bold text-lg'>{contactArray?.whatsapp_number}</p>
    </div>
  </a>

</div>
    </div>
  )
}
