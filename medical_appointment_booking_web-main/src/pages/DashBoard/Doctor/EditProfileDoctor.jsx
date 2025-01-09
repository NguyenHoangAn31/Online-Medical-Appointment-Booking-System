// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { AlertContext } from '../../../components/Layouts/DashBoard';
import { detailDoctor } from '../../../services/API/doctorService';
// import getUserData from '../../../route/CheckRouters/token/Token';
import axios from 'axios';
import EditWorking from '../../../components/Card/working/EditWorking';
import CreateWorking from '../../../components/Card/working/CreateWorking';
import DeleteWorking from '../../../components/Card/working/DeleteWorking';
import EditQualification from '../../../components/Card/qualification/EditQualification';
import CreateQualification from '../../../components/Card/qualification/CreateQualification';
import DeleteQualification from '../../../components/Card/qualification/DeleteQualification';

const EditProfileDoctor = () => {
    const { id } = useParams();
    // const { currentUser } = useContext(AlertContext);
    // const user_id = getUserData.user.id;
    // const id = currentUser.user.id;
    // console.log(id);
    const user_id = id;
    const status = 1;

    const navigate = useNavigate();
    const { openNotificationWithIcon } = useContext(AlertContext);

    const [isCreateWorkingModalOpen, setIsCreateWorkingModalOpen] = useState(false);
    const [isEditWorkingModalOpen, setIsEditWorkingModalOpen] = useState(false);
    const [isDeleteWorkingModalOpen, setIsDeleteWorkingModalOpen] = useState(false);

    const [isCreateQualificationModalOpen, setIsCreateQualificationModalOpen] = useState(false);
    const [isEditQualificationModalOpen, setIsEditQualificationModalOpen] = useState(false);
    const [isDeleteQualificationModalOpen, setIsDeleteQualificationModalOpen] = useState(false);

    const [workings, setWorkings] = useState([]);
    const [dataWork, setDataWork] = useState(null);

    const [qualifications, setQualifications] = useState([]);
    const [dataQualification, setDataQualification] = useState(null);

    const [doctor, setDoctor] = useState({
        id: id,
        title: '',
        fullName: '',
        gender: '',
        birthday: '',
        address: '',
        price: '',
        image: '',
        biography: '',
        status: status,
        user_id: user_id
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        loadDoctor();
    }, []);

    const loadDoctor = async () => {
        const result = await detailDoctor(id);
        setWorkings(result.workings);
        setQualifications(result.qualifications);
        setDoctor(result);
        // console.log(result);
    };

    const handleChangeProfile = (e) => {
        const { name, value } = e.target;
        setDoctor({
            ...doctor,
            [name]: value
        });

        // Validate input fields
        let errorMessages = {};

        if (name === 'title' && value.trim() === '') {
            errorMessages.title = 'Title is required';
        }
        if (name === 'fullName' && value.trim() === '') {
            errorMessages.fullName = 'Full Name is required';
        }
        if (name === 'gender' && value.trim() === '') {
            errorMessages.gender = 'Gender is required';
        }
        if (name === 'birthday' && value.trim() === '') {
            errorMessages.birthday = 'Birthday is required';
        }
        if (name === 'address' && value.trim() === '') {
            errorMessages.address = 'Address is required';
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            ...errorMessages
        }));
    };

    const updateDoctor = async (e) => {
        e.preventDefault();

        // Validate form before submission
        let formErrors = {};

        if (doctor.title.trim() === '') {
            formErrors.title = 'Title is required';
        }
        if (doctor.fullName.trim() === '') {
            formErrors.fullName = 'Full Name is required';
        }
        if (doctor.gender.trim() === '') {
            formErrors.gender = 'Gender is required';
        }
        if (doctor.birthday.trim() === '') {
            formErrors.birthday = 'Birthday is required';
        }
        if (doctor.address.trim() === '') {
            formErrors.address = 'Address is required';
        }

        setErrors(formErrors);

        if (Object.keys(formErrors).length > 0) {
            return; // Prevent form submission if there are errors
        }

        try {
            const res = await axios.put('https://medical-appointment-booking-api-production.up.railway.app/api/doctor/update/' + id, doctor);
            openNotificationWithIcon('success', 'Edit Profile Doctor Successfully', '');
            navigate("/dashboard/doctor/profile");
            return res;
        } catch (error) {
            openNotificationWithIcon('error', 'Failed to update profile', '');
        }
    };

    const handleCreateWorking = () => {
        setIsCreateWorkingModalOpen(true);
    };

    const handleEditWorking = async (id) => {
        try {
            const result = await axios.get('https://medical-appointment-booking-api-production.up.railway.app/api/working/' + id);
            const newWorking = {
                id: result.data.id,
                startWork: result.data.startWork,
                endWork: result.data.endWork,
                company: result.data.company,
                address: result.data.address,
                status: result.data.status,
                doctor_id: result.data.doctor_id,
            }
            setDataWork(newWorking);
            setIsEditWorkingModalOpen(true);
        } catch (error) { /* empty */ }
    };

    const handleDeleteWorking = async (id) => {
        try {
            const result = await axios.get('https://medical-appointment-booking-api-production.up.railway.app/api/working/' + id);
            const deleteWorking = {
                id: result.data.id,
                startWork: result.data.startWork,
                endWork: result.data.endWork,
                company: result.data.company,
                address: result.data.address,
                status: result.data.status,
                doctor_id: result.data.doctor_id,
            }
            setDataWork(deleteWorking);
            setIsDeleteWorkingModalOpen(true);
        } catch (error) { /* empty */ }
    };

    const handleCreateQualification = () => {
        setIsCreateQualificationModalOpen(true);
    };

    const handleEditQualification = async (id) => {
        try {
            const result = await axios.get('https://medical-appointment-booking-api-production.up.railway.app/api/qualification/' + id);
            const newQualification = {
                id: result.data.id,
                course: result.data.course,
                universityName: result.data.universityName,
                degreeName: result.data.degreeName,
                status: result.data.status,
                doctor_id: result.data.doctor_id,
            }
            setDataQualification(newQualification);
            setIsEditQualificationModalOpen(true);
        } catch (error) { /* empty */ }
    };

    const handleDeleteQualification = async (id) => {
        try {
            const result = await axios.get('https://medical-appointment-booking-api-production.up.railway.app/api/qualification/' + id);
            const deleteQualification = {
                id: result.data.id,
                course: result.data.course,
                universityName: result.data.universityName,
                degreeName: result.data.degreeName,
                status: result.data.status,
                doctor_id: result.data.doctor_id,
            }
            setDataQualification(deleteQualification);
            setIsDeleteQualificationModalOpen(true);
        } catch (error) { /* empty */ }
    };

    return (
        <>
            <div className="container">
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button className="nav-link active" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="true">Profile</button>
                        <button className="nav-link" id="nav-working-tab" data-bs-toggle="tab" data-bs-target="#nav-working" type="button" role="tab" aria-controls="nav-working" aria-selected="false">Working</button>
                        <button className="nav-link" id="nav-qualification-tab" data-bs-toggle="tab" data-bs-target="#nav-qualification" type="button" role="tab" aria-controls="nav-qualification" aria-selected="false">Qualification</button>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane pt-3 fade show active" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex="0">
                        <div className="row">
                            <div className="col-md-3"></div>
                            <div className="col-md-6">
                                <div className="input-group mb-3">
                                    <input
                                        type="hidden"
                                        className="form-control"
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-default"
                                        name="id"
                                        value={doctor.id}
                                        onChange={(e) => handleChangeProfile(e)}
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Title</span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-default"
                                        name="title"
                                        value={doctor.title}
                                        onChange={(e) => handleChangeProfile(e)}
                                    />
                                </div>
                                {errors.title && <div className="text-danger">{errors.title}</div>}
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Full Name</span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-default"
                                        name="fullName"
                                        value={doctor.fullName}
                                        onChange={(e) => handleChangeProfile(e)}
                                    />
                                </div>
                                {errors.fullName && <div className="text-danger">{errors.fullName}</div>}
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Gender</span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-default"
                                        name="gender"
                                        value={doctor.gender}
                                        onChange={(e) => handleChangeProfile(e)}
                                    />
                                </div>
                                {errors.gender && <div className="text-danger">{errors.gender}</div>}
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Birthday</span>
                                    <input
                                        type="date"
                                        className="form-control"
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-default"
                                        name="birthday"
                                        value={doctor.birthday}
                                        onChange={(e) => handleChangeProfile(e)}
                                    />
                                </div>
                                {errors.birthday && <div className="text-danger">{errors.birthday}</div>}
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Address</span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-default"
                                        name="address"
                                        value={doctor.address}
                                        onChange={(e) => handleChangeProfile(e)}
                                    />
                                </div>
                                {errors.address && <div className="text-danger">{errors.address}</div>}
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Price</span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-default"
                                        name="price"
                                        value={doctor.price}
                                        onChange={(e) => handleChangeProfile(e)}
                                        disabled
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <button
                                        onClick={updateDoctor}
                                        className="btn btn-primary w-100">
                                        Update
                                    </button>
                                </div>
                            </div>
                            <div className="col-md-3"></div>
                        </div>
                    </div>

                    <div className="tab-pane pt-3 fade" id="nav-working" role="tabpanel" aria-labelledby="nav-working-tab" tabIndex="0">
                        <div className='mb-3 d-flex justify-content-end'>
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                style={{ backgroundColor: '#52c41a' }}
                                onClick={handleCreateWorking}
                            >
                                Add New Working
                            </Button>
                        </div>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Start Work</th>
                                    <th>End Work</th>
                                    <th>Company</th>
                                    <th>Address</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {workings && workings.map((working, index) => (
                                    <tr key={index}>
                                        <td>
                                            {index + 1}
                                        </td>
                                        <td>
                                            {working.startWork}
                                        </td>
                                        <td>
                                            {working.endWork}
                                        </td>
                                        <td>
                                            {working.company}
                                        </td>
                                        <td>
                                            {working.address}
                                        </td>
                                        <td>
                                            <Button
                                                type="submit"
                                                icon={<EditOutlined />}
                                                style={{ backgroundColor: 'orange' }}
                                                onClick={() => handleEditWorking(
                                                    working.id
                                                )}
                                            >
                                            </Button>
                                            &nbsp;
                                            <Button
                                                type="primary"
                                                icon={<DeleteOutlined />}
                                                style={{ backgroundColor: 'red' }}
                                                onClick={() => handleDeleteWorking(
                                                    working.id
                                                )}
                                            >
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="tab-pane pt-3 fade" id="nav-qualification" role="tabpanel" aria-labelledby="nav-qualification-tab" tabIndex="0">
                        <div className='mb-3 d-flex justify-content-end'>
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                style={{ backgroundColor: '#52c41a' }}
                                onClick={handleCreateQualification}
                            >
                                Add New Qualification
                            </Button>
                        </div>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Course</th>
                                    <th>University Name</th>
                                    <th>Degree Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {qualifications && qualifications.map((qualification, index) => (
                                    <tr key={index} >
                                        <td>
                                            {index + 1}
                                        </td>
                                        <td>
                                            {qualification.course}
                                        </td>
                                        <td>
                                            {qualification.universityName}
                                        </td>
                                        <td>
                                            {qualification.degreeName}
                                        </td>
                                        <td>
                                            <Button
                                                type="submit"
                                                icon={<EditOutlined />}
                                                style={{ backgroundColor: 'orange' }}
                                                onClick={() => handleEditQualification(
                                                    qualification.id
                                                )}
                                            >
                                            </Button>
                                            &nbsp;
                                            <Button
                                                type="primary"
                                                icon={<DeleteOutlined />}
                                                style={{ backgroundColor: 'red' }}
                                                onClick={() => handleDeleteQualification(
                                                    qualification.id
                                                )}
                                            >
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
            {isEditWorkingModalOpen && <EditWorking data={dataWork} isOpen={isEditWorkingModalOpen} onClose={() => setIsEditWorkingModalOpen(false)} doctorId={doctor.id} />}
            {isCreateWorkingModalOpen && <CreateWorking isOpen={isCreateWorkingModalOpen} onClose={() => setIsCreateWorkingModalOpen(false)} doctorId={doctor.id} />}
            {isDeleteWorkingModalOpen && <DeleteWorking data={dataWork} isOpen={isDeleteWorkingModalOpen} onClose={() => setIsDeleteWorkingModalOpen(false)} />}

            {isEditQualificationModalOpen && <EditQualification data={dataQualification} isOpen={isEditQualificationModalOpen} onClose={() => setIsEditQualificationModalOpen(false)} doctorId={doctor.id} />}
            {isCreateQualificationModalOpen && <CreateQualification isOpen={isCreateQualificationModalOpen} onClose={() => setIsCreateQualificationModalOpen(false)} doctorId={doctor.id} />}
            {isDeleteQualificationModalOpen && <DeleteQualification data={dataQualification} isOpen={isDeleteQualificationModalOpen} onClose={() => setIsDeleteQualificationModalOpen(false)} />}
        </>
    );

}
export default EditProfileDoctor;
