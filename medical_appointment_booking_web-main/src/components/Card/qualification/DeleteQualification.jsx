// eslint-disable-next-line no-unused-vars
import React, { useContext, useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { AlertContext } from '../../Layouts/DashBoard';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const DeleteQualification = ({ isOpen, data, onClose }) => {
    const navigate = useNavigate();
    const { openNotificationWithIcon } = useContext(AlertContext);

    const [qualification, setQualification] = useState({
        id: '',
        course: '',
        universityName: '',
        degreeName: '',
        status: 1,
        doctor_id: 0,
    });

    useEffect(() => {
        if (data) {
            setQualification(data);
        }
    }, [data]);

    const deleteQualification = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.delete('https://medical-appointment-booking-api-production.up.railway.app/api/qualification/delete/' + qualification.id, qualification);
            openNotificationWithIcon('success', 'Delete Qualification Successfully', '');
            navigate("/dashboard/doctor/profile");
            return res;
        } catch (error) {
            openNotificationWithIcon('danger', 'Failed to edit qualification', '');
        }
    };

    return (
        <Modal show={isOpen} onHide={onClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {/* <Modal.Header closeButton>
                <Modal.Title>Delete Working</Modal.Title>
            </Modal.Header> */}
            <Modal.Body>
                <p className='text-danger h5'>
                    You want to delete the following information
                </p>
                <table className='table'>
                    <tr className='m-3'>
                        <td>Course:</td>
                        <td>{qualification.course}</td>
                    </tr>
                    <tr>
                        <td>University Name: </td>
                        <td>{qualification.universityName}</td>
                    </tr>
                    <tr>
                        <td>Degree Name: </td>
                        <td>{qualification.degreeName}</td>
                    </tr>
                </table>
                <div className="float-end">
                    <Button variant="danger" onClick={deleteQualification}>
                        Yes
                    </Button>
                    &nbsp;&nbsp;
                    <Button variant="secondary" onClick={onClose}>
                        No
                    </Button>
                </div>
            </Modal.Body>
            {/* <Modal.Footer>
                <Button variant="primary" onClick={updateWorking}>
                    Save
                </Button>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer> */}
        </Modal>
    );
};

export default DeleteQualification;
