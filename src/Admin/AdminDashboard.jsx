import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient';
import { toast } from 'sonner';

export const AdminDashboard = () => {

    const [adminProfile , setAdminprofile] = useState([]);
    const [admin, setAdmin] = useState(null)

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
        //   console.log("user", adminData);

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
       <span> {admin?.firstname} </span>
       <span>{admin?.email}</span>
    </div>
  )
}
