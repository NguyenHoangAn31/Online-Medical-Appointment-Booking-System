
import React, { useState, useEffect } from 'react';
// import firebase from '../services/auth/firebase';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Login = () => {
  
  return (
    <div className='container mt-5'>
      <div className="row">
        <div className="col-md-6">
            <div className="col-12">
                <img src="/images/image-login.png" alt="" className='img-fluid' />
            </div>
        </div>
        <div className="col-md-6">
            <div className="col-12">
              <div className="text-center justify-content-center px-5 mt-xxl-5">
                  <h3 className='login__title'>Login</h3>
                  <h5 className='login__title_sup'>Booking appointment</h5>
                  
                  <div className='d-flex justify-content-around py-5 border-top border-dark border-2 mt-3 gap-2'>
                    <motion.div whileTap={{scale: 0.8}}>
                      <Link to="/login-by-phone" className='btn__login'>Login by Phone Number</Link>
                    </motion.div>
                    <motion.div whileTap={{scale: 0.8}}>
                      <Link to="/login-by-gmail" className='btn__login'>Sign in with gmail account</Link>
                    </motion.div>                  
                  </div>
                  <div className='mt-xl-5'>
                      <p>Do you have an account yet? <Link to="/register" className='text-decoration-none ms-2'>Register</Link></p>
                  </div>

              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Login