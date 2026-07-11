import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import Swal from 'sweetalert2';
import { supabase } from '../../supabaseClient';

export const AdminGallery = () => {

  const [imgPrev, setImgprev] = useState(null);
  const [selectedImg , setSelectedimg] = useState(null);
  const [submitLoading, setSubmitloading] = useState(false);
  const [galleryArray, setGalleryarray] = useState([]);

  const handleImage = (e)=> {
    const file = e.target.files[0];

    const preview = URL.createObjectURL(file);
    setImgprev(preview);
    setSelectedimg(file);
  }

  const submit = async()=> {
    setSubmitloading(true);

     try{
       const result = await Swal.fire({
        icon:"question",
        title:"Image Upload",
        text:"Are you sure?",
        confirmButtonText:"Upload",
        showCancelButton:true,
        confirmButtonColor:"royalblue"
       })

       if(!result.isConfirmed) return;
       const file = selectedImg;

       const allowedTypes = ["jpeg", "png", "webg", "jpg"];
       const extension = file.name.split(".").pop().toLowerCase();

       if(!allowedTypes.includes(extension)){
        toast.warning("Only JPEG, PNG, JPG and WEBG are allowed");
        return;
       }

       if(file.size > 5 * 1024 * 1024){
        toast.warning("Image must be less than 5mb");
        return;
       }

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

      const {error}= await supabase
      .from("SS_gallery")
      .insert({
        img_url: data.secure_url,
        public_id: data.public_id
      })
       
      if(error) throw error;
      toast.success("Uploaded successfully");
      fetchData();
      setSubmitloading(false);
      setImgprev(null);
      setSelectedimg(null);
     }catch(error){
      toast.error(error.message)
     }finally{
      setSubmitloading(false);
     }
  }

  const fetchData = async()=> {
      try{
       const {data:galleryData , error:galleryError} = await supabase
       .from("SS_gallery")
       .select("*")

       if(galleryError) throw galleryError;
       setGalleryarray(galleryData);
      }catch(error){
       toast.error(error.message);
      }finally{

      }
  }

  useEffect(()=> {
    fetchData();
  }, [])

  return (
    <div>
        <div className='mb-3'>
            <h2 className='font-bold text-2xl text-slate-600'>Add Gallery</h2>
            <div className='h-1.5 w-25 bg-slate-500 rounded-2xl mt-1'></div>
        </div>

        <div className="mt-3">
        <div className="relative border w-xs h-60 rounded-2xl mx-auto overflow-hidden">

       {!imgPrev && (
        <>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="font-bold text-slate-400">
            Add Pictures
          </p>
        </div>

        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleImage}
        />
      </>
    )}

    {imgPrev && (
      <img
        src={imgPrev}
        alt=""
        className="w-full h-full object-cover"
      />
    )}
  </div>

  {imgPrev && (
    <div className="flex justify-center gap-3 mt-3">
      <button
        className="bg-blue-500 p-2 w-24 text-white rounded"
        onClick={submit}
      >
        {submitLoading ? 
        <span className='flex justify-center'> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"> <path d="M0 0h24v24H0z" fill="none" /> <g> <circle cx="12" cy="2.5" r="1.5" fill="currentColor" opacity=".14" /> <circle cx="16.75" cy="3.77" r="1.5" fill="currentColor" opacity=".29" /> <circle cx="20.23" cy="7.25" r="1.5" fill="currentColor" opacity=".43" /> <circle cx="21.5" cy="12" r="1.5" fill="currentColor" opacity=".57" /> <circle cx="20.23" cy="16.75" r="1.5" fill="currentColor" opacity=".71" /> <circle cx="16.75" cy="20.23" r="1.5" fill="currentColor" opacity=".86" /> <circle cx="12" cy="21.5" r="1.5" fill="currentColor" /> <animateTransform attributeName="transform" calcMode="discrete" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12" /> </g> </svg> </span>
        : "Upload"}
      </button>

      <button
        className="bg-red-500 p-2 w-24 text-white rounded"
        onClick={() => {
          setImgprev(null);
          setSelectedimg(null);
        }}
      >
        Clear
      </button>
    </div>
  )}
</div><br />

        <div>
            <div className='mb-3'>
              <h2 className='font-bold text-2xl text-slate-600'>Gallery</h2>
              <div className='h-1.5 w-15 bg-slate-500 rounded-2xl mt-1'></div>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
              {galleryArray.map((gal)=> (
                <div key={gal.id} className='border-2 rounded-2xl overflow-hidden border-dashed'>
                  <img src={gal.img_url} alt="" className='object-cover'/>
                </div>
              ))}
            </div>
        </div>

    </div>
  )
}
