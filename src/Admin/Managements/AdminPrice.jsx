import React, { useEffect, useState } from 'react'
import { supabase } from '../../supabaseClient';
import { toast } from 'sonner';
import { Clock } from 'lucide-react';
import Swal from 'sweetalert2';

export const AdminPrice = () => {

    const [name, setName] = useState("");
    const [duration, setDuration] = useState("");
    const [price, setPrice] = useState("");
    const [submitLoading, setSubmitloading] = useState(false);
    const [priceArray, setPricearray] = useState([]);
    const [deleteLoading, setDeleteloading] = useState(null);
    const [editLoading, setEditloading] = useState(null);

    const submitData = async(e)=> {
      e.preventDefault();
      setSubmitloading(true);

      try{
        const {error} = await supabase
        .from("SS_price")
        .insert({
            service_name:name,
            duration,
            price
        })

        if(error) throw error;
        toast.success("Uploaded successfully");
        fetchData();
        setName("");
        setDuration("");
        setPrice("");
      }catch(error){
        toast.error(error.message);
      }finally{
        setSubmitloading(false);
      }
    }

    const editData = async(id)=> {
        
    }

    const deleteItem = async(id)=> {
      setDeleteloading(id);

      try{
        const result = await Swal.fire({
            icon:"question",
            title:"Question", 
            text:"Are you Sure you want to delete this?",
            showCancelButton:true,
            confirmButtonText:"Delete",
            confirmButtonColor:"red"
        })

        if(!result.isConfirmed) return;

        const {error} = await supabase
        .from("SS_price")
        .delete()
        .eq("id", id)

        if(error) throw error;
        toast.success("Updated successfully");
        fetchData();
      }catch(error){
        toast.error(error.message);
      }finally{
        setDeleteloading(null);
      }
    }

    const fetchData = async()=> {
        try{
           const {data, error} = await supabase
           .from("SS_price")
           .select("*")

           if(error) throw error;
           setPricearray(data);
        }catch(error){
           toast.error(error.message)
        }finally{

        }
    }

    useEffect(()=> {
        fetchData();
    }, [])

  return (
    <div>
        <div className='mb-3'>
              <h2 className='font-bold text-2xl text-slate-600'>Add Price</h2>
              <div className='h-1.5 w-18 bg-slate-500 rounded-2xl mt-1'></div>
         </div>

         <div>
            <form action="" onSubmit={submitData}>
                <div className='grid lg:grid-cols-2 gap-2'>
                     <div className='grid w-full'>
                       <label htmlFor="">Service Name</label>
                       <input type="text" className='border h-11 p-2' placeholder='Add Services' onChange={(e)=> setName(e.target.value)} value={name}/>
                     </div>

                     <div className='w-full flex gap-2'>
                        <div className='my-auto grid w-full'>
                         <label htmlFor="">Duration</label>
                         <select name="" id="" className='border p-1 h-11 rounded-lg' onChange={(e)=> setDuration(e.target.value)} value={duration}>
                            <option value="">---Choose duration---</option>
                            <option value="15">15 mins</option>
                            <option value="20">20 mins</option>
                            <option value="30">30 mins</option>
                            <option value="45">45 mins</option>
                            <option value="60">60 mins</option>
                            <option value="90">90 mins</option>
                         </select>
                        </div>

                        <div className='my-auto grid'>
                         <label htmlFor="">Price(£)</label>
                         <input type="text" className='mx-auto w-10 border h-11 text-center' onChange={(e)=> setPrice(e.target.value)} value={price}/>
                        </div>
                     </div>
                </div>
                
                <div className='mt-2 flex lg:justify-center'>
                    <button className='bg-blue-500 lg:w-45 w-full p-2 text-white' disabled={!name || !duration ||!price}>{submitLoading ? "Submit . . ." : "Upload"}</button>
                </div>
            </form>
         </div><br />


        <div className='lg:p-2'>
            <div className='mb-3'>
              <h2 className='font-bold text-2xl text-slate-600'>View Price</h2>
              <div className='h-1.5 w-18 bg-slate-500 rounded-2xl mt-1'></div>
            </div>

            <table className='w-full overflow-scroll'>
                <thead>
                    <tr className='border-b border-slate-200 bg-slate-200'>
                        <th className='uppercase text-slate-500/70 p-1'>S/N</th>
                        <th className='uppercase text-slate-500/70 p-1'>Service Name</th>
                        <th className='uppercase text-slate-500/70 p-1'>Duration (Mins)</th>
                        <th className='uppercase text-slate-500/70 p-1'>Price</th>
                        <th className='uppercase text-slate-500/70 p-1'>Action</th>
                    </tr>
                </thead>

                <tbody>
                     {priceArray.map((price, index)=> (
                        <tr className='border border-slate-200'>
                            <td className='text-center p-2'>{index + 1}</td>
                            <td className='text-center p-2'>{price.service_name}</td>
                            <td className='text-center p-2 my-4'>{price.duration || "0"}</td>
                            <td className='text-center p-2'>£{price.price}</td>
                            <td className=''>
                                <div className='my-4 flex gap-2 justify-center'>
                                   {}

                                <button className='border p-1 text-red-500' onClick={()=> deleteItem(price.id)}>
                                   {deleteLoading === price.id ?
                                      <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
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
                                </div>
                            </td>
                        </tr>
                     ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}
