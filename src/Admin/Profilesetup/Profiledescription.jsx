import React, { useEffect, useState } from 'react'
import { supabase } from '../../supabaseClient';
import { toast } from 'sonner';

export const Profiledescription = () => {

  const [positionArray , setPositionarray] = useState([]);
  const [position, setPosition]= useState("");
  const [description , setDescription] = useState("");
  const [submitLoading, setSubmitloading] = useState(false);
  const [adminProfile , setAdminprofile] = useState(null);
  const [loading, setLoading] = useState(true);

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
        setPosition(dbData?.position || "");
        setDescription(dbData?.description || "");

        const {data:positionData , error:positionError} = await supabase
        .from("SS_position")
        .select("*")
        .order("order", {ascending:true});
        
        if(positionError) throw positionError;
        setPositionarray(positionData);
        setLoading(false);
      }catch(error){
         toast.error(error.message);
      }finally{
        setLoading(false);
      }
  }

  const submit = async(e)=> {
    e.preventDefault();
    setSubmitloading(true);
    try{
      const {error}= await supabase
      .from("SS_adminsignup")
      .update({
        position,
        description
      })
      .eq("id", adminProfile?.id)

      if(error) throw error;
      setSubmitloading(false);
      toast.success("Saved successfully")
    }catch(error){
      toast.error(error.message);
    }finally{
       setSubmitloading(false);
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
          <h2 className='text-3xl font-bold text-center'>Professional Details</h2>
          <span className='mt-2 block text-center'>Tell customers and your team more about your role and professional background.</span>
        </div><br />

        <div className='mt-3'>
          <form action="" className='grid gap-3 md:w-md w-full mx-auto p-2' onSubmit={submit}>
            <div className='grid'>
              <label htmlFor="" className='font-bold text-md '>Position</label>
              <select className='border rounded-sm h-10 p-1' value={position} onChange={(e)=> setPosition(e.target.value)}>
                <option value="">-- Choose your position --</option>
                {positionArray.map((pos)=> (
                  <option key={pos.id} value={pos.position_name}>{pos.position_name}</option>
                ))}
              </select>
            </div>

            <div className='grid'>
               <label htmlFor="" className='font-bold text-md '>About You</label>
               <textarea name="" id="" className='border h-30 p-2' placeholder='Write about yourself' onChange={(e)=> setDescription(e.target.value)} value={description}></textarea>
            </div>

            <div>
              <button className={`h-fit absolute bg-blue-500 w-15 p-0.5 text-white top-2 right-2 ${!position || !description ? "hidden" : ""}`}>{submitLoading ?
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
