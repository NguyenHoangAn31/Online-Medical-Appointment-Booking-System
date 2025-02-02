import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import bg_login from '../../public/images/image-login.png';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import * as ecryptToken from '../ultils/encrypt'
import { toast } from "react-hot-toast";

import getUserData from '../route/CheckRouters/token/Token';
import { UserContext } from '../components/Layouts/Client';

const LoginGmailStep = () => {
    const [keycode, setKeycode] = useState('');
    const navigateTo = useNavigate();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const username = queryParams.get("email");
    const { currentUser, setCurrentUser } = useContext(UserContext);

    const handleSignin = async (event) => {
        event.preventDefault();

        try {
            const result = await axios.post('https://medical-appointment-booking-api-production.up.railway.app/api/auth/login', {
                username: username,
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

        } catch (error) {
            console.log(error)
            toast.error("OTP is invalid", {
                position: "top-right"
            });
        }
    }


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
                                    {/* <h5 className='mb-2 text-black-50'>Step 2: Xác thực sms đã send qua điện thoại</h5> */}
                                    <form onSubmit={handleSignin}>
                                        <input type="hidden" name="provider" value="phone" />
                                        <div className="mb-3">
                                            <input type="text" className="input__username"
                                                id="input__phone"
                                                placeholder="Enter keycode"
                                                value={keycode}
                                                onChange={(e) => setKeycode(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <motion.div whileTap={{ scale: 0.8 }}>
                                                <button type='submit' className='btn__submit'>Submit</button>
                                            </motion.div>
                                        </div>
                                    </form>
                                </div>

                                <div className='mt-xl-5'>
                                    <p>Quay về trang login. <Link to="/login" className='text-decoration-none ms-2'>Back to login</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginGmailStep