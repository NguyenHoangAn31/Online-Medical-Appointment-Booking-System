import React from 'react'

import { FaFacebookF, FaTwitter , FaInstagram, FaTiktok } from "react-icons/fa"

const Footer = () => {
  return (
    <div className='footer'>
      <div className='container'>
        <div className="row">
          <div className='col-md-12'>
            <div className="row">
              <div className='col-md-3'>
                <div className='d-flex-column'>
                  <a href="" className='logo text-decoration-none'>Medi<span className='logo-span'>care</span></a>
                  <div className='mt-5'>
                    <p>Have your health questions answered by seeking expert form our world-renowned specialist.</p>
                  </div>
                  <div className='d-flex justify-content-between align-items-center mt-5'>
                    <div className='text-black-50'>Terms & Conditions</div>
                    <div className='text-black-50'>Privacy Policy</div>
                  </div>

                </div>
              </div>
              <div className='col-md-1'></div>
              <div className='col-md-2'>
                <div className="col-md-12">
                  <div className='d-grid'>
                    <div>For Partient</div>
                    <ul className='mt-5 footer__partient ps-0'>
                      <li><a href="#"></a>Search for Doctor</li>
                      <li><a href="#"></a>Seearch for Service</li>
                      <li><a href="#"></a>Search for Clinics</li>
                      <li><a href="#"></a>Download App</li>
                    </ul>
                  </div>
                </div>

              </div>
              <div className='col-md-1'><div className="col-md-12">
                  <div className='d-grid'>
                    <div>For Doctor</div>
                    <ul className='mt-5 footer__partient ps-0'>
                      <li><a href="#"></a>Profile Doctor</li>
                    </ul>
                  </div>
                </div></div>
              <div className='col-md-1'>
                <div className="col-md-12">
                    <div className='d-grid'>
                      <div>About</div>
                      <ul className='mt-5 footer__partient ps-0'>
                        <li><a href="#"></a>Out Story</li>
                        <li><a href="#"></a>Benefits</li>
                        <li><a href="#"></a>Service</li>
                        <li><a href="#"></a>Careers</li>
                      </ul>
                    </div>
                  </div>
              </div>
              <div className='col-md-1'>
              <div className="col-md-12">
                    <div className='d-grid'>
                      <div>Help</div>
                      <ul className='mt-5 footer__partient ps-0'>
                        <li><a href="#"></a>FAQs</li>
                        <li><a href="#"></a>Contact us</li>
                      </ul>
                    </div>
                  </div>
              </div>
              <div className='col-md-1'></div>
              <div className='col-md-2'>
              <div className="col-md-12">
                    <div className='menu__icons'>
                      <a href="#" className='footer__button'>Get Started</a>
                      <div className='footer__icons'>
                        <a href="#"><FaFacebookF /></a>
                        <a href="#"><FaTwitter /></a>
                        <a href="#"><FaInstagram /></a>
                        <a href="#"><FaTiktok /></a>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
          <div className='col-md-12 border-top py-3 text-center mt-3'>
            <div className="row">
              <div className="col-md-12">
                <p> Copyright 2024, All Right Reserved by Aptech</p>
              </div>
            </div>
          </div>


        </div>
      </div>

    </div>
  )
}

export default Footer