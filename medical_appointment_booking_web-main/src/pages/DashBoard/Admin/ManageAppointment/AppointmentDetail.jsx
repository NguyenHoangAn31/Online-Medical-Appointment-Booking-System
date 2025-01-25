import { Button, Form, Select } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { changeStatus, getAppointmentDetail } from '../../../../services/API/appointmentService';
import { useInternalNotification } from 'antd/es/notification/useNotification';
import { AlertContext } from '../../../../components/Layouts/DashBoard';
import { Link, useLocation } from 'react-router-dom';
import Spinner from '../../../../components/Spinner';
import { formatDate, formatDateFromArray } from '../../../../ultils/formatDate';

function AppointmentDetail() {
  const { openNotificationWithIcon } = useContext(AlertContext);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");


  const [status, setStatus] = useState('');
  const [appointmentDetail, setAppointmentDetail] = useState({});

  useEffect(() => {
    loadAppointment();
  }, []);


  console.log(appointmentDetail)

  const loadAppointment = async () => {
    setAppointmentDetail(await getAppointmentDetail(id));
  }

  const onInputChange = (value) => {
    setStatus(value)
  }
  const handleSubmit = async () => {
    try {
      await changeStatus(id, status);
      openNotificationWithIcon('success', 'Change Status Successfully', '')
      loadAppointment();
    } catch (error) {
      openNotificationWithIcon('error', 'Something Went Wrong', '')
      console.log(error)
    }
  }
  console.log(appointmentDetail)
  return (
    <div>




      {
        !Object.keys(appointmentDetail).length != 0 ? <Spinner /> : <>

          {appointmentDetail.status == 'waiting' ? <h1 className=' mb-5'>Awaiting Examination</h1> : <h1 className='mb-5'>Appointment has been {appointmentDetail.status}</h1>}
          <div className='d-flex align-items-center px-4'>

            <div className='flex-grow-1'>
              <div className='mb-5'>
                <h3 className='text-center mb-4'>Doctor Information</h3>
                <div className='appointment-patient d-flex gap-3'>
                  <div>
                    <img src={"https://medical-appointment-booking-api-production.up.railway.app/images/doctors/" + appointmentDetail.doctor.image} alt="" width='200' style={{ backgroundImage: 'linear-gradient(120deg, rgb(161, 196, 253) 0%, rgb(194, 233, 251) 100%)' }} />
                  </div>
                  <div className='mt-2'>
                    <div>
                      <p style={{ fontWeight: 500 }}>Doctor Name</p>
                      <p>{appointmentDetail.doctor.fullName}</p>
                    </div>
                    <div>
                      <p style={{ fontWeight: 500 }}>Departmen Name</p>
                      <p>{appointmentDetail.doctor.department.name}</p>
                    </div>
                    <div>
                      <p style={{ fontWeight: 500 }}>Birthday</p>
                      <p>{formatDate(appointmentDetail.doctor.birthday)}</p>
                    </div>
                  </div>

                </div>
              </div>
              <div>
                <h3 className='text-center mb-4'>Patient Information</h3>

                <div className='d-flex appointment-doctor gap-3'>
                  <div>
                    <img src={"https://medical-appointment-booking-api-production.up.railway.app/images/patients/" + appointmentDetail.patient.image} alt="" width='200' />

                  </div>
                  <div className='mt-2'>

                    <div>
                      <p style={{ fontWeight: 500 }}>Patient Name</p>
                      <p>{appointmentDetail.patient.fullName}</p>
                    </div>
                    <div>
                      <p style={{ fontWeight: 500 }}>Birthday</p>
                      <p>{formatDateFromArray(appointmentDetail.patient.birthday)}</p>
                    </div>
                    <div>
                      <p style={{ fontWeight: 500 }}>Address</p>
                      <p>{appointmentDetail.patient.address}</p>
                    </div>

                  </div>



                </div>
              </div>

            </div>

            <div className='general-information flex-grow-1' style={{ padding: '35px 25px 0px 25px', background: 'rgb(244, 247, 254)', height: 'max-content' }}>
              <h2 className='text-center mb-4'>Examination Information</h2>
              <div>
                <p className='fs-5' style={{ fontWeight: 500 }}>Appointment Date</p>
                <p className='fs-6'>{formatDate(appointmentDetail.appointmentDate)}</p>
              </div>
              <div>
                <p className='fs-5' style={{ fontWeight: 500 }}>Medical Examination Day</p>
                <p className='fs-6'>{formatDate(appointmentDetail.medicalExaminationDay)}</p>
              </div>

              <div>
                <p className='fs-5' style={{ fontWeight: 500 }}>Medical Examination Hours</p>
                <p className='fs-6'>{appointmentDetail.clinicHours}</p></div>
              <div>
                <p className='fs-5' style={{ fontWeight: 500 }}>Medical Examination Price Paid</p>
                <p className='fs-6'>{appointmentDetail.doctor.price} VND</p></div>


              <div>
                <p className='fs-5' style={{ fontWeight: 500 }}>Booking Price</p>
                <p className='fs-6'>{appointmentDetail.price} VND</p>

              </div>

              <div>
                <p className='fs-5' style={{ fontWeight: 500 }}>Note</p>
                <p className='fs-6'>{appointmentDetail.note}</p>
              </div>

            </div>

          </div>

          <div><Form.Item className='float-end' label="Status" style={{ width: '20%', marginBottom: 10, marginTop: 40 }}>
            <Select allowClear placeholder="Choose Status" onChange={(e) => onInputChange(e)}>
              <Select.Option value="no show">No Show</Select.Option>
              <Select.Option value="cancelled">Cancel</Select.Option>
              <Select.Option value="completed">Complete</Select.Option>
            </Select>
          </Form.Item>
            <Button style={{ clear: 'both' }} className='float-end' disabled={status == ''} type='primary' onClick={handleSubmit}>Change</Button></div>


        </>
      }

    </div>
  )
}

export default AppointmentDetail