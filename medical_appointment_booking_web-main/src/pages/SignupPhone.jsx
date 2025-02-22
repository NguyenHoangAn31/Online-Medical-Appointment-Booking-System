import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-hot-toast";

const SignupPhone = () => {
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [keycode, setKeycode] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const navigate = useNavigate();

  const data = {
    fullName: fullname,
    phone: phone,
    email: email,
    keyCode: keycode,
    provider: 'phone',
    roleId: 1,
    status: 1,
  };

  const handleSignup = async () => {
    try {
      const result = await axios.post(
        `https://medical-appointment-booking-api-production.up.railway.app/api/user/register`,
        data
      );
      if (result) {
        toast.success("Register successfully!", { position: "top-right" });
        navigate('/home');
        window.location.reload();
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.", { position: "top-right" });
    }
  };

  const handleSendOtp = async () => {
    if (!phone || phone.length < 10) {
      toast.error("Please enter a valid phone number.", { position: "bottom-right" });
      return;
    }
    
    try {
      const result = await axios.get(
        `https://medical-appointment-booking-api-production.up.railway.app/api/user/search/${phone}`
      );
      if (result.data) {
        toast.error("Phone number already registered. Please log in.", { position: "bottom-right" });
        return;
      }
      
      toast.success("You can register with this phone number.", { position: "top-right" });
      setShowOTP(true);
    } catch (error) {
      toast.error("Error verifying phone number.", { position: "top-right" });
    }
  };

  return (
    <div className='container mt-5'>
      <div className="row">
        <div className="col-md-5">
          <div className="text-center px-5 mt-xxl-5">
            <h3 className='login__title'>Sign up</h3>
            <h5 className='login__title_sup mb-3'>Booking appointment</h5>
            {showOTP ? (
              <>
                <input type="text" className="input__username" placeholder="Enter OTP"
                  value={keycode} onChange={(e) => setKeycode(e.target.value)} />
                <motion.div whileTap={{ scale: 0.8 }} onClick={handleSignup}>
                  <button className='btn__submit'>Sign up</button>
                </motion.div>
              </>
            ) : (
              <>
                <input type="text" className="input__username" placeholder="Enter your phone number"
                  value={phone} onChange={(e) => setPhone(e.target.value)} />
                <input type="text" className="input__username" placeholder="Enter your fullname"
                  value={fullname} onChange={(e) => setFullname(e.target.value)} />
                <input type="email" className="input__username" placeholder="Enter your email"
                  value={email} onChange={(e) => setEmail(e.target.value)} />
                <motion.div whileTap={{ scale: 0.8 }} onClick={handleSendOtp}>
                  <button className='btn__submit'>Send code via SMS</button>
                </motion.div>
              </>
            )}
            <p>You already have an account? <Link to="/login">Login</Link></p>
          </div>
        </div>
        <div className="col-md-6">
          <img src="/images/bg_signup.png" alt="" className='img-fluid' />
        </div>
      </div>
    </div>
  );
};

export default SignupPhone;
