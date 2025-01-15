import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {

    return (
        <div className='container mt-5'>
            <div className="row">
                <div className="col-md-5">
                    <div className="col-12">
                        <div className="text-center justify-content-center px-5 mt-xxl-5">
                            <h3 className='login__title'>Sign up</h3>
                            <h5 className='login__title_sup'>Booking appointment</h5>
                            <div id="recaptcha-container"></div>

                            <div className='mt-3'>


                                <div className="mb-4">
                                    <motion.div whileTap={{ scale: 0.8 }}>
                                        <Link to="/signupphone" type='button' className='btn__submit text-decoration-none'>Login by Phone Number</Link>

                                        {/* <button type='submit' to="/login" className='btn__submit' >Send code via SMS</button> */}
                                    </motion.div>
                                </div>
                                <div className="mb-4">
                                    <motion.div whileTap={{ scale: 0.8 }}>
                                        <Link to="/signupgmail" type='button' className='btn__submit text-decoration-none'>Login by Gmail Account</Link>

                                        {/* <button type='submit' to="/login" className='btn__submit' >Send code via Gmail</button> */}
                                    </motion.div>
                                </div>

                            </div>

                            <div className='mt-xl-5'>
                                <p>You already have an account ?<Link to="/login" className='text-decoration-none ms-2'>Login</Link></p>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-6">
                    <div className="col-12">
                        <img src="/images/bg_signup.png" alt="" className='img-fluid' />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Register