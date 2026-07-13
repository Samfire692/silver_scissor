import React, { useEffect, useLayoutEffect, useRef } from 'react'
import vid from "../assets/video/WhatsApp Video 2026-07-13 at 17.28.09.mp4"
import gsap from 'gsap'

export const Hero = () => {
 
  const headingRef = useRef(null);
  const textRef= useRef(null);
  const statsref= useRef(null);
  const buttonref=useRef(null);

  useLayoutEffect(()=> {
     const ctx = gsap.context(()=> {

      const tl = gsap.timeline();

      tl.from(headingRef.current, {
        opacity:0,
        y:100,
        duration:1
      })

      .from(textRef.current , {
        opacity:0,
        y:100,
        duration:.8,
      }, "-=0.5")

       .from(statsref.current.children , {
       opacity:0,
       y:60,
       stagger:.2,
     }, "-=0.5")

       .from(buttonref.current.children, {
      opacity:0,
       y:40,
       stagger:.2,
     }, "-=0.5")
     });

     return ()=> ctx.revert();
  }, [])

  return (
    <div>
      <div className='relative h-screen overflow-hidden'>
        <video src={vid} autoPlay loop muted playsInline preload='metadata' className='absolute inset-0 w-full h-full object-cover'></video>

        <div className='inset-0 bg-black/55 absolute text-white flex flex-col justify-center items-center z-10'>
          <div className='px-3'>
            <h2 className='lg:text-7xl text-6xl text-center' ref={headingRef} style={{fontFamily:"fantasy", letterSpacing:"2px" }}>Precision in Every Cut</h2>

            <p className='text-center mt-3 md:w-xl mx-auto' ref={textRef}>More than a haircut - it's confidence. Experience modern barbering, premium grooming, and a style tailored just for you.</p>

            <p className='mt-3 flex justify-center gap-3' ref={statsref}>
            <span className='text-center grid border-l border-r px-2 rounded-xl'><span className='text-3xl text-center'>5000+</span> <span className=''>Happy Clients</span></span>
            <span className='text-center grid border-l border-r px-2 rounded-xl'><span className='text-3xl'>10+</span> <span>Years Experience</span></span>
            <span className='text-center grid border-l border-r px-2 rounded-xl'><span className='text-3xl'>100%</span> <span>Clients Satisfaction</span></span>
            </p>
 
            <div className='flex justify-center gap-3 mt-4' ref={buttonref}>
              <button className='border border-slate-400 w-45 p-2 backdrop-blur-2xl bg-slate-400/20 hover:bg-slate-500'>Book Appointment</button>
              <button className='border border-green-500 w-30 p-2 backdrop-blur-2xl bg-green-400/20 hover:bg-green-500'>Learn more</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
