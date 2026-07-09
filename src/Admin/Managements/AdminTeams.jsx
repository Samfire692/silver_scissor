import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { supabase } from '../../supabaseClient';
import { data } from 'react-router-dom';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

export const AdminTeams = () => {

  const [imagePrev , setImageprev] = useState(null);
  const [selectedFile , setSelectedfile] = useState(null);
  const [submitloading , setSubmitloading] = useState(false);
  const [fullname , setFullname] = useState("");
  const [description , setDescription] = useState("");
  const [teamsArray , setTeamsarray] = useState([]);
  const [position , setPosition] = useState("");
  const [loading, setLoading] = useState(true);
  const [menu , setMenu] = useState(false);
  const [deleteLoading, setDeleteloading] = useState(false);

  const handleImage = (e)=> {
    const file = e.target.files[0];

    if(!file) return;
    const preview = URL.createObjectURL(file);
    setImageprev(preview);
    setSelectedfile(file)
  }

  const submit = async(e)=> {
    e.preventDefault();
  
    setSubmitloading(true);

    try{
      const file = selectedFile;

      const allowedTypes = ["jpeg" ,"webp", "png" , "jpg"];
      const extension = file.name.split(".").pop().toLowerCase();

      if(!allowedTypes.includes(extension)){
        alert("Only JPG, PNG and WEBP images are allowed");
       
      }else if(file.size > 5 * 1024 * 1024){
        alert("Image must be less than 5mb");
        
      }else{
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
        // console.log("form data" , [...formData.entries()]);
      // fetch();
      // formData.append("file", selectedFile);

      const response = await fetch(
       `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
       {
        method: "POST",
        body: formData
       }
      );

      const data = await response.json();
      // console.log("data", data);

      if(!response.ok){
        throw new Error(data.error?.message || "upload failed");
      }

      const {error} = await supabase
      .from("SS_team")
      .insert({
         fullname,
         description,
         position,
         img_url:data.secure_url,
         public_id:data.public_id
      })
     if (error) throw error;
     toast.success("uploaded successfully");
     fetchData();
     setImageprev("");
     setFullname("");
     setDescription("");
     setPosition("");
      }
    }catch(error){
      console.log(error.message);
    }finally{
      setSubmitloading(false)
    }
  }

  const fetchData = async ()=> {
    try{
      const {data:teamData, error:teamError} = await supabase
      .from("SS_team")
      .select("*")

      if(teamError) throw teamError;
      setTeamsarray(teamData);
      setLoading(false);
    }catch(error){
      toast.error(error.message);
    }finally{

    }
  }

  useEffect(()=> {
    fetchData();
  }, [])

  const deleteTeam = async(e, team)=> {
    e.stopPropagation();
    setDeleteloading(team.id);
    try{
      const result = await Swal.fire({
        icon:"question",
        title:"Delete",
        text:"Are you sure you want to this ?",
        showCancelButton:true,
        confirmButtonText:"Yes, Delete",
        confirmButtonColor:"red",
        cancelButtonText:"Cancel"
      })

      if(!result.isConfirmed) return;

      const {error: functionError} = await supabase.functions.invoke(
        "delete-cloudinary-image",
        {
          body: {
            public_id: team.public_id,
          }
        }
      );

      if(functionError) throw functionError;
      
      const {error} = await supabase
      .from("SS_team")
      .delete()
      .eq("id", team.id);

      if(error) throw error;
      toast.success("Deleted successfully");
      setDeleteloading(null);
      fetchData();
    }catch(error){
      toast.error(error.message);
    }finally{
      setDeleteloading(null);
    }
  }

  const editTeam = async()=> {
    try{
     
    }catch(error){
      
    }finally{

    }
  }

  return (
    <div className=''>
      <div>
         <h4 className='text-xl font-bold'>Add Teams</h4>
      </div><hr className='w-25 text-amber-300'/>

      <div className='flex flex-col justify-around'>
         <div className='lg:w-2xl w-full mx-auto'>
         <form action="" className='p-3' onSubmit={submit}>
            <div className='flex flex-col lg:flex-row gap-2'>
             <div className='border border-amber-400/50 md:w-sm w-3xs h-51 rounded-2xl flex flex-col justify-center place-items-center mx-auto overflow-hidden cursor-pointer my-auto'>
             {imagePrev && (
                   <img src={imagePrev} alt="" className='z-20 w-60 h-45 object-cover'/>
              )}

                 <input type="file" className='cursor-pointer w-50' accept='image/*' onChange={handleImage} required />
             
            </div>

            <div className='grid gap-2 my-auto w-full'>
             <input type="text" className='border h-11 p-2 border-amber-400/50 focus:shadow focus:shadow-border-amber-400 outline-0' placeholder="Enter Team's name" required onChange={(e)=> setFullname(e.target.value)} value={fullname}/>
             <input type="text" className='border h-11 p-2 border-amber-400/50 focus:shadow focus:shadow-border-amber-400 outline-0' placeholder='Enter Team position' required onChange={(e)=> setPosition(e.target.value)} value={position}/>
             <textarea name="" id="" className='border h-30 p-2 border-amber-400/50 focus:shadow focus:shadow-border-amber-400 outline-0' placeholder="Description about Team's" required onChange={(e)=> setDescription(e.target.value)} value={description}></textarea>
            </div>
           </div>

           <div className='flex justify-center'>
             <button className='bg-amber-400 w-full p-2 mt-2 font-bold text-white'>{submitloading ? "loading . . ." : "Upload"}</button>
           </div>
         </form>
      </div>

        <div className='shadow-sm shadow-slate-500 w-full p-3 rounded-2xl mx-auto'>
         <h2 className='font-bold text-2xl text-center'>View Teams Members</h2>

          {!loading && teamsArray.length === 0 && (
            <div className='h-55 place-items-center flex justify-center'>
              <p className='text-slate-400'>No team members added yet. </p>
            </div>
         )}

         {loading && (
          <div className='h-55 place-items-center justify-center flex'>
              <p className='animate-pulse text-slate-500 font-bold'>
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
              </p>
          </div>
         )}
         
         {!loading && teamsArray.length > 0 && (
           <div className='flex flex-col gap-1 h-60 overflow-y-auto'>
            {teamsArray.map((team)=> (
              <div key={team.id} className='border-b pb-1 cursor-pointer hover:bg-slate-200/50 p-1 rounded-xl h-fit' onClick={()=> setMenu(menu === team.id ? "" : team.id)}>
                <div className='flex gap-2'>
                  <img src={team.img_url} alt="" className='w-15 h-15 object-cover rounded-full my-auto' onError={()=> console.log(team.img_url)}/>
                 <div className='my-auto'>
                    <div className=''>
                      <p className='font-bold capitalize text-amber-400 text-md'>{team.fullname}</p>
                      <p className='font-bold w-50 text-sm truncate'>{team.position}</p>
                    </div>
                      <p className='w-50 md:w-2xl truncate'>{team.description}</p>
                 </div>
                </div>

                 {menu === team.id && (
                   <div className='mt-2 flex justify-evenly'>
                   <button className='flex gap-1 font-bold text-blue-500 hover:text-blue-300'>
                    <span className='my-auto'><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32">
	                  <path d="M0 0h32v32H0z" fill="none" />
	                  <path fill="currentColor" d="M2 26h28v2H2zM25.4 9c.8-.8.8-2 0-2.8l-3.6-3.6c-.8-.8-2-.8-2.8 0l-15 15V24h6.4zm-5-5L24 7.6l-3 3L17.4 7zM6 22v-3.6l10-10l3.6 3.6l-10 10z" />
                    </svg>
                    </span>
                    <span>Edit</span>
                   </button>

                   <button className='flex gap-1 font-bold text-red-500 hover:text-red-400' onClick={(e)=> deleteTeam(e, team)}>
                     <span className='my-auto'>
                       <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
	                     <path d="M0 0h24v24H0z" fill="none" />
	                     <path fill="currentColor" d="M18 19a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4V4h4.5l1-1h4l1 1H19v3h-1zM6 7v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7zm12-1V5h-4l-1-1h-3L9 5H5v1zM8 9h1v10H8zm6 0h1v10h-1z" />
                       </svg>
                     </span>
                     <span>
                       {deleteLoading === team.id ? "Deleting . . ." : "Delete"}
                     </span>
                   </button>
                 </div>
                 )}

              </div>
            ))}
          </div>
         )}
        </div>

      </div>
    </div>
  )
}
