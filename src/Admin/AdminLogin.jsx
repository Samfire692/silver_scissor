import React, { useState } from 'react'
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa6';
import { supabase } from '../supabaseClient';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const AdminLogin = () => {

    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [passwordType , setPasswordtype] = useState("");
    const [submitLoading, setSubmitloading] = useState(false);
    const [profileCompleted, setProfilecompleted] = useState([]);
    const navigate = useNavigate();

    const login = async(e)=> {
        e.preventDefault();
        setSubmitloading(true);

        try{
          const {data:authData , error:authError} = await supabase.auth.signInWithPassword({
            email:email,
            password:password
          })

          if(authError) throw authError;
          setSubmitloading(false)
          toast.success("Login successfull!");
          
          const adminProfile = {
            id:authData.user.id
          }
          
          localStorage.setItem("AdminProfile", JSON.stringify(adminProfile));
          // console.log(adminProfile)

          const {data:dbData , error:dbError} = await supabase
          .from("SS_adminsignup")
          .select("*")
          .eq("id", adminProfile?.id)
          .limit(1)
          .maybeSingle();
          
           if(dbError) throw dbError;
           setProfilecompleted(dbData)
          //  console.log(dbData);
          //  console.log("Error", dbError)

          if(dbData?.profile_completed === "false"){
            navigate("/profilesetup")
          }else{
            navigate("/admindashboard"); 
          }
        }catch(error){
            toast.error(error.message);
        }finally{
            setSubmitloading(false);
        }
    }

  return (
    <div className='flex justify-center h-screen place-items-center background text-white p-2'>
        <form action="" className='w-sm md:w-md p-2 rounded-2xl' onSubmit={login} style={{backdropFilter:"blur(20px)", boxShadow:"1px 4px 15px white"}}>
            <h1 className='text-2xl font-bold text-center'>Admin Login</h1><br />

            <div className='flex mb-4 grow'>
              <input type="email" className='border h-12 p-3 w-full' onChange={(e)=> setEmail(e.target.value)} required placeholder='Email'/>
            </div>

             <div className='flex justify-end grow'>
                <div className='w-full flex'>
                   <input type={passwordType ? "text" : "password"} className='border h-12 p-3 w-full' onChange={(e)=> setPassword(e.target.value)} required placeholder='Password'/>
                </div>
                <div className='absolute my-auto mt-3.5 text-xl pe-2'>
                     <span className='cursor-pointer' onClick={()=> setPasswordtype(!passwordType)}>{passwordType ? <FaEye/> : <FaEyeSlash/>}</span>
                </div>
             </div>

             <div className='flex justify-center'>
                <button className='w-30 mt-3 bg-blue-500 text-white p-1.5'>{submitLoading 
                ? 
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
                : "Login"}</button>
             </div>
        </form>
    </div>
  )
}
