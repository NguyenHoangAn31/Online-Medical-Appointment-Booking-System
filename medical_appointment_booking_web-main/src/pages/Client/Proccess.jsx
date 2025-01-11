
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Proccess = () => {
  const location = useLocation();
  const [message, setMessage] = useState('');
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    processPayment();
  }, []);

  const processPayment = async () => {
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get('status');
    if (status === 'success') {
      const storedPaymentData = localStorage.getItem('paymentData');
      setPaymentData(JSON.parse(storedPaymentData));
      var data = JSON.parse(storedPaymentData);
      try {
        const res = await axios.post('https://medical-appointment-booking-api-production.up.railway.app/api/appointment/create', data, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (res.data != null) {
          setMessage('Payment success');  //   if(res.data != null){
          Swal.fire({
            title: 'Payment successful!',
            text: `Dear ${paymentData.partientName}! You have successfully booked your appointment!
              Please come to the medical examination facility on ${paymentData.medicalExaminationDay} at ${paymentData.clinicHours} to have a doctor examine you! 
              Wish you quickly recovered. Best regards!`,
            icon: 'success',
            confirmButtonText: 'Confirm'
          });
        } else {
          setMessage('Payment failed');
          Swal.fire({
            title: 'Payment failed',
            text: `Dear ${paymentData.partientName}! You have not successfully paid. Please re-book your medical examination.`,
            icon: 'error',
            confirmButtonText: 'Confirm'
          });
        }
      } catch (error) { /* empty */ }

    } else {
      setMessage('Payment failed');
      Swal.fire({
        title: 'Payment failed',
        text: `Dear ${paymentData.partientName}! You have not successfully paid. Please re-book your medical examination.`,
        icon: 'error',
        confirmButtonText: 'Confirm'
      });
    }
  };


  return (
    <div className='container mt-5'>
      <div className="row">
        <div className="col-md-6">
          <div className="row">
            <div className="col-12">
              <img src="/images/payment_success.jpg" alt="" className='img-fluid' />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row">
            <div className="col-12">
              <h2>Booking schedule information:</h2>
              {paymentData ? (
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th style={{ width: '5%' }}>#</th>
                      <th style={{ width: '35%' }}>Title</th>
                      <th style={{ width: '60%' }}>Infomation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td scope='col-2'>Patient Name</td>
                      <td>{paymentData.partientName}</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Doctor Name:</td>
                      <td>{paymentData.doctorTitle} {paymentData.doctorName}</td>
                    </tr>
                    <tr>
                      <th scope="row">7</th>
                      <td>Schedule date</td>
                      <td>{paymentData.appointmentDate}</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Medical Examination Day</td>
                      <td>{paymentData.medicalExaminationDay}</td>
                    </tr>
                    <tr>
                      <th scope="row">4</th>
                      <td>Medical examination time</td>
                      <td>{paymentData.clinicHours}</td>
                    </tr>
                    <tr>
                      <th scope="row">5</th>
                      <td>Medical examination price</td>
                      <td>{paymentData.price}</td>
                    </tr>
                    <tr>
                      <th scope="row">6</th>
                      <td>Clinical symptoms</td>
                      <td>{paymentData.note}</td>
                    </tr>

                    <tr>
                      <th scope="row">8</th>
                      <td>Payment Method</td>
                      <td>{paymentData.payment}</td>
                    </tr>
                    <tr>
                      <th scope="row">9</th>
                      <td>Medical Examination status</td>
                      <td>{paymentData.status}</td>
                    </tr>

                  </tbody>
                </table>

              ) : (
                <p>No payment data stored in sessionStorage.</p>
              )}
              <div className='d-flex justify-content-between align-items-center gap-5'>
                <p>Payment results: {message}</p>
                <a className='btn btn-primary' href='/booking-history'>View Appointment</a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Proccess
