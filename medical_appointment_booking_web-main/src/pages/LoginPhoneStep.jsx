
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import bg_login from '../../public/images/image-login.png';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { toast } from "react-hot-toast";
import * as ecryptToken from '../ultils/encrypt'
import getUserData from '../route/CheckRouters/token/Token';
import { UserContext } from '../components/Layouts/Client';


const LoginPhoneStep = () => {
    const [username, setUsername] = useState('');
    const [keycode, setKeycode] = useState('');
    const [loading, setLoading] = useState(false);
    const navigateTo = useNavigate();
    const currentPath = localStorage.getItem('currentPath');
    const { currentUser, setCurrentUser } = useContext(UserContext);

    useEffect(() => {
        const queryParams = queryString.parse(window.location.search);
        setUsername(queryParams.username);
        // Bây giờ bạn có thể làm gì đó với giá trị của username
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            username: username,
            keycode: keycode,
            provider: 'phone'
        }
        setLoading(true);
        window.confirmationResult
            .confirm(data.keycode)
            .then(async (res) => {
                setLoading(false);
                await axios.post('https://medical-appointment-booking-api-production.up.railway.app/api/auth/set-keycode', data);
                try {
                    const result = await axios.post('https://medical-appointment-booking-api-production.up.railway.app/api/auth/login', data);

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
                    // window.location.reload();

                } catch (error) { /* empty */ }

            })
            .catch((err) => {
                toast.error("OTP is incorrect", {
                    position: "bottom-right"
                });
                setLoading(false);
            });

        // setup keycode vào database


        //console.log(data);

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
                                    <form onSubmit={handleSubmit}>
                                        <input type="hidden" name="provider" value="phone" />
                                        <div className="mb-5 input__keycode-total">
                                            <input type="text" className="input__username"
                                                placeholder="Enter keycode"
                                                id="input__phone"
                                                maxLength={6}
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

export default LoginPhoneStep