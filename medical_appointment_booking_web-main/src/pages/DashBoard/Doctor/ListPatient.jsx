/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { AlertContext } from '../../../components/Layouts/DashBoard';

const ListPatient = () => {
    const { currentUser } = useContext(AlertContext);
    const doctorId = currentUser.user.id;

    // State để lưu trữ danh sách bệnh nhân
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Sử dụng useEffect để thực hiện truy vấn API khi component được mount
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://medical-appointment-booking-api-production.up.railway.app/api/patient/patientsbydoctoridandfinishedstatus/${doctorId}`);
                setPatients(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPatients();
    }, [doctorId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>List of Patients</h1>
            {patients.length === 0 ? (
                <p>No patients found</p>
            ) : (
                <table className='table align-middle'>
                    <thead>
                        <tr>
                            <th>Avatar</th>
                            <th>Full Name</th>
                            <th>Gender</th>
                            <th>Birthday</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((patient) => (
                            <tr key={patient.id}>
                                <td>
                                    <img
                                        src={"https://medical-appointment-booking-api-production.up.railway.app/images/patients/" + patient.image}
                                        alt={patient.image}
                                        style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                                    />
                                </td>
                                <td>{patient.fullName}</td>
                                <td>{patient.gender}</td>
                                <td>{dayjs(patient.birthday).format('DD/MM/YYYY')}</td>
                                <td>{patient.address}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ListPatient;
