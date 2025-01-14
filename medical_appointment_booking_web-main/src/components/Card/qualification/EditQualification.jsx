// eslint-disable-next-line no-unused-vars
import React, { useContext, useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { AlertContext } from '../../Layouts/DashBoard';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const EditQualification = ({ isOpen, data, doctorId, onClose }) => {
    const navigate = useNavigate();
    const { openNotificationWithIcon } = useContext(AlertContext);

    const [qualification, setQualification] = useState({
        id: '',
        course: '',
        universityName: '',
        degreeName: '',
        status: 1,
        doctor_id: doctorId,
    });

    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        if (data) {
            setQualification(data);
        }
    }, [data]);

    const handleChangeQualification = (e) => {
        const { name, value } = e.target;
        setQualification({
            ...qualification,
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

        if (!qualification.course.trim()) {
            errors.course = true;
            isValid = false;
        }
        if (!qualification.universityName.trim()) {
            errors.universityName = true;
            isValid = false;
        }
        if (!qualification.degreeName.trim()) {
            errors.degreeName = true;
            isValid = false;
        }

        setValidationErrors(errors);
        return isValid;
    };

    const updateQualification = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            openNotificationWithIcon('danger', 'Please fill out all required fields', '');
            return;
        }
        try {
            const res = await axios.put('https://medical-appointment-booking-api-production.up.railway.app/api/qualification/update/' + qualification.id, qualification);
            openNotificationWithIcon('success', 'Edit Qualification Successfully', '');
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
            <Modal.Header closeButton>
                <Modal.Title>Edit Qualification</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className={`form-control ${validationErrors.id ? 'is-invalid' : ''}`}
                        name="id"
                        hidden={true}
                        value={qualification.id}
                        onChange={handleChangeQualification}
                    />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Course: </span>
                    <input
                        type="text"
                        className={`form-control ${validationErrors.course ? 'is-invalid' : ''}`}
                        name="course"
                        value={qualification.course}
                        onChange={handleChangeQualification}
                    />
                </div>
                {validationErrors.course && (
                    <span className="text-danger">This field is required</span>
                )}
                <div className="input-group mb-3">
                    <span className="input-group-text">University Name: </span>
                    <input
                        type="text"
                        className={`form-control ${validationErrors.universityName ? 'is-invalid' : ''}`}
                        name="universityName"
                        value={qualification.universityName}
                        onChange={handleChangeQualification}
                    />
                </div>
                {validationErrors.universityName && (
                    <span className="text-danger">This field is required</span>
                )}
                <div className="input-group mb-3">
                    <span className="input-group-text">Degree Name: </span>
                    <input
                        type="text"
                        className={`form-control ${validationErrors.degreeName ? 'is-invalid' : ''}`}
                        name="degreeName"
                        value={qualification.degreeName}
                        onChange={handleChangeQualification}
                    />
                </div>
                {validationErrors.degreeName && (
                    <span className="text-danger">This field is required</span>
                )}
                <input
                    type="hidden"
                    className="form-control"
                    name="doctor_id"
                    value={qualification.doctor_id}
                    onChange={handleChangeQualification}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={updateQualification}>
                    Save
                </Button>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditQualification;
