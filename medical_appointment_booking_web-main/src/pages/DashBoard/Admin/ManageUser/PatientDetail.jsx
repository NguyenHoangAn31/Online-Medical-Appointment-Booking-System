import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { getPatientByPatientId, getPatientByUserId } from '../../../../services/API/patientService';
import { findUserById } from '../../../../services/API/userService';
import { Input, Switch } from 'antd';
import { changeStatus } from '../../../../services/API/changeStatus';
import { AlertContext } from '../../../../components/Layouts/DashBoard';
import Spinner from '../../../../components/Spinner';
import { formatDateFromArray } from '../../../../ultils/formatDate';

function PatientDetail() {

  const [imageDefault, setImageDefault] = useState(false);
  const [user, setUser] = useState({});
  const [patient, setPatient] = useState({});
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { openNotificationWithIcon } = useContext(AlertContext);
  const id = queryParams.get("id");

  useEffect(() => {
    loadUser();
    loadPatient();
  }, []);

  const loadUser = async () => {
    setUser(await findUserById(id));
  };
  const loadPatient = async () => {
    try {
      const patientData = await getPatientByUserId(id);
      if (patientData) {
        setPatient(patientData);
      }
    } catch (error) {
      console.log("first")
      setImageDefault(true);
    }

  };


  const handlechangeStatus = async (id, status) => {
    try {
      await changeStatus('user', id, status);
      openNotificationWithIcon('success', 'Change Status Patient Successfully', '')
      loadUser();
    } catch (error) {
      openNotificationWithIcon('error', 'Something Went Wrong', '')
      console.log(error)
    }

  };

  return (
    !Object.keys(user).length != 0 ? <Spinner /> :
      <div className='patient_detail_dashboard'>
        <div className='position-absolute' style={{ right: 30 }}>
          <span className='d-inline-block pe-2'>Status</span>
          {user.status ? <Switch
            defaultChecked
            onChange={() => handlechangeStatus(id, user.status)}
          /> : <Switch
            onChange={() => handlechangeStatus(id, user.status)}
          />}
        </div>
        <div className='patient_info' style={{ display: 'flex', width: '90%', margin: 'auto', gap: '40px' }}>

          <div className='patient_image_dashboard' style={{ maxWidth: 350, margin: 'auto' }}>
            {!Object.keys(patient).length == 0 && patient.image != null ? <img src={"https://medical-appointment-booking-api-production.up.railway.app/images/patients/" + patient.image} style={{ width: '100%', backgroundImage: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)" }} /> : null}
            {imageDefault ? <img src="/images/login_default.jpg" width='350' /> : null}
            <div className='text-center mt-3 mx-auto' style={{ width: '85%' }}>
              <p style={{ fontSize: '33', fontWeight: '700' }}>{user.fullName}</p>
            </div>
          </div>


          <div className='info_detail' style={{ width: '60%', marginTop: 25 }}>

            <div className='mb-3' style={{ clear: 'both' }}>
              <label className='mb-1' style={{ fontWeight: 700 }}>Email</label>
              <Input value={user.email} />
            </div>
            <div className='mb-3'>
              <label className='mb-1' style={{ fontWeight: 700 }}>Phone</label>
              <Input value={user.phone} />
            </div>
            <div className='mb-3'>
              <label className='mb-1' style={{ fontWeight: 700 }}>Full Name</label>
              <Input value={user.fullName} />
            </div>


            <div>
              <div className='mb-3'>
                <label className='mb-1' style={{ fontWeight: 700 }}>Address</label>
                <Input value={patient.address !== null ? patient.address : ''} />
              </div>
              <div className='mb-3'>
                <label className='mb-1' style={{ fontWeight: 700 }}>Birthday</label>
                <Input value={patient.birthday !== null ? formatDateFromArray(patient.birthday) : ''} />
              </div>
              {
                !Object.keys(patient).length != 0 ? null :
                  <div>
                    <span className='fs-3 d-block mb-3' style={{ fontWeight: 700 }}>Medicals</span>
                    {patient.medicals.map((value, index) => (
                      <div key={index}>
                        <ul>
                          <li>{value.name} ({value.content})</li>
                        </ul>

                      </div>
                    ))}
                  </div>
              }

            </div>
          </div>

        </div>



      </div>
  )
}

export default PatientDetail