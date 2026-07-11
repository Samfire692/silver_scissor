import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { supabase } from '../../supabaseClient'

export const Profilepic = () => {

  const [imgPrev, setImgprev] = useState(null);
  const [selectedFile , setSelectedfile] = useState(null);
  const [saveLoading , setSaveloading] = useState(false);
  const [adminProfile , setAdminprofile] = useState(null);
  const [profilePic , setProfilepic] = useState(null);
  const [loading, setLoading] = useState(true);

   const fetchData = async()=> {
    try{
      const adminprofile = JSON.parse(localStorage.getItem("AdminProfile"));
      
      const {data:dbData , error:dbError} = await supabase
      .from("SS_adminsignup")
      .select("*")
      .eq("id", adminprofile?.id)
      .maybeSingle()

      if(dbError) throw dbError;
      setAdminprofile(dbData);
      setLoading(false)
    }catch(error){
       toast.error(error.message);
       console.log(error.message);
    }finally{
       setLoading(false)
    }
  }

  const handleImage = (e)=> {
    const file = e.target.files[0];

    if (!file) return;
    const preview = URL.createObjectURL(file);
    setImgprev(preview);
    setSelectedfile(file);
  }

  const submitData = async()=> {
    setSaveloading(true);
    // console.log("admin", adminprofile?.id)

    try{
      const file = selectedFile;

      const allowedTypes = ["png", "jpeg", "jpg", "webp"];
      const extension = file.name.split(".").pop().toLowerCase();

      if(!allowedTypes.includes(extension)){
        toast.warning("Only JPG, PNG, JPEG and WEBP are allowed");
        return;
      }

      if(file.size > 5 * 1024 * 1024){
        toast.warning("Image must be less than 5mb");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
       formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

      const response = await fetch(
       `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
       {
        method: "POST",
        body: formData
       }
      );

      const data = await response.json();

      if(!response.ok){
        throw new Error(data.error?.message || "upload failed");
      }

      const {data:adminData , error:adminError} = await supabase
      .from("SS_adminsignup")
      .update({
        img_url:data.secure_url,
        public_id:data.public_id
      })
      .eq("id", adminProfile?.id);

      if(adminError) throw adminError;
      toast.success("Saved successfully!");
      setSaveloading(false);
    }catch(error){
       toast.error(error.message);
    }finally{
      setSaveloading(false)
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
         <span className='animate-pulse'>Fetching Profile Picture . . .</span>
      </div>
    )
  }

  return (
    <div>
      <div className='absolute top-1.5 right-2'>
         <button className={`h-fit font-bold bg-blue-600/90 text-white w-15 p-0.5 ${imgPrev === null ? "hidden" : ""}`} onClick={submitData}>{saveLoading ? 
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
      </div><br />

      <div>
        <h2 className='text-3xl font-bold text-center'>Upload your profile photo</h2>
        <span className='mt-2 block text-center'>Choose a clear, professional photo customers can easily recognize.</span>
      </div>

       <div className='flex h-[60vh] justify-center place-items-center'>
          <div className='flex'>
              <div className='w-55 h-55 rounded-full flex justify-center place-items-center border-4 border-dashed border-slate-300 hover:border-slate-500'>
                <input type="file" name="" id="" accept='image/*' className='h-55 w-55 opacity-0 z-10' onChange={handleImage}/>
              <button className='absolute text-slate-400 h-fit' type='button'>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
	              <path d="M0 0h24v24H0z" fill="none" />
	              <path fill="currentColor" d="M11.5 8C14 8 16 10 16 12.5S14 17 11.5 17S7 15 7 12.5S9 8 11.5 8m0 1A3.5 3.5 0 0 0 8 12.5a3.5 3.5 0 0 0 3.5 3.5a3.5 3.5 0 0 0 3.5-3.5A3.5 3.5 0 0 0 11.5 9M5 5h2l2-2h5l2 2h2a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3m4.41-1l-2 2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2.41l-2-2z" />
                </svg>
              </button>
              </div>

                    <div className='h-55 z-20 absolute flex '>
                       <img src={imgPrev ? imgPrev : adminProfile?.img_url} alt="" className='w-55 h-55 rounded-full z-20 object-cover'/>
                        {imgPrev && (
                       <div className=''>
                          <button className='h-fit w-fit' type='button' onClick={()=> {setImgprev(null) ; setSelectedfile(null)}}>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
	                              <path d="M0 0h24v24H0z" fill="none" />
	                              <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m5 19l7-7m0 0l7-7m-7 7L5 5m7 7l7 7" />
                                </svg>
                            </span>
                          </button>
                       </div>
                       )}
                    </div>
          </div>
       </div>
    </div>
  )
}
