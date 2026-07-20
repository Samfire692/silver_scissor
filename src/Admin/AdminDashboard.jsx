import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient';
import { toast } from 'sonner';
import { Usermode } from './Dashboard/Usermode';
import { Salonmode } from './Dashboard/Salonmode';

export const AdminDashboard = () => {

    const [adminProfile , setAdminprofile] = useState([]);
    const [admin, setAdmin] = useState(null);
    const [activeState, setActivestate] = useState("user");
   //  const [mode, setMode] = useState(null);
   //  const [selectedMode, setSelectedmode] = useState(null);
    
   //  const modes =()=>{
   //    localStorage.setItem("Mode", mode);
   //  }

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
         //  const Modes = localStorage.getItem("Mode");
         //  setSelectedmode(Modes);
        //   console.log("user", adminData);
       }catch(error){
          console.log(error.message)
       }finally{

       }
    }

    useEffect(()=> {
      //   modes();
        fetchData();
    }, [])

  return (
    <div className=''>
       <div className='flex flex-row justify-between'>
         <h2 className='text-3xl my-auto font-bold'>Dashboard</h2>

         <div className='bg-slate-500 w-fit p-2 flex gap-2 rounded-xl'>
            <button className={`border-r p-1 font-bold hover:bg-slate-300 hover:text-black ${activeState === "user" ? "bg-slate-300 text-black" : "text-slate-200"}`} onClick={()=> setActivestate("user")}>
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
	            <path d="M0 0h24v24H0z" fill="none" />
	            <path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4" />
               </svg>
            </button>

            <button className={`border-l p-1 font-bold hover:bg-slate-300 hover:text-black ${activeState === "salon" ? "bg-slate-300 text-black" : "text-slate-200"}`} onClick={()=> setActivestate("salon")}>
               <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
	               <path d="M0 0h24v24H0z" fill="none" />
	               <path fill="currentColor" fill-rule="evenodd" d="M5.207 5.486A1 1 0 0 1 6.065 5h11.867a1 1 0 0 1 .858.486l2.254 3.757a.5.5 0 0 1-.429.757H19.5v8.5a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-5.3a.2.2 0 0 0-.2-.2H7.2a.2.2 0 0 0-.2.2v5.3a1 1 0 0 1-1 1h-.5a1 1 0 0 1-1-1V10H3.382a.5.5 0 0 1-.43-.757zm7.293 7.68c0-.23.187-.416.417-.416h4.166c.23 0 .417.187.417.417v2.916c0 .23-.186.417-.417.417h-4.166a.417.417 0 0 1-.417-.417z" clip-rule="evenodd" />
                  </svg>
               </span>
            </button>
         </div>
       </div>

       <div>
          {activeState === "user" ? 
           <Usermode/>
           :
           <Salonmode/> 
         }
       </div>
    </div>
  )
}
