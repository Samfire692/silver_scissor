import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa';
import { toast } from 'sonner';
import { supabase } from '../../supabaseClient';
import Swal from 'sweetalert2';

export const AdminReviews = () => {

  const [fullname, setFullname] = useState("");
  const [review, setReviews] = useState("");
  const [rate, setRate] = useState(0);
  const [submitLoading, setSubmitloading] = useState(false);
  const [reviewsArray, setReviewsarray] = useState([]);
  const [deleteLoading, setDeleteloading] = useState(null);
  const [loading, setLoading] = useState(true)

  const submit = async(e)=> {
    e.preventDefault();
    setSubmitloading(true)

    try{
     if(rate === 0){
      toast.warning("Rating can't be empty");
      return;
     }

     const {error} = await supabase
     .from("SS_reviews")
     .insert({
      fullname,
      reviews:review,
      rate
     })

     if(error) throw error;
     toast.success("Uploaded succesfully");
     fetchData();
    }catch(error){
      toast.error(error.message);
    }finally{
      setSubmitloading(false);
    }
    // alert(rate)
  }

  const deleteData = async(id)=> {
    setDeleteloading(id);

    try{
      const result = await Swal.fire({
        icon:"question",
        title:"Question",
        text:"Are you sure you want to delete a review?",
        showCancelButton:true,
        confirmButtonText:"Delete",
        confirmButtonColor:"red"
      });

      if(!result.isConfirmed) return;

      const {error} = await supabase
      .from("SS_reviews")
      .delete()
      .eq("id", id)

      if(error) throw error;
      toast.success("Deleted successfully");
      fetchData();
    }catch(error){
      toast.error(error.message);
    }finally{
      setDeleteloading(null);
    }
  }

  const fetchData = async()=>{
    try{
      const {data:reviewsData, error:reviewsError} = await supabase
      .from("SS_reviews")
      .select("*")

      if(reviewsError) throw reviewsError;
      setReviewsarray(reviewsData);
      setLoading(false);
    }catch(error){
       toast.error(error.message);
    }finally{

    }
  }

  useEffect(()=>{
    fetchData();
  }, [])

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
          <h2 className='font-bold text-2xl text-slate-600'>Add Reviews</h2>
          <div className='h-1.5 w-18 bg-slate-500 rounded-2xl mt-1'></div>
      </div>

      <div>
         <form action="" onSubmit={submit} className='grid gap-2'>
          <div className='grid'>
           <label htmlFor="">Full Name</label>
           <input type="text" className='border w-full h-10 p-2' onChange={(e)=> setFullname(e.target.value)} required/>
          </div>

          <div>
           <label htmlFor="">Reviews</label>
           <textarea name="" id="" className='border w-full h-20 p-2' onChange={(e)=> setReviews(e.target.value)} required></textarea>
          </div>

          <div className='flex mb-2'>
             {[1,2,3,4,5] .map((star)=> (
                <FaStar key={star} onClick={() => setRate(star)} className={`cursor-pointer transition text-2xl ${star <= rate ? "text-yellow-400" : "text-gray-300"}`}/>
             ))}
          </div>

          <div className=''>
            <button className='w-full bg-blue-500 text-white p-2'>{submitLoading ? 
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
            : "Submit"}</button>
          </div>
         </form>
      </div><br />

      <div className='overflow-x-scroll'>
         <table className='min-w-max md:w-full'>
          <thead className='bg-slate-200'>
            <tr>
              <th className='uppercase text-md text-slate-500 py-1.5'>S/N</th>
              <th className='uppercase text-md text-slate-500 py-1.5'>Fullname</th>
              <th className='uppercase text-md text-slate-500 py-1.5'>Reviews</th>
              <th className='uppercase text-md text-slate-500 py-1.5' >Rating</th>
              <th className='uppercase text-md text-slate-500 py-1.5'>Actions</th>
            </tr>
          </thead>

          <tbody className=''>
            {reviewsArray.map((rev, index)=> (
              <tr className='border border-slate-300'>
                <td className='text-center py-3 px-1'>{index + 1}</td>
                <td className='text-center py-3 px-1'>{rev.fullname}</td>
                <td className='text-start py-3 px-2 w-lg'>{rev.reviews}</td>
                <td className='text-center py-3 px-1'>
                  <div className='flex justify-center gap-2'>
                    {[1,2,3,4,5].map((star)=> (
                      <FaStar key={star} className={`text-sm ${star <= rev.rate ? "text-yellow-400" : "text-gray-300"}`}/>
                    ))}
                  </div>
                </td>
                <td className='text-center py-3 px-1'>
                  <button className='border p-1 text-red-500' onClick={()=> deleteData(rev.id)}>
                    {deleteLoading === rev.id ? 
                    <span>
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
                    :
                    <span>
                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
	                     <path d="M0 0h24v24H0z" fill="none" />
	                     <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
                       </svg>
                    </span> 
                   }
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
         </table>
      </div>
    </div>
  )
}
