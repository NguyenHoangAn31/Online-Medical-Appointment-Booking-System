import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import DoctorItem from '../../components/Card/DoctorItem';
import { Pagination } from 'react-bootstrap';

const doctorsPerPage = 8; // Di chuyển ra ngoài component để tránh re-render

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let isMounted = true;
    axios.get(`https://medical-appointment-booking-api-production.up.railway.app/api/doctor/all`)
      .then(response => {
        if (isMounted) {
          setDoctors(response.data);
        }
      })
      .catch(error => console.error("Error fetching doctors:", error));

    return () => { isMounted = false }; // Cleanup tránh memory leak
  }, []);

  // Tính toán danh sách doctor cho trang hiện tại
  const currentDoctors = useMemo(() => {
    const indexOfLastDoctor = currentPage * doctorsPerPage;
    const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
    return doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);
  }, [doctors, currentPage]);

  // Tạo danh sách số trang
  const pageNumbers = useMemo(() => {
    return Array.from({ length: Math.ceil(doctors.length / doctorsPerPage) }, (_, i) => i + 1);
  }, [doctors]);

  return (
    <>
      <div className="container mt-5">
        <h1>List Doctor</h1>
        <hr />
        <div className="row">
          {currentDoctors.map((item, index) => (
            <div className="col-md-3" key={index}>
              <DoctorItem item={item} />
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-md-12">
            <Pagination>
              {pageNumbers.map(number => (
                <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
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

export default Doctor;
