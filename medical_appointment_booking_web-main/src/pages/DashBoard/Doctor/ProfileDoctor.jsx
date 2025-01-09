// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
// import moment from 'moment';
// eslint-disable-next-line no-unused-vars
// import getUserData from '../../../route/CheckRouters/token/Token'
import { AlertContext } from '../../../components/Layouts/DashBoard';
function ProfileDoctor() {
  const [doctor, setDoctor] = useState(null);


  const { currentUser } = useContext(AlertContext)
  console.log("id of currentUser : ", currentUser.user.id)
  // const id = getUserData.user.id; // cái này là user_id
  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await axios.get(`https://medical-appointment-booking-api-production.up.railway.app/api/doctor/findbyuserid/${currentUser.user.id}`); // cái này là tìm doctor theo id chứ k phải tìm theo user_id
        const doctorData = response.data;
        console.log(doctorData);
        setDoctor(doctorData);
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    };
    fetchDoctorData();
  }, [currentUser]);

  if (!doctor) {
    return <div>Loading...</div>;
  }


  // const formattedBirthday = moment(doctor.birthday).format('DD/MM/YYYY');

  return (
    <div className='container-fluid bg-white p-5 rounded-4'>
      <div className="row">
        <div className="col-md-6 d-flex justify-content-center">
          <img
            src={"https://medical-appointment-booking-api-production.up.railway.app/images/doctors/" + doctor.image}
            alt="{doctor.image}"
            className="doctor__profile_image"
          />
        </div>
        <div className="col-md-6">
          <h1>{doctor.title} {doctor.fullName}</h1>
          <hr />
          <p>
            {/* chuyển này về định dạng localDate */}
            <strong>Birthday: </strong>
            {doctor.birthday}
            {/* {doctor.birthday && <span>{doctor.birthday[2]}/{doctor.birthday[1]}/{doctor.birthday[0]}</span>} */}
          </p>
          <p>
            <strong>Address: </strong>
            {doctor.address}
          </p>
          <hr />
          <p>
            <strong>Email: </strong>
            {currentUser.user.email}
          </p>
          <p>
            <strong>Phone: </strong>
            {currentUser.user.phone}
          </p>
          <hr />
          <p>
            <strong>Working:</strong>
            <p></p>
            <ul>
              {Array.isArray(doctor.workings) && doctor.workings.map((working, index) => {
                const startWorkYear = working.startWork.split('-')[0];
                const endWorkYear = working.endWork.split('-')[0];
                return (
                  <li key={index}>
                    <p>
                      <strong>{startWorkYear} - {endWorkYear}: </strong>
                      {working.company}
                    </p>
                  </li>
                );
              })}
            </ul>
          </p>
        </div>
      </div>
      <div className='row text-center mt-5'>
        <Link style={{ marginRight: '16px', color: 'blue' }}
          to={`/dashboard/doctor/edit/${currentUser.user.id}`}>
          <Button type="primary" icon={<EditOutlined />} >
            Edit
          </Button>
        </Link>
      </div>
    </div>
  )
}
export default ProfileDoctor