import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DoctorItem from '../../components/Card/DoctorItem';
import { Pagination } from 'react-bootstrap';

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] = useState(8);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    const response = await axios.get(`https://medical-appointment-booking-api-production.up.railway.app/api/doctor/all`);
    const doctors = response.data;
    // console.log(doctors);
    setDoctors(doctors);
  };

  // Get current doctors
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(doctors.length / doctorsPerPage); i++) {
    pageNumbers.push(i);
  }


  return (
    <>
      {/* Hien create: 28/4/2024 */}
      {/* <ListDoctor /> */}
      <div className="container mt-5">
        <h1>List Doctor</h1>
        <hr />
        <div className="row">
          {currentDoctors.map((item, index) => (
            <div className="col-md-3">
              <DoctorItem item={item} key={index} />
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-md-12">
            <Pagination>
              {pageNumbers.map(number => (
                <Pagination.Item key={number} active={number === currentPage} onClick={() => paginate(number)}>
                  {number}
                </Pagination.Item>
              ))}
            </Pagination>
          </div>
        </div>
      </div>
    </>
  );
}

export default Doctor