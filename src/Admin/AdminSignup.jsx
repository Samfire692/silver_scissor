import React, { useState } from 'react'
import { toast } from 'sonner';
import { supabase } from '../supabaseClient';

export const AdminSignup = () => {

  const [email , setEmail] = useState("");
  const [submitLoading, setSubmitloading] = useState("Verify");

  const submit = async(e)=> {
    e.preventDefault();
    setSubmitloading("Verifying ...")

    function generatePassword(length = 10){
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";

      const array = new Uint32Array(length);
      crypto.getRandomValues(array);

      return Array.from(array, x => chars[x % chars.length]).join("");
    }

    const password = generatePassword();
    try{ 
     const {data:authData , error:authError} = await supabase.auth.signUp({
      email:email,
      password:password,
     });

     console.log( "Data", authData);
     console.log("Error", authError);
     console.log(authError?.message);
     console.log(authError?.status);
     console.log(authError?.name)

      if (authError) {
       toast.error(authError.message);
       return;
     }

     const {data:dbData, error:dbError} = await supabase
     .from("SS_adminsignup")
     .insert({
       id:authData.user.id,
       email
     })

     if(dbError) throw dbError;
     setSubmitloading("Verify");

    //  console.log(authData.user.email_confirmed_at)
    alert(password);
    }catch(error){
      toast.error(error.message)
    }finally{
       setSubmitloading("Verify");
    }
  }

  return (
    <div>
       <div className='mb-3'>
            <h2 className='font-bold text-2xl text-slate-600'>Admin Signup</h2>
            <div className='h-1.5 w-25 bg-slate-500 rounded-2xl mt-1'></div>
       </div>

       <div className='h-[60vh] flex justify-center place-items-center'>
         <form action="" className='md:w-md w-full shadow-sm shadow-slate-500 p-3 rounded-xl' onSubmit={submit}>
           <h4 className='text-center text-2xl font-bold mb-3 text-slate-500'>Add admin</h4>
           <input type="email" className='border h-11 p-3 w-full' placeholder='Input email' required onChange={(e)=> setEmail(e.target.value)}/>
           <button className='bg-slate-500 w-full p-1.5 text-white mt-2'>{submitLoading}</button>
         </form>
       </div>
    </div>
  )
}
