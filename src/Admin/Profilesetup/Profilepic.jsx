import React, { useState } from 'react'

export const Profilepic = () => {

  const [imgPrev, setImgprev] = useState(null);
  const [selectedFile , setSelectedfile] = useState(null);

  const handleImage = (e)=> {
    const file = e.target.files[0];

    if (!file) return;
    const preview = URL.createObjectURL(file);
    setImgprev(preview);
    setSelectedfile(file);
  }

  return (
    <div>
      <div className='absolute top-1.5 right-2'>
         <button className={`h-fit p-1 font-bold bg-blue-600/90 text-white w-18 ${imgPrev === null ? "hidden" : ""}`}> Save</button>
      </div><br />

      <div>
        <h2 className='text-3xl font-bold text-center'>Upload your profile photo</h2>
        <span className='mt-2 block text-center'>Choose a clear, professional photo customers can easily recognize.</span>
      </div>

       <div className='flex h-[60vh] justify-center place-items-center'>
          <form action="" className='flex'>
              <div className='w-55 h-55 rounded-full flex justify-center place-items-center border-4 border-dashed border-slate-300 hover:border-slate-500'>
                <input type="file" name="" id="" accept='image/*' className='h-55 w-55 opacity-0 z-10' onChange={handleImage}/>
              <button className='absolute text-slate-400 h-fit' type='button'>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
	              <path d="M0 0h24v24H0z" fill="none" />
	              <path fill="currentColor" d="M11.5 8C14 8 16 10 16 12.5S14 17 11.5 17S7 15 7 12.5S9 8 11.5 8m0 1A3.5 3.5 0 0 0 8 12.5a3.5 3.5 0 0 0 3.5 3.5a3.5 3.5 0 0 0 3.5-3.5A3.5 3.5 0 0 0 11.5 9M5 5h2l2-2h5l2 2h2a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3m4.41-1l-2 2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2.41l-2-2z" />
                </svg>
              </button>
              </div>

              {imgPrev && (
                    <div className='h-55 z-20 absolute flex '>
                       <img src={imgPrev} alt="" className='w-55 h-55 rounded-full z-20 object-cover'/>
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
                    </div>
              )}
          </form>
       </div>
    </div>
  )
}
