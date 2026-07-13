import React, { useRef, useLayoutEffect } from 'react'
import { Navbar } from './Navbar'
import { Hero } from './Hero'
import { About } from './About'

export const Home = () => {
  return (
    <div>
      <section id='navbar'>
        <div>
           <Navbar/>
        </div>
      </section>

      <section id='hero'>
         <div>
           <Hero/>
         </div>
      </section><br />

      <section id='about'>
        <div className='overflow-hidden'>
          <About/>
        </div>
      </section>

      hello
    </div>
  )
}
