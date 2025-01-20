// eslint-disable-next-line no-unused-vars
import React, { useContext, useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { AlertContext } from '../../Layouts/DashBoard';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const DeleteWorking = ({ isOpen, data, onClose }) => {
    const navigate = useNavigate();
    const { openNotificationWithIcon } = useContext(AlertContext);

    const [working, setWorking] = useState({
        id: '',
        startWork: '',
        endWork: '',
        company: '',
        address: '',
        status: 1,
        doctor_id: 0,
    });

    useEffect(() => {
        if (data) {
            setWorking(data);
        }
    }, [data]);

    const deleteWorking = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.delete('https://medical-appointment-booking-api-production.up.railway.app/api/working/delete/' + working.id, working);
            openNotificationWithIcon('success', 'Delete Working Successfully', '');
            navigate("/dashboard/doctor/profile");
            return res;
        } catch (error) {
            openNotificationWithIcon('danger', 'Failed to edit working', '');
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
                        <td>Start Work:</td>
                        <td>{working.startWork}</td>
                    </tr>
                    <tr>
                        <td>End Work: </td>
                        <td>{working.endWork}</td>
                    </tr>
                    <tr>
                        <td>Company: </td>
                        <td>{working.company}</td>
                    </tr>
                    <tr>
                        <td>Address:</td>
                        <td>{working.address}</td>
                    </tr>
                </table>
                <div className="float-end">
                    <Button variant="danger" onClick={deleteWorking}>
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

export default DeleteWorking;
