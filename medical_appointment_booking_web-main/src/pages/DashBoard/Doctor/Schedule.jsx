/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { PlusOutlined } from '@ant-design/icons';
import { Button, message, DatePicker, Select } from 'antd';
import dayjs from 'dayjs';
import { useParams, useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import { AlertContext } from '../../../components/Layouts/DashBoard';

function Schedule() {
  const navigate = useNavigate();
  const { openNotificationWithIcon } = useContext(AlertContext);
  const { Option } = Select;
  const [slots, setSlots] = useState([]);
  const [patients, setPatients] = useState({});
  const [appointments, setAppointments] = useState({});
  const { currentUser } = useContext(AlertContext);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [medicalHistory, setMedicalHistory] = useState({});
  const [showHistory, setShowHistory] = useState({});

  const [medicalCreate, setMedicalCreate] = useState({});
  const [showCreate, setShowCreate] = useState({});

  const [isChecked, setIsChecked] = useState(true);

  useEffect(() => {
    const fetchSlotData = async () => {
      if (!currentUser || !currentUser.user || !currentUser.user.id) return;
      try {
        const dayMonthYear = selectedDate.format('YYYY-MM-DD');
        const response = await axios.get(`https://medical-appointment-booking-api-production.up.railway.app/api/schedules/doctor/${currentUser.user.id}/day/${dayMonthYear}`);
        const slotData = response.data;
        setSlots(slotData);
        slotData.forEach(slotItem => {
          fetchPatientData(slotItem.startTime, slotItem.scheduledoctorId);
          fetchAppointmentData(slotItem.startTime, slotItem.scheduledoctorId);
        });
      } catch (error) {
        console.error('Error fetching doctor data:', error);
        message.error('Failed to fetch slot data');
      }
    };
    fetchSlotData();
  }, [currentUser, selectedDate]);

  const fetchPatientData = async (startTime, doctorId) => {
    try {
      const response = await axios.get(`https://medical-appointment-booking-api-production.up.railway.app/api/patient/patientbyscheduledoctoridandstarttime/${doctorId}/${startTime}`);
      const patientData = response.data;
      setPatients(prevPatients => ({
        ...prevPatients,
        [`${startTime}-${doctorId}`]: patientData
      }));
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  };

  const fetchAppointmentData = async (startTime, doctorId) => {
    try {
      const response = await axios.get(`https://medical-appointment-booking-api-production.up.railway.app/api/appointment/appointmentbyscheduledoctoridandstarttime/${doctorId}/${startTime}`);
      const appointmentData = response.data;
      setAppointments(prevAppointments => ({
        ...prevAppointments,
        [`${startTime}-${doctorId}`]: appointmentData
      }));
    } catch (error) {
      console.error('Error fetching appointment data:', error);
    }
  };

  const fetchMedicalHistory = async (patientId) => {
    try {
      const response = await axios.get(`https://medical-appointment-booking-api-production.up.railway.app/api/patient/history/${patientId}`);
      const historyData = response.data;
      setMedicalHistory(prevHistory => ({
        ...prevHistory,
        [patientId]: historyData
      }));
    } catch (error) {
      console.error('Error fetching medical history:', error);
      message.error('Failed to fetch medical history');
    }
  };

  const fetchMedicalCreate = async (patientId) => {
    try {
      setMedical({
        ...medical,
        partientId: patientId  // Assuming this is where patient id is stored
      });

      setMedicalCreate(prevCreate => ({
        ...prevCreate,
        [patientId]: true
      }));
    } catch (error) {
      console.error('Error fetching medical create:', error);
      message.error('Failed to fetch medical create');
    }
  };


  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSlotClick = (slotItem) => {
    setSelectedSlot(slotItem);
  };

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      await axios.put(`https://medical-appointment-booking-api-production.up.railway.app/api/appointment/changestatus/${appointmentId}/${newStatus}`);
      // Update appointments state after successful update
      const updatedAppointments = appointments[selectedSlot.startTime + '-' + selectedSlot.scheduledoctorId].map(appointment => {
        if (appointment.id === appointmentId) {
          return { ...appointment, status: newStatus };
        }
        return appointment;
      });
      setAppointments(prevAppointments => ({
        ...prevAppointments,
        [`${selectedSlot.startTime}-${selectedSlot.scheduledoctorId}`]: updatedAppointments
      }));
      message.success('Appointment status updated successfully');
    } catch (error) {
      console.error('Error updating appointment status:', error);
      message.error('Failed to update appointment status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'waiting':
        return { border: '2px solid #1890ff' }; // blue
      case 'no show':
        return { border: '2px solid #fa8c16' }; // orange
      case 'cancelled':
        return { border: '2px solid #f5222d' }; // red
      case 'completed':
        return { border: '2px solid #52c41a' }; // green
      default:
        return {};
    }
  };

  const calculateAge = (birthday) => {
    const today = dayjs();
    const birthDate = dayjs(birthday);
    return today.diff(birthDate, 'year');
  };

  const cancelCreate = async (e) => {
    e.preventDefault();
    await navigate("/dashboard/doctor/schedule");
    window.location.reload();
  };

  const [medical, setMedical] = useState({
    name: '',
    content: '',
    prescription: '',
    patientId: '',
  });
  const [validationErrors, setValidationErrors] = useState({});
  const handleCreateMedical = (e) => {
    // console.log(e)
    const { name, value } = e.target;
    setMedical({
      ...medical,
      [name]: value
    });

    if (value.trim() !== '') {
      setValidationErrors({
        ...validationErrors,
        [name]: false
      });
    }
  };
  const formatDate = (date) => {
    return date.toISOString().slice(0, 10);
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;
    if (!medical.name.trim()) {
      errors.name = true;
      isValid = false;
    }
    if (!medical.content.trim()) {
      errors.content = true;
      isValid = false;
    }
    if (!medical.prescription.trim()) {
      errors.prescription = true;
      isValid = false;
    }
    setValidationErrors(errors);
    return isValid;
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState({
    name: '',
    content: '',
    prescription: '',
  });
  const showModal = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      openNotificationWithIcon('danger', 'Please fill out all required fields', '');
      return;
    }
    setIsModalVisible(true);
    setModalData({
      name: medical.name,
      content: medical.content,
      prescription: medical.prescription,
      dayCreate: formatDate(new Date()),
    });
  };
  const createMedical = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      openNotificationWithIcon('danger', 'Please fill out all required fields', '');
      return;
    }
    const data = {
      // set 4 truong o7 ben6 kia vao day
      name: medical.name,
      content: medical.content,
      prescription: medical.prescription,
      patientId: medical.partientId,
      dayCreate: formatDate(new Date()),
    }
    // console.log(data);
    setIsModalVisible(false);
    try {
      const res = await axios.post('https://medical-appointment-booking-api-production.up.railway.app/api/medical/create', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      openNotificationWithIcon('success', 'Create Prescribed Successfully', '');
      navigate("/dashboard/doctor/schedule");
      window.location.reload();
      return res;
    } catch (error) {
      openNotificationWithIcon('error', 'Failed to create', '');
    }
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className="schedule">
        {/* <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{ backgroundColor: '#52c41a', marginBottom: '16px' }}
      >
        Add New Schedule
      </Button> */}
        {/* <hr /> */}
        <DatePicker
          value={selectedDate}
          onChange={handleDateChange}
          style={{ marginBottom: '16px' }}
        />
        <div className="row">
          {slots.map((slotItem, index) => (
            <div key={index} className="col-lg-1">
              <div
                className="card mb-2"
                style={getStatusColor(appointments[`${slotItem.startTime}-${slotItem.scheduledoctorId}`]?.[0]?.status)}
                onClick={() => handleSlotClick(slotItem)}
              >
                <div className="card-header text-center">
                  <strong>{slotItem.startTime}</strong>
                </div>
                <div className="card-body text-center p-0">
                  {appointments[`${slotItem.startTime}-${slotItem.scheduledoctorId}`]?.[0]?.status === 'waiting' ? 'waiting'
                    : appointments[`${slotItem.startTime}-${slotItem.scheduledoctorId}`]?.[0]?.status === 'no show' ? 'no show'
                      : appointments[`${slotItem.startTime}-${slotItem.scheduledoctorId}`]?.[0]?.status === 'cancelled' ? 'cancelled'
                        : appointments[`${slotItem.startTime}-${slotItem.scheduledoctorId}`]?.[0]?.status === 'completed' ? 'completed'
                          : ''}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* <hr /> */}
        {selectedSlot && patients[`${selectedSlot.startTime}-${selectedSlot.scheduledoctorId}`] && (
          <div className='container-fluid'>
            {patients[`${selectedSlot.startTime}-${selectedSlot.scheduledoctorId}`].map((patient, index) => (
              <div className="row" key={index}>
                <div className="container-fluid mt-5">
                  <div className="row">
                    <div className="col-lg-2">
                      <h6>Full Name</h6>
                      <img src={"https://medical-appointment-booking-api-production.up.railway.app/images/patients/" + patient.image} alt="" width={'30px'} height={'30px'} style={{ borderRadius: '50%' }} /> {patient.fullName}
                    </div>
                    <div className="col-lg-2">
                      <h6>Birthday</h6>
                      {dayjs(patient.birthday).format('DD/MM/YYYY')}
                    </div>
                    <div className="col-lg-2">
                      <h6>Gender</h6>
                      {patient.gender}
                    </div>
                    <div className="col-lg-2">
                      {appointments[`${selectedSlot.startTime}-${selectedSlot.scheduledoctorId}`].map((appointment, index) => (
                        <React.Fragment key={index}>
                          <h6>Note</h6>
                          {appointment.note}
                        </React.Fragment>
                      ))}
                    </div>
                    <div className="col-lg-2">
                      <h6>&nbsp; &nbsp; &nbsp;</h6>
                      <Button
                        style={{ border: "0" }}
                        onClick={() => {
                          fetchMedicalCreate(patient.id);
                          setShowCreate(prev => ({
                            ...prev,
                            [patient.id]: !prev[patient.id]
                          }));
                        }}>
                        {appointments[`${selectedSlot.startTime}-${selectedSlot.scheduledoctorId}`].some(appointment => appointment.status === 'completed' || appointment.status === 'cancelled')
                          ?
                          <span style={{ border: "0", display: "none" }}></span>
                          : (
                            <strong>Create a prescription</strong>
                          )}
                      </Button>
                      {/* <Select value={appointment.status} style={{ width: 120 }} onChange={(value) => handleStatusChange(appointment.id, value)}>
                            <Option value="no show">no show</Option>
                            <Option value="completed">completed</Option>
                          </Select> */}
                    </div>
                    <div className="col-lg-2">
                      <h6>&nbsp; &nbsp; &nbsp;</h6>
                      <Button onClick={() => {
                        fetchMedicalHistory(patient.id);
                        setShowHistory(prev => ({
                          ...prev,
                          [patient.id]: !prev[patient.id]
                        }));
                      }}>
                        View History
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="container-fluid mt-5">
                  {showCreate[patient.id] && medicalCreate[patient.id] && (
                    <div className="row">
                      <div className="input-group mb-3">
                        <input
                          type="hidden"
                          className="form-control"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-default"
                          name="patientId"
                          value={patient.id}
                          onChange={handleCreateMedical}
                        />
                      </div>
                      <div className="col-lg-3">
                        <div className="mb-3">
                          <label className="form-label">Disease name:</label>
                          <input
                            type="text"
                            className={`form-control ${validationErrors.name ? 'is-invalid' : ''}`}
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default"
                            name="name"
                            onChange={handleCreateMedical}
                          />
                        </div>
                        {validationErrors.name && (
                          <span className="text-danger">This field is required</span>
                        )}
                      </div>
                      <div className="col-lg-3">
                        <div className="mb-3">
                          <label className="form-label">Symptom:</label>
                          <input
                            type="text"
                            className={`form-control ${validationErrors.content ? 'is-invalid' : ''}`}
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default"
                            name="content"
                            onChange={handleCreateMedical}
                          />
                        </div>
                        {validationErrors.content && (
                          <span className="text-danger">This field is required</span>
                        )}
                      </div>
                      <div className="col-lg-3">
                        <div className="mb-3">
                          <label className="form-label">Prescribed medication	</label>
                          <textarea
                            type="text"
                            className={`form-control ${validationErrors.prescription ? 'is-invalid' : ''}`}
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default"
                            name="prescription"
                            onChange={handleCreateMedical}
                          ></textarea>
                        </div>
                        {validationErrors.prescription && (
                          <span className="text-danger">This field is required</span>
                        )}
                      </div>
                      <div className="col-lg-3">
                        <div className="input-group mb-3">
                          <span
                            onClick={showModal}
                            className="btn btn-primary" style={{ marginTop: '30px' }}>
                            Create
                          </span>

                          <Modal
                            title="Confirm Information"
                            visible={isModalVisible}
                            onOk={createMedical}
                            onCancel={handleCancel}
                            okButtonProps={{ disabled: isChecked }}
                          >
                            <p><strong>Disease name:</strong> {modalData.name}</p>
                            <p><strong>Symptom:</strong> {modalData.content}</p>
                            <p><strong>Prescribed medication:</strong> {modalData.prescription}</p>
                            <p>
                              {appointments[`${selectedSlot.startTime}-${selectedSlot.scheduledoctorId}`].map((appointment, index) => (
                                <p key={index}>
                                  <input
                                    type="checkbox"
                                    checked={appointment.status == "completed" ? "true" : "false"}
                                    onChange={(e) => {
                                      handleStatusChange(appointment.id, e.target.checked ? "completed" : "waiting")
                                      setIsChecked(e.target.checked);
                                    }}
                                  />&nbsp;Complated
                                </p>
                              ))}
                            </p>
                          </Modal>

                          <span
                            onClick={(e) => cancelCreate(e)}
                            className="btn btn-secondary" style={{ marginTop: '30px', marginLeft: '10px' }}>
                            Cancel
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="container-fluid mt-5">
                  {showHistory[patient.id] && medicalHistory[patient.id] && (
                    <div className='container'>
                      <div className="row">
                        <div className="col-lg-3">
                          <div className='text-center'>
                            <img src={"https://medical-appointment-booking-api-production.up.railway.app/images/patients/" + patient.image} alt="" width={'100px'} style={{ borderRadius: '5px' }} />
                          </div>
                          <div className='mt-3'>
                            <h3 className='text-center'>{patient.fullName}</h3>
                            <br />
                            <strong>Gender: </strong>{patient.gender}
                            <br />
                            <strong>Birthday: </strong>{dayjs(patient.birthday).format('DD/MM/YYYY')} ({calculateAge(patient.birthday)}Age)
                            <br />
                            <strong>Adress: </strong>{patient.address}
                          </div>
                        </div>
                        <div className="col-lg-9">
                          <h3>History</h3>
                          <hr />
                          <table className='table'>
                            <thead>
                              <tr>
                                <th>Disease name</th>
                                <th>Symptom</th>
                                <th>Prescribed medication</th>
                                <th>Day</th>
                              </tr>
                            </thead>
                            <tbody>
                              {medicalHistory[patient.id].map((record, index) => (
                                <tr key={index}>
                                  <td>{record.name}</td>
                                  <td>{record.content}</td>
                                  <td>{record.prescription}</td>
                                  {/* <td>{dayjs(record.createAt).format('DD/MM/YYYY')}</td> */}
                                  <td>{dayjs(record.dayCreate).format('DD/MM/YYYY')}</td>

                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Schedule;