import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa';
import { toast } from 'sonner';
import { supabase } from '../../supabaseClient';

export const AdminReviews = () => {

  const [fullname, setFullname] = useState("");
  const [review, setReviews] = useState("");
  const [rate, setRate] = useState(0);
  const [submitLoading, setSubmitloading] = useState(false);

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
    }catch(error){
      toast.error(error.message);
    }finally{
      setSubmitloading(false);
    }
    // alert(rate)
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
           <input type="text" className='border w-full h-10 p-2' onChange={(e)=> setFullname(e.target.value)}/>
          </div>

          <div>
           <label htmlFor="">Reviews</label>
           <textarea name="" id="" className='border w-full h-20 p-2' onChange={(e)=> setReviews(e.target.value)}></textarea>
          </div>

          <div className='flex mb-2'>
             {[1,2,3,4,5] .map((star)=> (
                <FaStar key={star} onClick={() => setRate(star)} className={`cursor-pointer transition text-2xl ${star <= rate ? "text-yellow-400" : "text-gray-300"}`}/>
             ))}
          </div>

          <div className=''>
            <button className='w-full bg-blue-500 text-white p-2'>{submitLoading ? "Submiting . . ." : "Submit"}</button>
          </div>
         </form>
      </div>
    </div>
  )
}
