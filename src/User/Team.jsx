import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { supabase } from "../supabaseClient"
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";

gsap.registerPlugin(ScrollTrigger);

export const Team = () => {

  const [teamArray, setTeamarray] = useState([]);
  const [loading, setLoading] = useState(true);

  const teamRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const cardRef = useRef(null);

  const fetchData = async()=>{
    try{
      const {data, error} = await supabase
      .from("SS_adminsignup")
      .select("*")

      if(error) throw error;
      setTeamarray(data);
    }catch(error){
       console.log(error.message);
    }finally{

    }
  }

  useEffect(()=> {
    fetchData();
  }, []);

  useLayoutEffect(()=>{
     const ctx = gsap.context(()=> {
        const tl = gsap.timeline({
          scrollTrigger:{
            trigger:teamRef.current,
            start:"top 70%",
            toggleActions:"play none none none"
          }
        });

        tl.from(headingRef.current, {
          opacity:0,
          y:60,
          duration:1
        })

        .from(textRef.current, {
           opacity:0,
           y:60,
          duration:.6
        }, "-=0.4")

        .from(cardRef.current, {
          opacity:0,
          y:60,
          duration:.6
        }, "-=0.4")
     })

     return ()=>ctx.revert();
  })
  return (
    <div className='p-3' ref={teamRef}>
      <div className='text-center mb-4'>
        <h2 className='text-5xl' style={{fontFamily:"fantasy", letterSpacing:"2px"}} ref={headingRef}>Our Teams</h2>
        <p className='text-slate-500 mt-3' ref={textRef}>Meet the professionals behind every perfect cut.</p>
      </div>

     <Swiper 
     ref={cardRef}
      modules={[Navigation, Autoplay]}
      navigation={{
        nextEl:".team-next",
        prevEl:".team-prev"
      }}

      autoplay={{
        delay:4000
      }}

      spaceBetween={25}
      breakpoints={{
        0:{
          slidesPerView:1
        },

        768:{
          slidesPerView:2
        },

        1024:{
          slidesPerView:3
        }
      }}
     >
        {teamArray.map((team)=> (
          <SwiperSlide key={team.id} className=''>
             <div className='shadow-sm shadow-slate-500 w-full overflow-hidden rounded-2xl place-items-end cursor-pointer group'>
               <img src={team.img_url} alt="" className='w-full h-70 object-cover group-hover:scale-110 transition-all duration-500' />
               <div className='absolute w-full text-white inset-0 bg-black/35 flex flex-col gap-2 justify-end p-2 rounded-2xl'>
                 <p className='text-2xl' style={{fontFamily:"fantasy", letterSpacing:"1px"}}>{team.fullname}</p>
                 <span className='uppercase text-xs'>{team.position}</span>
                 <span>{team.description}</span>
               </div>
             </div>
          </SwiperSlide>
        ))}
     </Swiper>

      <div className='flex gap-3 justify-end mt-1'>
        <button className='team-prev shadow shadow-slate-500 w-10 h-10 p-1'>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
	        <path d="M0 0h24v24H0z" fill="none" />
	        <path fill="currentColor" d="m14 18l-6-6l6-6l1.4 1.4l-4.6 4.6l4.6 4.6z" />
          </svg>
        </button>

        <button className='team-next shadow shadow-slate-500 w-10 h-10 p-1.5'>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
	        <path d="M0 0h24v24H0z" fill="none" />
	        <path fill="currentColor" d="M12.6 12L8 7.4L9.4 6l6 6l-6 6L8 16.6z" />
          </svg>
        </button>
     </div>

    </div>
  )
}
