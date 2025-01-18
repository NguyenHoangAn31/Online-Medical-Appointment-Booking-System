// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { AlertContext } from '../../Layouts/DashBoard';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line react/prop-types
const CreateQualification = ({ isOpen, onClose, doctorId }) => {
    const navigate = useNavigate();
    const { openNotificationWithIcon } = useContext(AlertContext);
    const [newQualification, setNewQualification] = useState({
        course: '',
        universityName: '',
        degreeName: '',
        status: 1,
        doctor_id: doctorId,
    });
    const [validationErrors, setValidationErrors] = useState({});
    const handleChangeNewQualification = (e) => {
        const { name, value } = e.target;
        setNewQualification({
            ...newQualification,
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
        if (!newQualification.course.trim()) {
            errors.course = true;
            isValid = false;
        }
        if (!newQualification.universityName.trim()) {
            errors.universityName = true;
            isValid = false;
        }
        if (!newQualification.degreeName.trim()) {
            errors.degreeName = true;
            isValid = false;
        }
        setValidationErrors(errors);
        return isValid;
    };
    const createNewQualification = async (e) => {
        console.log(newQualification);
        e.preventDefault();
        if (!validateForm()) {
            openNotificationWithIcon('danger', 'Please fill out all required fields', '');
            return;
        }
        try {
            const res = await axios.post('https://medical-appointment-booking-api-production.up.railway.app/api/qualification/create', newQualification);
            openNotificationWithIcon('success', 'Create New Qualification Successfully', '');
            navigate("/dashboard/doctor/profile");
            onClose();
            return res;
        } catch (error) {
            openNotificationWithIcon('danger', 'Failed to create new qualification', '');
        }
    };
    return (
        <Modal show={isOpen} onHide={onClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Create New Qualification</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="input-group mb-3">
                    <span className="input-group-text">Course</span>
                    <input
                        type="text"
                        className={`form-control ${validationErrors.course ? 'is-invalid' : ''}`}
                        name="course"
                        value={newQualification.course}
                        onChange={handleChangeNewQualification}
                    />
                    {validationErrors.course && (
                        <span className="text-danger">This field is required</span>
                    )}
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">University Name</span>
                    <input
                        type="text"
                        className={`form-control ${validationErrors.universityName ? 'is-invalid' : ''}`}
                        name="universityName"
                        value={newQualification.universityName}
                        onChange={handleChangeNewQualification}
                    />
                    {validationErrors.universityName && (
                        <span className="text-danger">This field is required</span>
                    )}
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Degree Name</span>
                    <input
                        type="text"
                        className={`form-control ${validationErrors.degreeName ? 'is-invalid' : ''}`}
                        name="degreeName"
                        value={newQualification.degreeName}
                        onChange={handleChangeNewQualification}
                    />
                    {validationErrors.degreeName && (
                        <span className="text-danger">This field is required</span>
                    )}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={createNewQualification}>
                    Save
                </Button>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateQualification;