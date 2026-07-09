import React, { useEffect, useState } from 'react'
import { supabase } from '../../supabaseClient';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

export const AdminPositions = () => {

    const [uploadSubmit , setUploadsubmit] = useState(false);
    const [positionName , setPositionname] = useState("");
    const [positionOrder , setPositionorder] = useState("");
    const [positionArray, setPositionarray] = useState([]);
    const [menu, setMenu] = useState(null);
    const [deleteLoading , setDeleteloading] = useState(null);
    const [loading , setLoading] = useState(true);

    const submitPosition = async(e)=> {
        e.preventDefault();
        setUploadsubmit(true);

        try{
          const {error} = await supabase
          .from("SS_position")
          .insert({
            position_name:positionName,
            order:positionOrder
          })

          if(error) throw error;
          toast.success("Uploaded successfully");
          fetchData();
          setUploadsubmit(false);
          setPositionname("");
          setPositionorder("");
        }catch(error){
          toast.error(error.message);
        }finally{
           setUploadsubmit(false);
        }
    }

    const editData = async(e, id , name)=> {
      e.stopPropagation();
      
      try{
        const result = await Swal.fire({
        title: "Edit Position",
        input: "text",
        inputValue: name,
        inputPlaceholder: "Enter position name",
        showCancelButton: true,
        confirmButtonText: "Update",
       });

       if(!result.isConfirmed) return;

       const {error} = await supabase
       .from("SS_position")
       .update({
        position_name: result.value
       })
       .eq("id", id);
       if(error) throw error;
       toast.success("Updated successfully");
       fetchData();
      }catch(error){
         toast.error(error.message)
      }finally{

      }
    }

    const deleteData = async(e, id)=> {
        e.stopPropagation();
        setDeleteloading(id);
        // alert(id);

        try{
          const result = await Swal.fire({
            icon:'question',
            title:"Question",
            text:"Are you sure ?",
            showCancelButton:true,
            confirmButtonText:"Delete",
            confirmButtonColor:"red"
          })

          if(!result.isConfirmed) return;

          const {error:deleteError} = await supabase
          .from("SS_position")
          .delete()
          .eq("id", id);

          if(deleteError) throw deleteError;
          toast.success("Deleted successfully !")
          fetchData();
          setDeleteloading(null);
        }catch(error){
          toast.error(error.message)
        }finally{
          setDeleteloading(null);
        }
    }

    const fetchData = async()=> {
        try{
          const {data:positionData , error:positionError} = await supabase
          .from("SS_position")
          .select("*")
          .order("order", {ascending:true})

          if(positionError) throw positionError;
          setPositionarray(positionData);
          setLoading(false);
        }catch(error){
          toast.error(error.message);
        }finally{
          setLoading(false)
        }
    }

    useEffect(()=> {
        fetchData()
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
            <h2 className='font-bold text-2xl text-slate-600'>Add Team Position</h2>
            <div className='h-1.5 w-28 bg-slate-500 rounded-2xl mt-1'></div>
        </div>

        <div className=''>
            <form action="" className='flex flex-col gap-2' onSubmit={submitPosition}>
                <div className='flex gap-2 w-full'>
                    <input type="text" className='border w-full h-11 p-3' placeholder='Team position' onChange={(e)=> setPositionname(e.target.value)} value={positionName} required/>
                    <input type="number" className='border w-10 h-11 text-center' onChange={(e)=> setPositionorder(e.target.value)} value={positionOrder} required/>
                </div>
                <button className='bg-slate-600 text-white w-full p-2 font-bold'>{uploadSubmit ? 
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
                : "Upload"}</button>
            </form>
        </div><br />

        <div className=''>
            <div className='mb-3'>
              <h2 className='font-bold text-2xl text-slate-600'>Team Position</h2>
              <div className='h-1.5 w-28 bg-slate-500 rounded-2xl mt-1'></div>
            </div>

            <div className='grid gap-2'>
                {positionArray.map((pos)=> (
                <div key={pos.id} className='flex justify-between shadow-sm shadow-slate-500 p-2 rounded-lg cursor-pointer' onClick={()=> setMenu(menu === pos.id ? "" : pos.id)}>
                    <div className='flex gap-1 font-medium my-auto'>
                        <p className=''>{pos.position_name}</p>
                        <p>({pos.order})</p>
                    </div>
                    
                     <div className={`flex justify-around border-l border-slate-400 h-fit p-1 rounded-sm overflow-hidden transition-all duration-500 ${menu === pos.id ? "w-23" : "w-0"}`}>
                          <button className='h-fit text-blue-500' onClick={(e)=> editData(e, pos.id, pos.position_name, pos.order)}>
                           <span>
                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
	                         <path d="M0 0h24v24H0z" fill="none" />
	                         <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
		                     <path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" />
		                     <path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3" />
	                         </g>
                             </svg>
                             </span>
                       </button>

                       <button className='h-fit text-red-500' onClick={(e)=> deleteData(e, pos.id)}>
                          {deleteLoading === pos.id
                          ? 
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
	                        <path d="M0 0h24v24H0z" fill="none" />
	                        <path fill="currentColor" d="M18 19a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4V4h4.5l1-1h4l1 1H19v3h-1zM6 7v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7zm12-1V5h-4l-1-1h-3L9 5H5v1zM8 9h1v10H8zm6 0h1v10h-1z" />
                            </svg>
                          </span>
                        }
                       </button>
                    </div>
                </div>
               ))}

               {!loading && positionArray.length === 0 && (
                        <div className='h-[30vh] flex justify-center place-items-center'>
                            <p>No positions added yet</p>
                        </div>
                )}
            </div>
        </div>
    </div>
  )
}
