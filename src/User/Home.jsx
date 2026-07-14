import React, { useRef, useLayoutEffect } from 'react'
import { Navbar } from './Navbar'
import { Hero } from './Hero'
import { About } from './About'
import { Services } from './Services'
import { Team } from './Team'
import { Gallery } from './Gallery'

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
        <div className=''>
          <About/>
        </div>
      </section><br />

      <section>
        <div>
          <Services/>
        </div>
      </section><br />

      <section>
        <div>
          <Team/>
        </div>
      </section><br />

      <section>
        <div>
          <Gallery/>
        </div>
      </section><br />
    </div>
  )
}
