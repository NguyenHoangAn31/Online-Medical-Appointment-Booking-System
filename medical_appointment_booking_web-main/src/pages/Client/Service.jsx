import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DoctorItem from '../../components/Card/DoctorItem';

const Service = () => {
  const [services, setServices] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [activeServiceIndex, setActiveServiceIndex] = useState(null);


  useEffect(() => {
    const loadService = async () => {
      try {
        const response = await axios.get('https://medical-appointment-booking-api-production.up.railway.app/api/department/all');
        setServices(response.data);

        if (response.data.length > 0) {
          const defaultService = response.data[0]; // Set the first service as the default
          setActiveServiceIndex(defaultService.id);
        }
      } catch (error) {
        console.error('Error loading services', error);
      }
    };

    loadService();
  }, []);

  useEffect(() => {
    if (activeServiceIndex !== null) {
      const loadDoctors = async () => {
        try {
          const response = await axios.get(`https://medical-appointment-booking-api-production.up.railway.app/api/doctor/related-doctor/${activeServiceIndex}`);
          setDoctors(response.data);
        } catch (error) {
          console.error('Error loading doctors', error);
        }
      };

      loadDoctors();
    }
  }, [activeServiceIndex]);

  const handleServiceClick = async (service) => {
    //setService(service);
    setActiveServiceIndex(service.id);
  }
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            {services.map((item) => (
              <li className="nav-item" role="presentation" key={item.id}>
                <button className={`nav-link ${activeServiceIndex === item.id ? 'active' : ''}`} id={`${item.name}-tab`} data-bs-toggle="tab" data-bs-target={`#${item.name}`}
                  type="button" role="tab" aria-controls={`${item.name}`} aria-selected={`${activeServiceIndex === item.id ? 'true' : 'false'}`}
                  onClick={() => handleServiceClick(item)}
                >{item.name}</button>
              </li>
            ))}
          </ul>
          <div className="tab-content" id="myTabContent">
            {services.map((item) => (
              <div className={`tab-pane fade ${activeServiceIndex === item.id ? 'show active' : ''}`} id={`${item.name}`} role="tabpanel" aria-labelledby={`${item.name}-tab`} key={item.id}>
                <div className="row">
                  {doctors && doctors.length > 0 ? (
                    doctors.map((doctor, index) => (
                      <div className="col-md-3" key={index}>
                        <DoctorItem item={doctor} />
                      </div>
                    ))
                  )
                    :
                    (
                      <div>Không có bác sỹ nào </div>
                    )
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Service