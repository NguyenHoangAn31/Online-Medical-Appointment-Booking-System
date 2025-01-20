// CreateWork.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { AlertContext } from '../../Layouts/DashBoard';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const CreateWorking = ({ isOpen, onClose, doctorId }) => {
    const navigate = useNavigate();
    const { openNotificationWithIcon } = useContext(AlertContext);

    const [newWork, setNewWork] = useState({
        startWork: '',
        endWork: '',
        company: '',
        address: '',
        status: 1,
        doctor_id: doctorId,
    });

    const [validationErrors, setValidationErrors] = useState({});

    const handleChangeNewWork = (e) => {
        const { name, value } = e.target;
        setNewWork({
            ...newWork,
            [name]: value
        });
        if (value.trim() !== '') {
            setValidationErrors({
                ...validationErrors,
                [name]: false
            });
        }
    };

    console.log(newWork);

    const validateForm = () => {
        const errors = {};
        let isValid = true;

        if (!newWork.startWork.trim()) {
            errors.startWork = true;
            isValid = false;
        }
        if (!newWork.endWork.trim()) {
            errors.endWork = true;
            isValid = false;
        }
        if (!newWork.company.trim()) {
            errors.company = true;
            isValid = false;
        }
        if (!newWork.address.trim()) {
            errors.address = true;
            isValid = false;
        }

        setValidationErrors(errors);
        return isValid;
    };

    const createNewWork = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            openNotificationWithIcon('danger', 'Please fill out all required fields', '');
            return;
        }
        try {
            const res = await axios.post('https://medical-appointment-booking-api-production.up.railway.app/api/working/create', newWork);
            openNotificationWithIcon('success', 'Create New Working Successfully', '');
            navigate("/dashboard/doctor/profile");
            onClose();
            return res;
        } catch (error) {
            openNotificationWithIcon('danger', 'Failed to create new working', '');
        }
    };

    return (
        <Modal show={isOpen} onHide={onClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Create New Working</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="input-group mb-3">
                    <span className="input-group-text">Start Work</span>
                    <input
                        type="date"
                        className={`form-control ${validationErrors.startWork ? 'is-invalid' : ''}`}
                        name="startWork"
                        value={newWork.startWork}
                        onChange={handleChangeNewWork}
                    />
                    {validationErrors.startWork && (
                        <span className="text-danger">This field is required</span>
                    )}
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">End Work</span>
                    <input
                        type="date"
                        className={`form-control ${validationErrors.endWork ? 'is-invalid' : ''}`}
                        name="endWork"
                        value={newWork.endWork}
                        onChange={handleChangeNewWork}
                    />
                    {validationErrors.endWork && (
                        <span className="text-danger">This field is required</span>
                    )}
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Company</span>
                    <input
                        type="text"
                        className={`form-control ${validationErrors.company ? 'is-invalid' : ''}`}
                        name="company"
                        value={newWork.company}
                        onChange={handleChangeNewWork}
                    />
                    {validationErrors.company && (
                        <span className="text-danger">This field is required</span>
                    )}
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Address</span>
                    <input
                        type="text"
                        className={`form-control ${validationErrors.address ? 'is-invalid' : ''}`}
                        name="address"
                        value={newWork.address}
                        onChange={handleChangeNewWork}
                    />
                    {validationErrors.address && (
                        <span className="text-danger">This field is required</span>
                    )}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={createNewWork}>
                    Save
                </Button>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateWorking;
