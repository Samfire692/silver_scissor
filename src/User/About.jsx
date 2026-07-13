import React, { useLayoutEffect, useRef } from 'react'
import img from '../assets/about img.jpg';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger)

export const About = () => {

  const aboutref = useRef(null);
  const textref = useRef(null);
  const imgref = useRef(null);

  useLayoutEffect(()=> {
    const ctx = gsap.context (()=> {
        const tl = gsap.timeline({
          scrollTrigger:{
            trigger:aboutref.current,
            start:"top 75%",
            toggleActions:"play none none none"
          }
        });

        tl.from(imgref.current, {
          opacity:0,
          x:-100,
          duration:1
        })

        .from(textref.current.children, {
          opacity:0,
          y:60, 
          stagger:.2
        }, "-=0.4")

    })

    return ()=>ctx.revert();
    })
  
  return (
    <>
      <div ref={aboutref} className='flex lg:flex-row flex-col-reverse justify-around p-3 mt-3'>
      <div className='group overflow-hidden rounded-2xl' ref={imgref}>
         <img src={img} alt="" className='w-sm h-100 mx-auto object-cover rounded-xl mt-3 group-hover:scale-110 group transition-all duration-500'/>
      </div>

      <div className='lg:w-xl'>
        <div ref={textref}>
          <h2 className='uppercase text-3xl font-bold text-center' style={{fontFamily:"fantasy", letterSpacing:"2px"}}>About Silver Scissors</h2>
          <p className='text-xl mb-1 font-bold mt-2'>More Than Just a Haircut</p>
          <p>
           <span className='block'>
              At Silver Scissors, we believe grooming is more than looking good—it's about feeling confident every single day. Our experienced barbers combine precision, creativity, and attention to detail to deliver styles that suit your personality and lifestyle. 
           </span> <br />

            <span className='block'>
              From modern fades and classic cuts to beard grooming and complete transformations, every service is carried out with professionalism and care. We use quality tools, premium products, and the latest barbering techniques to ensure every visit leaves you looking sharp and feeling your best.
            </span><br />

            <span>
               Whether it's your first visit or you're one of our regular clients, our commitment remains the same: exceptional service, a welcoming atmosphere, and results you'll be proud of.
            </span><br />
          </p>
        </div>
      </div>
    </div>

    <div>
      
    </div>
    </>
  )
}
