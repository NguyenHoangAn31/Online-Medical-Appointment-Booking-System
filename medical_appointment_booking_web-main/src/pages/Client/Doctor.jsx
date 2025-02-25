import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import DoctorItem from '../../components/Card/DoctorItem';
import { Pagination, Spinner, Alert } from 'react-bootstrap';

const doctorsPerPage = 8; // Giữ cố định để tránh re-render

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDoctors = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://medical-appointment-booking-api-production.up.railway.app/api/doctor/all`
      );
      setDoctors(response.data);
    } catch (error) {
      setError("Failed to fetch doctors. Please try again.");
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

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
    <div className="container mt-5">
      <h1>List Doctor</h1>
      <hr />

      {loading && (
        <div className="text-center my-3">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <>
          <div className="row">
            {currentDoctors.map((item) => (
              <div className="col-md-3" key={item.id}>
                <DoctorItem item={item} />
              </div>
            ))}
          </div>

          {pageNumbers.length > 1 && (
            <div className="row">
              <div className="col-md-12">
                <Pagination>
                  {pageNumbers.map((number) => (
                    <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
                      {number}
                    </Pagination.Item>
                  ))}
                </Pagination>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Doctor;
