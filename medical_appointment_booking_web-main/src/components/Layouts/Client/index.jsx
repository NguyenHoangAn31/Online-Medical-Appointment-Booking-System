import Header from './Header';
import Footer from './Footer';
import { Toaster } from "react-hot-toast";
import { createContext, useEffect, useState } from 'react';
import getUserData from '../../../route/CheckRouters/token/Token';
import { Link } from 'react-router-dom';

export const UserContext = createContext();

function ClientLayout({ children, isForPatient }) {
    const [currentUser, setCurrentUser] = useState(null)
    //console.log("current user : ",currentUser)
    useEffect(() => {
        var token = getUserData();
        if (token != null && token.user.roles[0] == 'USER') {
            setCurrentUser(token)
        }
    }, [])

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>

            <div>
                <div className='float-end'><Toaster toastOptions={{ duration: 4000 }} /></div>
                <Header />
                <div className='main-app'>
                    {isForPatient ? <div className='container mt-5'>
                        <div className='row'>
                            <div className='col-md-2'>
                                <div className='col-12'>
                                    <ul className='sidebar bg-light'>
                                        <li className={`item ${location.pathname === "/account" ? "active" : ""}`}>
                                            <Link to="/account" className='link'>Profile</Link>
                                        </li>
                                        <li className={`item ${location.pathname === "/booking-history" ? "active" : ""}`}>
                                            <Link to="/booking-history" className='link'>Appointment</Link>
                                        </li>
                                        <li className={`item ${location.pathname === "/favourite" ? "active" : ""}`}>
                                            <Link to="/favourite" className='link'>Favourite</Link>
                                        </li>
                                        <li className={`item ${location.pathname === "/medical-history" ? "active" : ""}`}>
                                            <Link to="/medical-history" className='link'>Medical history</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className='col-md-10'>
                                {children}
                            </div>
                        </div>
                    </div> : <div className='content'>
                        {children}
                    </div>}
                </div>
                <Footer />
            </div>
        </UserContext.Provider>

    );
}

export default ClientLayout;