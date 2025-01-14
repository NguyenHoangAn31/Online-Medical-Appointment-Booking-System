// eslint-disable-next-line no-unused-vars
import React, { useContext, useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { AlertContext } from '../../Layouts/DashBoard';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const EditWorking = ({ isOpen, data, doctorId, onClose }) => {
    const navigate = useNavigate();
    const { openNotificationWithIcon } = useContext(AlertContext);

    const [working, setWorking] = useState({
        id: '',
        startWork: '',
        endWork: '',
        company: '',
        address: '',
        status: 1,
        doctor_id: doctorId,
    });

    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        if (data) {
            setWorking(data);
        }
    }, [data]);

    const handleChangeWorking = (e) => {
        const { name, value } = e.target;
        setWorking({
            ...working,
            [name]: value
        });
        if (value.trim() !== '') {
            setValidationErrors({
                ...validationErrors,
                [name]: false
            });
        }
    };

    const validateForm = () => {
        const errors = {};
        let isValid = true;

        if (!working.startWork.trim()) {
            errors.startWork = true;
            isValid = false;
        }
        if (!working.endWork.trim()) {
            errors.endWork = true;
            isValid = false;
        }
        if (!working.company.trim()) {
            errors.company = true;
            isValid = false;
        }
        if (!working.address.trim()) {
            errors.address = true;
            isValid = false;
        }

        setValidationErrors(errors);
        return isValid;
    };

    const updateWorking = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            openNotificationWithIcon('danger', 'Please fill out all required fields', '');
            return;
        }
        try {
            const res = await axios.put('https://medical-appointment-booking-api-production.up.railway.app/api/working/update/' + working.id, working);
            openNotificationWithIcon('success', 'Edit Working Successfully', '');
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
            <Modal.Header closeButton>
                <Modal.Title>Edit Working</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className={`form-control ${validationErrors.id ? 'is-invalid' : ''}`}
                        name="id"
                        hidden={true}
                        value={working.id}
                        onChange={handleChangeWorking}
                    />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Start Work: </span>
                    <input
                        type="date"
                        className={`form-control ${validationErrors.startWork ? 'is-invalid' : ''}`}
                        name="startWork"
                        value={working.startWork}
                        onChange={handleChangeWorking}
                    />
                </div>
                {validationErrors.startWork && (
                    <span className="text-danger">This field is required</span>
                )}
                <div className="input-group mb-3">
                    <span className="input-group-text">End Work: </span>
                    <input
                        type="date"
                        className={`form-control ${validationErrors.endWork ? 'is-invalid' : ''}`}
                        name="endWork"
                        value={working.endWork}
                        onChange={handleChangeWorking}
                    />
                </div>
                {validationErrors.endWork && (
                    <span className="text-danger">This field is required</span>
                )}
                <div className="input-group mb-3">
                    <span className="input-group-text">Company: </span>
                    <input
                        type="text"
                        className={`form-control ${validationErrors.company ? 'is-invalid' : ''}`}
                        name="company"
                        value={working.company}
                        onChange={handleChangeWorking}
                    />
                </div>
                {validationErrors.company && (
                    <span className="text-danger">This field is required</span>
                )}
                <div className="input-group mb-3">
                    <span className="input-group-text">Address: </span>
                    <input
                        type="text"
                        className={`form-control ${validationErrors.address ? 'is-invalid' : ''}`}
                        name="address"
                        value={working.address}
                        onChange={handleChangeWorking}
                    />
                </div>
                {validationErrors.address && (
                    <span className="text-danger">This field is required</span>
                )}
                <input
                    type="hidden"
                    className="form-control"
                    name="doctor_id"
                    value={working.doctor_id}
                    onChange={handleChangeWorking}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={updateWorking}>
                    Save
                </Button>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditWorking;
