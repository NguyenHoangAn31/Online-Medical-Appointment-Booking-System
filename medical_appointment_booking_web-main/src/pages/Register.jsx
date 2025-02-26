import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleNavigate = (path) => {
        setLoading(true);
        setTimeout(() => {
            navigate(path);
        }, 500); // Thêm hiệu ứng chuyển trang
    };

    return (
        <div className='container mt-5'>
            <div className="row align-items-center">
                {/* Cột bên trái */}
                <div className="col-md-5">
                    <div className="text-center px-5">
                        <h3 className='login__title'>Sign Up</h3>
                        <h5 className='login__title_sup'>Booking Appointment</h5>
                        <div id="recaptcha-container"></div>

                        <div className='mt-4'>
                            <motion.button 
                                whileTap={{ scale: 0.9 }}
                                whileHover={{ scale: 1.05 }}
                                className='btn__submit w-100'
                                onClick={() => handleNavigate('/signupphone')}
                                disabled={loading}
                            >
                                {loading ? 'Loading...' : 'Login by Phone Number'}
                            </motion.button>

                            <motion.button 
                                whileTap={{ scale: 0.9 }}
                                whileHover={{ scale: 1.05 }}
                                className='btn__submit w-100 mt-3'
                                onClick={() => handleNavigate('/signupgmail')}
                                disabled={loading}
                            >
                                {loading ? 'Loading...' : 'Login by Gmail Account'}
                            </motion.button>
                        </div>

                        <div className='mt-4'>
                            <p>Already have an account? <Link to="/login" className='text-decoration-none ms-2'>Login</Link></p>
                        </div>
                    </div>
                </div>

                {/* Cột bên phải */}
                <div className="col-md-6 offset-md-1 text-center">
                    <img src="/images/bg_signup.png" alt="Signup Background" className='img-fluid' />
                </div>
            </div>
        </div>
    );
};

export default Register;
