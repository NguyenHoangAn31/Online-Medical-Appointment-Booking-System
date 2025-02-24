import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DoctorItem from '../../components/Card/DoctorItem';

const Service = () => {
  const [services, setServices] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [activeServiceIndex, setActiveServiceIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadService = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://medical-appointment-booking-api-production.up.railway.app/api/department/all');
        setServices(response.data);

        if (response.data.length > 0) {
          setActiveServiceIndex(response.data[0].id); // Chọn dịch vụ đầu tiên
        }
      } catch (error) {
        setError('Không thể tải danh sách dịch vụ.');
        console.error('Error loading services', error);
      } finally {
        setLoading(false);
      }
    };

    loadService();
  }, []);

  useEffect(() => {
    if (activeServiceIndex !== null) {
      const loadDoctors = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`https://medical-appointment-booking-api-production.up.railway.app/api/doctor/related-doctor/${activeServiceIndex}`);
          setDoctors(response.data);
        } catch (error) {
          setError('Không thể tải danh sách bác sĩ.');
          console.error('Error loading doctors', error);
        } finally {
          setLoading(false);
        }
      };

      loadDoctors();
    }
  }, [activeServiceIndex]);

  const handleServiceClick = (service) => {
    setActiveServiceIndex(service.id);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          {error && <div className="alert alert-danger">{error}</div>}
          {loading && <div className="text-center">Đang tải dữ liệu...</div>}
          {!loading && services.length > 0 && (
            <>
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                {services.map((item) => (
                  <li className="nav-item" role="presentation" key={item.id}>
                    <button className={`nav-link ${activeServiceIndex === item.id ? 'active' : ''}`} 
                      id={`${item.name}-tab`} data-bs-toggle="tab" data-bs-target={`#${item.name}`}
                      type="button" role="tab" aria-controls={item.name} 
                      aria-selected={activeServiceIndex === item.id} 
                      onClick={() => handleServiceClick(item)}>
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="tab-content" id="myTabContent">
                {services.map((item) => (
                  <div className={`tab-pane fade ${activeServiceIndex === item.id ? 'show active' : ''}`} 
                    id={item.name} role="tabpanel" aria-labelledby={`${item.name}-tab`} key={item.id}>
                    <div className="row">
                      {loading ? (
                        <div className="text-center">Đang tải danh sách bác sĩ...</div>
                      ) : doctors.length > 0 ? (
                        doctors.map((doctor, index) => (
                          <div className="col-md-3" key={index}>
                            <DoctorItem item={doctor} />
                          </div>
                        ))
                      ) : (
                        <div className="col-md-12 text-center">Không có bác sĩ nào.</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Service;
