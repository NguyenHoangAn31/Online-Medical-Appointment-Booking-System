import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import getUserData from '../../route/CheckRouters/token/Token'
import { FaEye } from "react-icons/fa";
import { UserContext } from '../../components/Layouts/Client';

const BookingInProfile = () => {
  const { currentUser } = useContext(UserContext);
  const [activeServiceIndex, setActiveServiceIndex] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [patient, setPatient] = useState([]);
  const [patientId, setPatientId] = useState();
  const appointTitle = [
    { id: 1, name: "waiting" },
    { id: 2, name: "completed" },
    { id: 3, name: "cancelled" }
  ];
  const [appointStatus, setAppointStatus] = useState(appointTitle);
  useEffect(() => {
    const loadService = async () => {
      setActiveServiceIndex(1);
    };

    loadService();
    fetchApi();
    fetchAppointmentInit(patientId);
  }, [patientId]);
  const fetchApi = async () => {
    try {
      if (getUserData() != null) {
        const result = await axios.get(`https://medical-appointment-booking-api-production.up.railway.app/api/patient/${getUserData().user.id}`);
        setPatient(result.data);
        setPatientId(result.data.id);
      }
    } catch (error) {
    }
  }
  const fetchAppointmentInit = async (patientId) => {
    //const patientId = patientId;
    console.log(patientId);
    const status = 'waiting'
    try {
      const response = await axios.get(`https://medical-appointment-booking-api-production.up.railway.app/api/appointment/appointment-schedule-patientId-and-status/${patientId}/${status}`);
      setAppointments(response.data);
    } catch (error) {
    }
  }

  const handleStatusClick = async (service, patient) => {
    setActiveServiceIndex(service.id);
    try {
      const response = await axios.get(`https://medical-appointment-booking-api-production.up.railway.app/api/appointment/appointment-schedule-patientId-and-status/${patient.id}/${service.name}`)
      setAppointments(response.data);
    } catch (error) {

    }

  }

  return (
    <div className='row'>
      <div className="col-12">
        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
          {appointStatus.map((item) => (
            <li className="nav-item me-3" role="presentation" key={item.id}>
              <button
                className={`nav-link ${activeServiceIndex === item.id ? 'active' : ''} text-uppercase`}
                id={`pills${item.name}-tab`}
                data-bs-toggle="pill"
                data-bs-target={`#pill-${item.name}`}
                type="button"
                role="tab"
                aria-controls={`${item.name}`}
                aria-selected={`${activeServiceIndex === item.id ? 'true' : 'false'}`}
                onClick={() => handleStatusClick(item, patient)}
              >{item.name}</button>
            </li>
          ))}

        </ul>

        <div className="tab-content" id="pills-tabContent">
          {appointStatus.map((item) => (
            <div className={`tab-pane fade ${activeServiceIndex === item.id ? 'show active' : ''}`} id={`pills-${item.name}`} role="tabpanel" aria-labelledby={`pills-${item.name}-tab`} key={item.id}>
              <div className="row">
                <div className="col-12" >
                  {appointments && appointments.length > 0 ? (
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Ngày khám</th>
                          <th scope="col">Giờ khám</th>
                          <th scope="col">Bác sỹ khám</th>
                          <th scope="col">Khoa khám</th>
                          <th scope="col">Triệu chứng bệnh</th>
                          <th scope="col">Trạng thái</th>
                          <th scope="col">Hành động</th>
                        </tr>
                      </thead>
                      <tbody>
                        {appointments.map((appointment, index) => (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{appointment.medicalExaminationDay}</td>
                            <td>{appointment.clinicHours}</td>
                            <td>{appointment.fullName}</td>
                            <td>{appointment.departmentName}</td>
                            <td>{appointment.note}</td>
                            <td>{appointment.status}</td>
                            <td>
                              <a href="#" className='text-text-decoration-noner'><FaEye /> view </a>
                            </td>
                          </tr>

                        ))}
                      </tbody>
                    </table>
                  )
                    :
                    (
                      <div>Không có lịch book nào</div>
                    )
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BookingInProfile
