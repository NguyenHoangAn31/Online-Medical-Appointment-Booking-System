import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
//import ecryptToken from '../ultils/encrypt';
// import { auth } from "../services/auth/firebase.config";
// import { auth } from "../services/";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast } from "react-hot-toast";

const SignupPhone = () => {
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [keycode, setKeycode] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  //const navigateTo = useNavigate();
  const provider = 'phone';
  const role = 1;
  const status = 1;

  const data = {
    fullName: fullname,
    phone: phone,
    email: email,
    keyCode: keycode,
    provider: provider,
    roleId: role,
    status: status
  }
  // hàm check cachar
  // function onCaptchVerify() {
  //   if (!window.recaptchaVerifier) {
  //     window.recaptchaVerifier = new RecaptchaVerifier(auth,
  //       "recaptcha-container",
  //       {
  //         size: "invisible",
  //         callback: () => {
  //           console.log('recaptcha resolved..')
  //         }
  //       }
  //     );
  //   }
  // }

  const handleSignup = async () => {

    // window.confirmationResult
    //   .confirm(keycode)
    //   .then(async (res) => {
    //     try {
    //       console.log(data);
    //       const result = await axios.post(`https://medical-appointment-booking-api-production.up.railway.app/api/user/register`, data);
    //       if (result) {
    //         toast.success("Register successfully!", {
    //           position: "top-right"
    //         });
    //         navigator('/home');
    //         window.location.reload();
    //       }
    //     } catch (error) {

    //     }

    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });



  }
  const hanldeSendOtp = async () => {
    // const result = await axios.get(`https://medical-appointment-booking-api-production.up.railway.app/api/user/search/${phone}`);
    // if (result && result.data == true) {
    //   toast.error("Phone đã đăng ký! Vui lòng đăng nhập hoặc đăng ký số phone mới", {
    //     position: "bottom-right"
    //   });
    //   //return;
    // } else {
    //   toast.success("Bạn có thể đăng ký toàn khoản mới vớ số điện thoại này!", {
    //     position: "top-right"
    //   });
    //   onCaptchVerify();
    //   const appVerifier = window.recaptchaVerifier;
    //   const formatPh = "+84" + phone.slice(1);
    //   signInWithPhoneNumber(auth, formatPh, appVerifier)
    //     .then((confirmationResult) => {
    //       window.confirmationResult = confirmationResult;
    //       toast.success("OTP sended successfully!", {
    //         position: "top-right"
    //       });
    //       setShowOTP(true)
    //     })
    //     .catch((error) => {
    //     });
    // }

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
                    <motion.div whileTap={{ scale: 0.8 }} onClick={handleSignup}>
                      <button type='submit' className='btn__submit'>Sign up</button>
                    </motion.div>
                  </div>
                </>
              ) : (
                <>
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
                  <div className="mb-3">
                    <input type="phone" className="input__username"
                      id="input__phone" placeholder="Enter your gmail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <motion.div whileTap={{ scale: 0.8 }} onClick={hanldeSendOtp}>
                      <button type='submit' className='btn__submit' >Send code via SMS</button>
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

export default SignupPhone