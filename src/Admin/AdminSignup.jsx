import React, { useState } from 'react'
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa6';
import { supabase } from "../supabaseClient"
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const AdminSignup = () => {
     
    const [firstName , setFirstname] = useState("");
    const [surname , setSurname] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [confirmPassword , setConfirmpassword] = useState("");
    const [passwordType , setPasswordtype] = useState(false);
    const [confirmPasswordtype , setConfirmpasswordType] = useState(false);
    const [submitLoading , setSubmitloading] = useState(false);

    const navigate = useNavigate();

    const submitForm =async(e)=> {
        e.preventDefault();
        setSubmitloading(true);

        try{
          if(password === confirmPassword){
             const {data:authData, error:authError} = await supabase.auth.signUp({
              email:email,
              password:password,
              options:{
                emailRedirectTo:"/adminlogin"
              }
             })

             if(authError) throw authError;

             const {error:dbError}= await supabase
             .from("SS_adminsignup")
             .insert({
                id:authData.user.id,
                firstname:firstName,
                surname:surname,
                email:email
             })

             if(dbError) throw dbError;
             toast.success("Check your email for verification!")
             setSubmitloading(false);
             navigate("/adminlogin")
          }else{
            toast.warning("Passwords do not match try again!")
          }
        }catch(error){
            toast.error(error.message);
        }finally{ 
           setSubmitloading(false)
        }
    }

  return (
    <div className='h-screen flex justify-center place-items-center px-2 background w-full'>
        <form action="" className='rounded-xl w-sm md:w-md p-2 relative' onSubmit={submitForm} style={{backdropFilter:"blur(10px)", boxShadow:"1px 4px 15px white"}}>
            <h1 className='text-center text-2xl font-bold'>Admin SignUp</h1>

            <div className='flex gap-2'>
                 <div className='flex mt-3 grow'>
                   <label htmlFor="" className={`absolute m-2 px-1 transition-all bg-white h-fit ${firstName.length > 0 ? "-translate-y-4 text-xs text-slate-400 font-bold" : ""}`}>Surname Name</label>
                   <input type="text" className='border h-10 p-3 w-full' onChange={(e)=> setFirstname(e.target.value)} required/>
                 </div>

                 <div className='flex mt-3 grow'>
                   <label htmlFor="" className={`absolute m-2 px-1 transition-all bg-white h-fit ${surname.length > 0 ? "-translate-y-4 text-xs text-slate-400 font-bold" : ""}`}>First Name</label>
                   <input type="text" className='border h-10 p-3 w-full' onChange={(e)=> setSurname(e.target.value)} required/>
                 </div>
            </div>

            <div className='flex mt-3 grow'>
              <label htmlFor="" className={`absolute m-2 px-1 transition-all bg-white h-fit ${email.length > 0 ? "-translate-y-4 text-xs text-slate-400 font-bold" : ""}`}>Email</label>
              <input type="email" className='border h-10 p-3 w-full' onChange={(e)=> setEmail(e.target.value)} required/>
            </div>
            
            <div className='flex mt-3 justify-end grow'>
              <div className='w-full flex'>
                 <label htmlFor="" className={`absolute m-2 px-1 transition-all bg-white h-fit ${password.length > 0 ? "-translate-y-4 text-xs text-slate-400 font-bold" : ""}`}>Password</label>
                 <input type={passwordType ? "text" : "password"} className='border h-10 p-3 w-full' onChange={(e)=> setPassword(e.target.value)} required/>
              </div>
              <div className='absolute my-auto mt-3 text-xl pe-2'>
                <span className='cursor-pointer' onClick={()=> setPasswordtype(!passwordType)}>{passwordType ? <FaEye/> : <FaEyeSlash/>}</span>
              </div>
            </div>

            <div className='flex mt-3 justify-end grow'>
              <div className='w-full flex'>
                 <label htmlFor="" className={`absolute m-2 px-1 transition-all bg-white h-fit ${confirmPassword.length > 0 ? "-translate-y-4 text-xs text-slate-400 font-bold" : ""}`}>Confirm Password</label>
                 <input type={confirmPasswordtype ?"text" : "password"} className='border h-10 p-3 w-full' onChange={(e)=> setConfirmpassword(e.target.value)} required/>
              </div>
              <div className='absolute my-auto mt-3 text-xl pe-2'>
                <span className='cursor-pointer' onClick={()=> setConfirmpasswordType(!confirmPasswordtype)}>{confirmPasswordtype ? <FaEye/> : <FaEyeSlash/>}</span>
              </div>
            </div>

            <div className='relative'>
                <button className='w-full bg-blue-500 text-white p-2 mt-2' disabled={!firstName || !surname || !email || !password || !confirmPassword}>{submitLoading ? "Loading . . ." : "Create Account"}</button>
            </div>

            <button type='button' className='w-full mt-2' onClick={()=> navigate("/adminlogin")}>Login</button>

        </form>
    </div>
  )
}
