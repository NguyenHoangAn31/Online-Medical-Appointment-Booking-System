/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { AlertContext } from '../../../components/Layouts/DashBoard';

const ListPatient = () => {
    const { currentUser } = useContext(AlertContext);
    const doctorId = currentUser?.user?.id;

    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `https://medical-appointment-booking-api-production.up.railway.app/api/patient/patientsbydoctoridandfinishedstatus/${doctorId}`
                );
                setPatients(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (doctorId) {
            fetchPatients();
        }
    }, [doctorId]);

    const filteredPatients = patients.filter((patient) =>
        patient.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastPatient = currentPage * itemsPerPage;
    const indexOfFirstPatient = indexOfLastPatient - itemsPerPage;
    const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);

    return (
        <div className="container mt-4">
            <h2 className="mb-3">List of Patients</h2>
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {loading ? (
                <div className="text-center"><span className="spinner-border"></span> Loading...</div>
            ) : error ? (
                <p className="text-danger">Error: {error}</p>
            ) : patients.length === 0 ? (
                <p className="text-muted">No patients found</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th>Avatar</th>
                                <th>Full Name</th>
                                <th>Gender</th>
                                <th>Birthday</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPatients.map((patient) => (
                                <tr key={patient.id}>
                                    <td>
                                        <img
                                            src={`https://medical-appointment-booking-api-production.up.railway.app/images/patients/${patient.image}`}
                                            alt={patient.fullName}
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
                </div>
            )}

            <div className="d-flex justify-content-between">
                <button
                    className="btn btn-primary"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Previous
                </button>
                <span>Page {currentPage}</span>
                <button
                    className="btn btn-primary"
                    disabled={indexOfLastPatient >= filteredPatients.length}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ListPatient;