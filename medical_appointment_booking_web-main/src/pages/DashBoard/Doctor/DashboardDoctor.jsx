/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AlertContext } from '../../../components/Layouts/DashBoard';
import dayjs from 'dayjs';

const DashboardDoctor = () => {

  const { currentUser } = useContext(AlertContext);

  const [doctor, setDoctor] = useState(null);
  // console.log("id of currentUser : ", currentUser.user.id);
  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await axios.get(`https://medical-appointment-booking-api-production.up.railway.app/api/doctor/findbyuserid/${currentUser.user.id}`); // cái này là tìm doctor theo id chứ k phải tìm theo user_id
        const doctorData = response.data;
        // console.log(doctorData);
        setDoctor(doctorData);
      } catch (error) {
        // console.error('Error fetching doctor data:', error);
      }
    };
    fetchDoctorData();
  }, [currentUser]);

  if (!doctor) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-lg-8 p-5">
            <div className='bg-white p-5 rounded-4 position-relative'>
              <h4>Good Morning, </h4>
              <h3 className='text-warning'>{doctor.title} {doctor.fullName}</h3>
              <span className='text-body-tertiary'>Have a nice day at work</span>
              <div className="position-absolute end-0" style={{ top: '-150px' }}>
                <div className="doctor__list">
                  <div className="doctor__list_background"></div>
                  <img
                    src={"https://medical-appointment-booking-api-production.up.railway.app/images/doctors/" + doctor.image}
                    alt=""
                    className="doctor__list_image"
                  />
                  <div className="doctor__list_background_title"></div>
                  <span className="doctor__list_title">{doctor.title} {doctor.fullName}</span>
                  <span className="doctor__list_department">Department: {doctor.department.name}</span>
                  <div className="doctor__list_rate">
                    {doctor.rate}&nbsp;<i className="bi bi-star-fill"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 p-3">
            {/* la sao ta */}
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardDoctor