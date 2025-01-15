import { Content } from 'antd/es/layout/layout';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../components/Layouts/Client';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { signOut } from 'firebase/auth';

const Account = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [patient, setPatient] = useState({
    email: '',
    phone: '',
    fullName: '',
    image: '',
    gender: '',
    birthday: '',
    address: '',
  });
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [isAccount, setIsAccount] = useState(true);

  useEffect(() => {
    fetchDataPatient();
  }, [currentUser]);

  const fetchDataPatient = async () => {
    try {
      if (currentUser?.user.id) {
        try {
          const response = await axios.get(`https://medical-appointment-booking-api-production.up.railway.app/api/patient/getpatientdetail/${currentUser?.user.id}`);
          setPatient(response.data);
          setIsAccount(true)

        } catch (error) {
          setIsAccount(false)
        }


      } else {
        setError("No current user found");
      }
    } catch (error) {
      setError("Failed to fetch patient data");
    }
  }

  const onInputChangeForPatient = (name, value) => {
    setPatient(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const onInputChangeForPatientImage = (name, value) => {
    setImage(value)
  };

  const handleFormSubmit = async () => {
    try {
      const formData = new FormData()
      formData.append('image', image)
      formData.append('patient', JSON.stringify((patient)))


      await axios.put(`https://medical-appointment-booking-api-production.up.railway.app/api/patient/editpatient/${currentUser?.user.id}`, formData);
      alert("Changes successfully");
      fetchDataPatient();
      const checkToken = await axios.post('https://medical-appointment-booking-api-production.up.railway.app/api/auth/check-refresh-token', {
        username: currentUser.user.phone,
        provider: "phone"
      });
      setCurrentUser(checkToken.data)
    }
    catch (error) {
      alert("Error editing profile");
      console.log(error)
    }
  };

  const handleCreate = async () => {
    try {
      const formData = new FormData();
      patient.fullName = currentUser.user.fullName;
      formData.append('image', image);
      formData.append('patient', JSON.stringify((patient)));


      await axios.post(`https://medical-appointment-booking-api-production.up.railway.app/api/patient/create/${currentUser?.user.id}`, formData);
      fetchDataPatient();
      const checkToken = await axios.post('https://medical-appointment-booking-api-production.up.railway.app/api/auth/check-refresh-token', {
        username: currentUser.user.phone,
        provider: "phone"
      });
      setCurrentUser(checkToken.data)
    } catch (error) {
      alert("Error editing profile");
      console.log(error)
    }
  }

  return (
    <>
      <h1 className='text-center mb-5 '>Information</h1>
      <div className='d-flex gap-5' style={{ marginBottom: 125 }}>
        {isAccount ? <div className='w-50 text-center mt-2'>
          <img src={`https://medical-appointment-booking-api-production.up.railway.app/images/patients/${patient.image}`} alt="" className='img-fluid' />
          <h1 className='mt-3'>Name: {patient.fullName}</h1>
        </div> : null}


        <div className='w-50 m-auto'>

          {isAccount ? <><div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name='email'
              value={patient.email || ''}
              onChange={(e) => onInputChangeForPatient(e.target.name, e.target.value)}
            />
          </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                name='phone'
                value={patient.phone || ''}
                onChange={(e) => onInputChangeForPatient(e.target.name, e.target.value)}
              />
            </div><div className="mb-3">
              <label htmlFor="fullName" className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                name='fullName'
                value={patient.fullName || ''}
                onChange={(e) => onInputChangeForPatient(e.target.name, e.target.value)}
              />
            </div></> : null}



          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              name='address'
              value={patient.address || ''}
              onChange={(e) => onInputChangeForPatient(e.target.name, e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="birthday" className="form-label">Birthday</label>
            <input
              type="date"
              className="form-control"
              id="birthday"
              name='birthday'
              value={patient.birthday || ''}
              onChange={(e) => onInputChangeForPatient(e.target.name, e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="gender" className="form-label">Gender</label>
            <select
              className="form-control"
              id="gender"
              name="gender"
              value={patient.gender || ''}
              onChange={(e) => onInputChangeForPatient(e.target.name, e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="image" className="form-label">Image</label>
            <input
              type="file"
              className="form-control"
              id="image"
              name="image"
              title="image"
              onChange={(e) => onInputChangeForPatientImage(e.target.name, e.target.files[0])}
            />
          </div>


          <div className='text-end'>
            <button className="btn btn-primary" onClick={isAccount ? handleFormSubmit : handleCreate}>Save Change</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Account;
