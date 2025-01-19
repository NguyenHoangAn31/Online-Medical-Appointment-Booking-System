import React, { useState, useEffect, useRef, useContext } from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from 'framer-motion';
import getUserData from '../../../../route/CheckRouters/token/Token';
import { BiBell, BiHeart, BiLogIn, BiCalendarCheck, BiSolidUserRectangle } from "react-icons/bi";
//import * as patientService from '../../../../services/API/patientService';
import axios from 'axios';
// import { getAuth, signOut } from "firebase/auth";
import { UserContext } from '..';

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const { currentUser, setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    fetchApi();
  }, [currentUser]);

  const fetchApi = async () => {
    try {
      if (currentUser != null) {
        const result = await axios.get(`https://medical-appointment-booking-api-production.up.railway.app/api/patient/${currentUser.user.id}`);
        setUser(result.data);
      }
    } catch (error) {
    }
  }




  const menuRef = useRef(null);

  const handleMenuToggle = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleMouseLeave = () => {
    setIsMenuVisible(false);
  };

  const handleLogin = () => {
    localStorage.setItem('currentPath', currentPath);
    navigate('/login');
  }

  const handleSignOut = () => {
    localStorage.removeItem("Token");
    // const auth = getAuth();
    navigate("/");
    setCurrentUser(null)
    setIsMenuVisible(false)

    // signOut(auth).then(() => {
    //   navigate("/");
    //   setCurrentUser(null)
    //   setIsMenuVisible(false)
    // }).catch((error) => {
    //   console.log(error);
    // });
  };


  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light sticky-top">
        <div className="container">
          <Link to="/" className="navbar-brand logo">Medi<span className='logo-span'>care</span></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto me-5">
              <li className="nav-item">
                <Link to="/about" className="nav-link">About Us</Link>
              </li>
              <li className="nav-item">
                <Link to="/booking" className="nav-link">Booking an Doctor</Link>
              </li>
              <li className="nav-item">
                <Link to="/service" className="nav-link">Service</Link>
              </li>
              <li className="nav-item">
                <Link to="/doctor" className="nav-link">For Doctor</Link>
              </li>
              <li className="nav-item">
                <Link to="/blog" className="nav-link">Blog</Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link">Contact us</Link>
              </li>
            </ul>
            <motion.div>
              {currentUser != null && currentUser.user.roles[0] == 'USER' ? (
                <div className='icon_login'>
                  <div>
                    {Object.keys(user).length != 0 && user.image != '' ? <img src={"https://medical-appointment-booking-api-production.up.railway.app/images/patients/" + user.image} alt="" id='user-login' onClick={handleMenuToggle} className='img__icon_login img-fluid' /> :
                      <img src="/images/login_default.jpg" alt="" id='user-login' onClick={handleMenuToggle} className='img__icon_login img-fluid' />}
                  </div>
                  {isMenuVisible && (
                    <ul className='list-unstyled dropdown__user' ref={menuRef} onMouseLeave={handleMouseLeave}>
                      <li><Link to="" className='user__link'>Hello! {user.fullName}</Link></li>
                      <li><Link to="" className='user__link'><BiBell /> Notication</Link></li>
                      <li><Link to="/account" className='user__link'><BiSolidUserRectangle /> Profile</Link></li>
                      <li><Link to="/booking-history" className='user__link'><BiCalendarCheck /> Appointment</Link></li>
                      <li><Link to="favourite" className='user__link'><BiHeart /> Fauvorite</Link></li>
                      <li><Link to="/medical-history" className='user__link'><BiSolidUserRectangle /> Medical history</Link></li>
                      <li onClick={handleSignOut}><a className='user__link'><BiLogIn /> Sign out</a></li>
                    </ul>
                  )}
                </div>

              ) : (
                <div onClick={handleLogin} className="login">Login</div>
              )}
            </motion.div>
          </div>
        </div>
      </nav>

    </>
  )
}

export default Header