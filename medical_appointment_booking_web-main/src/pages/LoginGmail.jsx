import React, { useState, useEffect, useContext } from 'react';
import bg_login from '../../public/images/image-login.png';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-hot-toast";

import getUserData from '../route/CheckRouters/token/Token';
import { UserContext } from '../components/Layouts/Client';


const LoginGmail = () => {

    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [username, setUsername] = useState('');
    const provider = 'gmail';

    const navigateTo = useNavigate();


    const handleSendOtp = async (event) => {
        event.preventDefault()
        const data = {
            username: username,
            provider: provider
        }
        if (username == '') {
            toast.error("Please enter your email.", {
                position: "top-right"
            });
            return;
        }
        else {
            const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
            if (gmailRegex.test(username)) {
            } else {
                toast.error("Email is not invalid!", {
                    position: "top-right"
                });
                return;
            }

        }

        try {


            const checkaccount = await axios.post('https://medical-appointment-booking-api-production.up.railway.app/api/auth/check-account', data);
            if (checkaccount.data.result) {
                const checksendotp = await axios.post('https://medical-appointment-booking-api-production.up.railway.app/api/auth/send-otp', data);

                if (!checksendotp.data) {
                    //refresh token còn hạn , lấy dữ liệu lưu vào localstorage
                    console.log('còn hạn')
                    var user = getUserData.user;
                    if (user == undefined) {
                        const setotp = await axios.post(`https://medical-appointment-booking-api-production.up.railway.app/api/auth/set-keycode-gmail/${data.username}`);
                        if (setotp.data) {
                            toast.success("Send OTP Successfully!", {
                                position: "top-right"
                            });
                            navigateTo(`/login-by-gmail-submit?email=${username}`);
                        }
                    }
                    else {
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
                    //refresh token hết hạn , send otp và chuyển trang
                    console.log('hết hạn')

                    const setotp = await axios.post(`https://medical-appointment-booking-api-production.up.railway.app/api/auth/set-keycode-gmail/${data.username}`);
                    if (setotp.data) {
                        toast.success("Send OTP Successfully!", {
                            position: "top-right"
                        });
                        navigateTo(`/login-by-gmail-submit?email=${username}`);
                    }

                }
            }
            else if (checkaccount.data.result == "disable") {
                toast.error("Email not registered account!", {
                    position: "top-right"
                });
            }
            else {
                toast.error("Account has been disabled please contact admin to resolve!", {
                    position: "top-right"
                });
            }


        } catch (error) {
            console.error('Error sending OTP: ', error)
        }
    };

    return (
        <>
            <div className='container mt-5'>
                <div className="row">
                    <div className="col-md-6">
                        <div className="col-12">
                            <img src={bg_login} alt="" className='img-fluid' />
                        </div>
                    </div>
                    <div className="col-md-1"></div>
                    <div className='col-md-5'>
                        <div className="col-12">
                            <div className="text-center justify-content-center px-5 mt-xxl-5">
                                <h3 className='login__title'>Login</h3>
                                <h5 className='login__title_sup'>Booking appointment</h5>
                                <div className='py-5 border-top border-dark border-2 mt-3'>
                                    {/* <h5 className='mb-3 text-black-50'>Step 1: Nhập gmail để nhận mã xác thực</h5> */}
                                    <form onSubmit={handleSendOtp}>
                                        <input type="hidden" name="provider" value="gmail" />
                                        <div className="mb-3">
                                            <input type="gmail" className="input__username"
                                                id="input__phone" placeholder="Enter your gmail"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <motion.div whileTap={{ scale: 0.8 }}>
                                                <button type='submit' className='btn__submit'>Login</button>
                                            </motion.div>
                                        </div>
                                    </form>
                                </div>

                                <div className='mt-xl-5'>
                                    <p>Change login method .<Link to="/login" className='text-decoration-none ms-2'>Back to login</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default LoginGmail