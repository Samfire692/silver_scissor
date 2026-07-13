import React, { useLayoutEffect, useRef } from 'react'
import { Scissors, Sparkles, Gem } from 'lucide-react'
import { GiBeard } from 'react-icons/gi'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

export const Services = () => {

  const serviceRef= useRef(null);
  const headingRef= useRef(null);
  const cardsRef= useRef(null);

  useLayoutEffect(()=>{
    const ctx = gsap.context(()=> {
       const tl = gsap.timeline({
        scrollTrigger: {
          trigger:serviceRef.current,
          start:"top 75%",
          toggleActions:"play none none none"
        }
       });

       tl.from(headingRef.current, {
          opacity:0,
          y:60,
          duration:1
        })

        .from(cardsRef.current.children, {
          opacity:0,
          y:60,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out"
        }, "-=0.4")
    })

    return()=>ctx.revert();
  }, [])
  return (
    <div ref={serviceRef} className='services px-2 pb-3 lg:h-[52vh] text-amber-400 flex flex-col'><br />
      <div ref={headingRef}>
         <h2 className='text-center text-5xl mb-10' style={{fontFamily:"fantasy", letterSpacing:"2px"}}>Our Services</h2>
      </div>

      <div className='grid md:grid-cols-4 grid-cols-2 gap-3' ref={cardsRef}>
         <div className='grid text-center backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-2 lg:p-6 '>
           <span className='mx-auto'><Scissors size={50} className='bg-black/50  p-2 rounded-full'/></span>
           <span className='mt-2' style={{fontFamily:"fantasy", letterSpacing:"2px"}}>Precision Cuts</span>
           <span>Sharp, stylish cuts tailored to your look.</span>
         </div>

         <div className='grid text-center backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-3 lg:p-6 '>
           <span className='mx-auto'><GiBeard size={50} className='bg-black/50  p-2 rounded-full'/></span>
           <span className='mt-2' style={{fontFamily:"fantasy", letterSpacing:"2px"}}>Beard Grooming</span>
           <span>Clean trims and perfect beard shaping.</span>
         </div>

         <div className='grid text-center backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-3 lg:p-6 '>
           <span className='mx-auto'><Sparkles size={50} className='bg-black/50  p-2 rounded-full'/></span>
           <span className='mt-2' style={{fontFamily:"fantasy", letterSpacing:"2px"}}>Hair Styling</span>
           <span>Premium styling for every occasion.</span>
         </div>

         <div className='grid text-center backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-3 lg:p-6 '>
           <span className='mx-auto'><Gem size={50} className='bg-black/50  p-2 rounded-full'/></span>
           <span className='mt-2' style={{fontFamily:"fantasy", letterSpacing:"2px"}}>Premium Experience</span>
           <span>Relax in comfort while we handle the details.</span>
         </div>
      </div>
    </div>
  )
}
