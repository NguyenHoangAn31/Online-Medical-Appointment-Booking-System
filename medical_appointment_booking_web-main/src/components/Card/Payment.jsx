import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { format } from 'date-fns';
import { addAppointment } from '../../services/API/bookingService';
import axios from 'axios';
import { formatDate } from '../../ultils/formatDate';
import { Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const Payment = ({ setActiveHourIndex, setSlotName, setSchedules, isOpen, data, onClose }) => {
    const dateObj = new Date();
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    const [paymentUrl, setPaymentUrl] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [countdown, setCountdown] = useState(10); // Initialize countdown timer to 10 seconds
    const [isDisabled, setIsDisabled] = useState(false);

    const [note, setNote] = useState('')
    const handleChangeContent = (value) => {
        setNote(value)
    }


    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000); // Decrement countdown every second
            return () => clearTimeout(timer); // Clear timeout if component unmounts or countdown changes
        } else {
            setIsDisabled(false); // Enable button when countdown reaches 0
        }
    }, [countdown]);

    const handlePaymentChange = async (method) => {
        // Disable button when countdown reaches 0
        setPaymentMethod(method);
        if (method === 'vnpay') {
            setIsDisabled(true);
            try {
                // const data = {
                //     amount: data?.price * 0.3, // Số tiền cần thanh toán
                //     orderType: 'billpayment',
                //     returnUrl: 'https://medical-appointment-booking-api-production.up.railway.app/api/payment/vn-pay-callback',
                // }
                const response = await axios.get('https://medical-appointment-booking-api-production.up.railway.app/api/payment/create_payment_url', {
                    params: {
                        amount: data?.price * 0.3, // Số tiền cần thanh toán
                        orderType: 'billpayment',
                        returnUrl: 'https://medical-appointment-booking-api-production.up.railway.app/api/payment/vn-pay-callback',
                    },
                });
                setPaymentUrl(response.data.url);
            } catch (error) {
                console.error('Error creating payment URL:', error);
            }
        } else if (method === 'paypal') {
            setIsDisabled(true);
            const paymentResponse = await axios.post('https://medical-appointment-booking-api-production.up.railway.app/paypal/pay', null, {
                params: {
                    sum: (data.price * 0.3) / 25455, // Số tiền thanh toán
                },
            });

            // Chuyển hướng người dùng sang trang thanh toán của PayPal
            setPaymentUrl(paymentResponse.data);;
        } else {
            console.log('Payment method is not recognized, handle accordingly');
        }
    }



    const handleSubmitBook = async () => {
        // data.price = data.price * 0.3;
        data.note = note
        data.appointmentDate = formattedDate
        data.payment = paymentMethod
        const paymentData = {
            partientId: data.partientId,
            partientName: data.partientName,
            scheduledoctorId: data.scheduledoctorId,
            appointmentDate: data.appointmentDate,
            medicalExaminationDay: data.medicalExaminationDay,
            clinicHours: data.clinicHours,
            price: data.price * 0.3,
            note: data.note,
            payment: data.payment,
            status: data.status,
            image: data.image,
            doctorId: data.doctorId,
            doctorTitle: data.doctorTitle,
            doctorName: data.doctorName,
            departmentName: data.departmentName,
        };
        console.log(paymentUrl);
        localStorage.setItem('paymentData', JSON.stringify(paymentData));
        window.location.href = `${paymentUrl}`;

    };


    return (
        <Modal show={isOpen} onHide={onClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Medical Examination Schedule Information
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Patient Name : {data?.partientName}</p>
                <p>Doctor Name :  {data?.doctorTitle} {data?.doctorName}</p>
                <p>Medical Examination Price : {data?.price} VNĐ</p>
                <p>Medical Examination Day : {formatDate(data?.medicalExaminationDay)}</p>
                <p>Medical Examination Hours : {data?.clinicHours}</p>
                <p>Amount To Be Paid To Reserve A Place : {data?.price * 0.3} VNĐ</p>
                <div>
                    <span>Note</span>
                    <TextArea value={note} onChange={(e) => handleChangeContent(e.target.value)} rows={4} />
                </div>
                <p>Select A Payment Method : </p>

                <div className='payment_choose'>
                    <div className=''>
                        <input type="radio" name="payment" id="vnpay_check" onClick={() => handlePaymentChange('vnpay')} />
                        <label htmlFor="vnpay_check"><img src="/images/vnpay.png" alt="" className='img_payment' /></label>
                    </div>
                    <div className=''>
                        <input type="radio" name="payment" id="paypal_check" onClick={() => handlePaymentChange('paypal')} />
                        <label htmlFor="paypal_check"><img src="/images/paypal.png" alt="" className='img_payment' /></label>
                    </div>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmitBook} disabled={isDisabled}>
                    {isDisabled ? `Waiting for ${countdown}s to payment` : 'Payment to complete booking'}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Payment