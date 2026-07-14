import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { supabase } from '../supabaseClient';
import { toast } from 'sonner';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay, Navigation } from 'swiper/modules';
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

export const Gallery = () => {

  const [galleryArray, setGalleryarray] = useState([]);

    const galleryRef = useRef(null);
    const headingRef = useRef(null);
    const textRef = useRef(null);
    const cardRef = useRef(null);

  const fetchData = async()=>{
    try{
       const {data, error} = await supabase
       .from("SS_gallery")
       .select("*")
       .order("created_at", {ascending:true})

       if(error) throw error;
       setGalleryarray(data);
    }catch(error){
       console.log(error.messaage)
    }finally{

    }
  }

  useEffect(()=>{
    fetchData();
  }, [])

  useLayoutEffect(()=>{
     const ctx = gsap.context(()=> {
        const tl = gsap.timeline({
          scrollTrigger:{
            trigger:galleryRef.current,
            start:"top 85%",
            once:true
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
          duration:.6,
          ease:"power3.out"
        }, "-=0.4")
     }, [galleryArray])

     return ()=>ctx.revert();
  })

  return (
    <div className='py-4 bg-[#111] text-white overflow-hidden' ref={galleryRef}>
      <div className='mb-10 p-2'>
        <h2 className='text-center text-5xl' ref={headingRef} style={{fontFamily:"fantasy", letterSpacing:"2px"}}>Our Gallery</h2>
        <p className='text-center' ref={textRef}>Every cut tells a story. Explore our finest work, premium grooming, and unforgettable transformations.</p>
      </div>

      <div ref={cardRef} className='overflow-hidden'>
        <Swiper
         effect='coverflow'
         grabCursor={true}
         centeredSlides={true}
         slidesPerView="auto"
         spaceBetween={30}
         loop={true}
         speed={1000}

         coverflowEffect={{
          rotate:20,
          stretch:0,
          depth:120,
          modifier:1,
          slideShadows:true
         }}

         navigation={true}

         autoplay={{
          delay:4000,
          disableOnInteraction:false,
         }}

         pagination={{
          clickable:true
         }}

         modules={[
          EffectCoverflow, Pagination, Autoplay, Navigation
         ]}
        >
           {galleryArray.map((gal)=> (
             <SwiperSlide key={gal.id} className='!w-[320px]'>
                <div className='h-80 overflow-hidden shadow-2xl border border-white/10'>
                   <img src={gal.img_url} alt="" className='w-full h-90 object-cover overflow-hidden transition-all duration-500 hover:scale-110'/>
                </div>
             </SwiperSlide>
           ))}
        </Swiper>
      </div>
    </div>
  )
}
