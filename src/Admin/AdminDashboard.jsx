import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient';
import { toast } from 'sonner';
import { Greetings } from './Dashboard/Greetings';
import { Store } from 'lucide-react';

export const AdminDashboard = () => {

    const [adminProfile , setAdminprofile] = useState([]);
    const [admin, setAdmin] = useState(null);
    const [activeState, setActivestate] = useState("user");

    const fetchData = async()=> {
       try{
          const AdminInfo = JSON.parse(localStorage.getItem("AdminProfile"));

          setAdminprofile(AdminInfo);

          const {data:adminData , error:adminError} = await supabase
          .from("SS_adminsignup")
          .select("*")
          .eq("id", AdminInfo.id)
          .maybeSingle();

          if(adminError) throw adminError;
          setAdmin(adminData);
       }catch(error){
          console.log(error.message)
       }finally{

       }
    }

    useEffect(()=> {
        fetchData();
    }, [])

  return (
    <div className=''>
       <div className='flex flex-row justify-between'>
         <h2 className='text-3xl my-auto font-bold'>Dashboard</h2>
       </div>

{/* greeting */}
      <div className='h-screen absolute top-0 w-full left-0 bg-slate-100 flex flex-col justify-center items-center'>
          <div className='bg-white shadow-2xl rounded-3xl p-10 max-w-lg w-full border border-slate-200'>
             <h2 className='text-4xl text-center font-black text-slate-900'>Good morning, {admin?.username}! 👋</h2>  
             <p className='text-center mt-2.5 text-xl font-medium text-slate-500'>Will you be working in the salon today?</p>
           <div className='mt-2.5 grid gap-3'>
             <button className='rounded-xl bg-green-500 text-white py-3 font-semibold hover:bg-green-600 transition'>Yes, I'm at the salon</button>
             <button className='rounded-xl bg-slate-400 text-white py-3 font-semibold hover:bg-slate-200 transition'>No, I'm working remotely</button>
          </div>
          </div>

          <p className="text-center text-xs text-slate-400 mt-6">
            Your selection only affects today's dashboard experience.
          </p>

      </div>

    </div>
  )
}
