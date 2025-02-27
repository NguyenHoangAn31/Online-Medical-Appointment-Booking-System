import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const handleLoginError = () => {
    setErrorMessage('Login feature is under development. Please try again later.');
  };

  return (
    <div className='container mt-5'>
      <div className="row align-items-center">
        {/* Hình ảnh login */}
        <div className="col-lg-6 d-none d-lg-block">
          <img src="/images/image-login.png" alt="Login" className='img-fluid' />
        </div>

        {/* Nội dung login */}
        <div className="col-lg-6 col-12">
          <div className="text-center px-4 px-md-5">
            <h3 className='login__title'>Login</h3>
            <h5 className='login__title_sup'>Booking appointment</h5>

            {/* Hiển thị thông báo lỗi nếu có */}
            {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}

            {/* Nút đăng nhập */}
            <div className='d-flex flex-column gap-3 py-4 border-top border-dark border-2 mt-3'>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link to="/login-by-phone" className='btn btn-dark w-100'>
                  Login by Phone Number
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link to="/login-by-gmail" className='btn btn-danger w-100' onClick={handleLoginError}>
                  Sign in with Gmail Account
                </Link>
              </motion.div>
            </div>

            {/* Điều hướng đến trang đăng ký */}
            <div className='mt-4'>
              <p>Do you have an account yet? 
                <Link to="/register" className='text-decoration-none ms-2'>Register</Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
