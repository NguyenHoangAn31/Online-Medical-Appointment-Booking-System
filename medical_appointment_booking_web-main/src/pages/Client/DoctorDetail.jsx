

// Hien Create: 28/4/2024

// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FaUserDoctor } from "react-icons/fa6";
import DoctorItem from '../../components/Card/DoctorItem';

// eslint-disable-next-line react/prop-types
const DoctorDetail = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [workings, setWorkings] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [relateds, setRelateds] = useState([]);

  useEffect(() => {
    fetchDoctor();
    fetchWorkings();
    fetchQualifications();
  }, [id]);

  const fetchDoctor = async () => {
    try {
      const response = await axios.get(`https://medical-appointment-booking-api-production.up.railway.app/api/doctor/${id}`);
      const doctor = response.data;
      setDoctor(doctor);
      console.log(doctor.department);
      // Gọi fetchRelateds khi đã lấy được thông tin bác sĩ
      fetchRelateds(doctor.department.id);
    } catch (error) {
      console.error('Error fetching doctor:', error);
    }
  };

  const fetchWorkings = async () => {
    try {
      const response = await axios.get(`https://medical-appointment-booking-api-production.up.railway.app/api/working/doctor/${id}`);
      const workings = response.data;
      const qualifications = response.data;
      setWorkings(workings);
      setQualifications(qualifications);
    } catch (error) {
      console.error('Error fetching workings:', error);
    }
  };
  const fetchQualifications = async () => {
    try {
      const response = await axios.get(`https://medical-appointment-booking-api-production.up.railway.app/api/qualification/doctor/${id}`);
      const qualifications = response.data;
      setQualifications(qualifications);
    } catch (error) {
      console.error('Error fetching workings:', error);
    }
  };

  const fetchRelateds = async (departmentId) => {
    try {
      const response = await axios.get(`https://medical-appointment-booking-api-production.up.railway.app/api/doctor/related-doctor/${departmentId}`);
      const relatedDoctorsData = response.data;
      //console.log(relatedDoctorsData);
      // Lấy 4 bác sĩ ngẫu nhiên từ danh sách
      const randomDoctors = relatedDoctorsData.sort(() => 0.5 - Math.random()).slice(0, 4);
      setRelateds(randomDoctors);
    } catch (error) {
      //console.error('Error fetching related doctors:', error);
    }
  };

  const formatPriceToCurrency = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  if (!doctor) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="doctor__detail_background container">
        <div className="row bg-white doctor__detail_header">
          <div className="col-md-6 doctor__detail_header_left">
            <div className="doctor__list" key={id}>
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
                {doctor.rate}&nbsp;<i class="bi bi-star-fill"></i>
              </div>
            </div>
          </div>
          <div className="col-md-6 doctor__detail_header_right">
            <h2>{doctor.title} {doctor.fullName}</h2>
            <h4>Outpatient Department: {doctor.department.name}</h4>
            <h5>Consultation Fee: {formatPriceToCurrency(doctor.price)}</h5>
            <a href="" className='btn btn-primary'> Booking Doctor </a>
          </div>
        </div>
        <div className="container mt-5 pb-5">
          <strong>Qualifications experience:</strong>
          <ul>
            {Array.isArray(qualifications) && qualifications.map((qualification, index) => {
              return (
                <li key={index}>
                  <strong>{qualification.universityName}</strong>
                  <br />
                  {qualification.course} - {qualification.degreeName}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="container bg-white p-3 doctor__detail_woking">
          <strong>Work experience:</strong>
          <ol>
            {Array.isArray(workings) && workings.map((working, index) => {
              // Tách ngày thành các phần riêng biệt
              const startWorkYear = working.startWork.split('-')[0];
              const endWorkYear = working.endWork.split('-')[0];
              return (
                <li key={index}>
                  <strong>{startWorkYear} - {endWorkYear}: </strong>
                  <br />
                  {working.company}
                  <br />
                  {working.address}
                </li>
              );
            })}
          </ol>
        </div>
        <div className="container">
          <div className="row doctor__detail_list">
            <span className='doctor__detail_list_title'><FaUserDoctor />&nbsp;&nbsp;&nbsp;SEE MORE DOCTORS IN THE SAME SPECIFICATION&nbsp;&nbsp;&nbsp;<FaUserDoctor /></span>
            {relateds.map((item, index) => (
              <div className="col-md-3" key={index}>
                <DoctorItem item={item} key={index} />
              </div>
            ))}
          </div>
        </div>
        <div className="m-5">&nbsp;&nbsp;&nbsp;</div>
      </div >
    </>
  );
};
export default DoctorDetail;

