import React from 'react'
import { MdArrowOutward } from "react-icons/md"

const HomeAbout = () => {
  return (
    <section className='container'>
      <div className="row">
        <div className="col-md-3"><div className='main__title'>About us</div></div>
        <div className="col-md-6 px-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo modi eum tenetur minima asperiores in,
          nisi molestias, perspiciatis ad quam maiores dicta, porro sed accusantium hic fugit consequuntur non ab?</div>
        <div className="col-md-3 d-flex justify-content-end">
          <div className='btn__read__more'>Read more <MdArrowOutward /></div>
        </div>
      </div>
    </section>
  )
}

export default HomeAbout