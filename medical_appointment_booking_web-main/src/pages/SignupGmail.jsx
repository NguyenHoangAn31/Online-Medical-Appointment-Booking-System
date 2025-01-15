import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ecryptToken from '../ultils/encrypt';
import { UserContext } from '../components/Layouts/Client';

import { toast } from "react-hot-toast";
import getUserData from '../route/CheckRouters/token/Token';



const SignupGmail = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigateTo = useNavigate();

  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [keycode, setKeycode] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  //const navigateTo = useNavigate();
  const provider = 'gmail';
  const role = 1;
  const status = 1;

  const data = {
    fullName: fullname,
    phone: phone,
    email: email,
    provider: provider,
    roleId: role,
    status: status
  }


  const handleSignin = async () => {


    try {
      const result = await axios.post('https://medical-appointment-booking-api-production.up.railway.app/api/auth/login', {
        username: email,
        keycode: keycode,
        provider: 'gmail'
      });

      if (result) {

        if (result.data.accessToken != null) {
          localStorage.setItem('Token', ecryptToken.encryptToken(JSON.stringify(result.data)));
          if (result.data.user.roles[0] == 'USER') {
            setCurrentUser(result.data)
          }
          if (getUserData().user.roles[0] == 'USER') {
            navigateTo(`/`);
          }
          else if (getUserData().user.roles[0] == 'DOCTOR') {
            navigateTo(`/dashboard/doctor`);
          }
          else if (getUserData().user.roles[0] == 'ADMIN') {
            navigateTo(`/dashboard/admin`);
          }

        }
      }
      else {
        toast.error("OTP is invalid", {
          position: "top-right"
        });
      }
    } catch (error) {
      console.log(error)
      toast.error("OTP is invalid", {
        position: "top-right"
      });
    }




  }
  const hanldeSendOtp = async () => {
    try {
      const result = await axios.get(`https://medical-appointment-booking-api-production.up.railway.app/api/user/searchgmail/${email}`);
      if (result && result.data == true) {
        toast.error("Gmail đã đăng ký! Vui lòng nhập Gmail khác", {
          position: "top-right"
        });
      } else {
        const registerresult = await axios.post(`https://medical-appointment-booking-api-production.up.railway.app/api/user/registerbygmail`, data);
        if (registerresult.data) {
          toast.success("Send OTP successfully!", {
            position: "top-right"
          });
          setShowOTP(true);
        }

      }
    }
    catch {
      toast.error("Email not exist!", {
        position: "top-right"
      });
    }


  }



  return (
    <div className='container mt-5'>
      <div className="row">
        <div className="col-md-5">
          <div className="col-12">
            <div className="text-center justify-content-center px-5 mt-xxl-5">
              <h3 className='login__title'>Sign up</h3>
              <h5 className='login__title_sup mb-3'>Booking appointment</h5>
              <div id="recaptcha-container"></div>
              {showOTP ? (
                <>
                  <div className="mb-3">
                    <input type="text" className="input__username"
                      id="input__phone" placeholder="Enter your keycode"
                      value={keycode}
                      onChange={(e) => setKeycode(e.target.value)} />
                  </div>
                  <div className="mb-4">
                    <motion.div whileTap={{ scale: 0.8 }} onClick={handleSignin}>
                      <button type='submit' className='btn__submit'>Sign up</button>
                    </motion.div>
                  </div>
                </>
              ) : (
                <>

                  <div className="mb-3">
                    <input type="phone" className="input__username"
                      id="input__phone" placeholder="Enter your gmail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input type="phone" className="input__username"
                      id="input__phone" placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input type="text" className="input__username"
                      id="input__phone" placeholder="Enter your fullname"
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                    />
                  </div>


                  <div className="mb-4">
                    <motion.div whileTap={{ scale: 0.8 }} onClick={hanldeSendOtp}>
                      <button type='submit' className='btn__submit outline-none' >Send code via Gmail</button>
                    </motion.div>
                  </div>

                </>
              )}
              <div className='mt-xl-5'>
                <p>You already have an account? <Link to="/login" className='text-decoration-none ms-2'>Login</Link></p>
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

export default SignupGmail