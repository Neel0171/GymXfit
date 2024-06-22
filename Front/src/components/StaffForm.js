import React, { useState, useEffect,  useCallback } from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import AddressModal from './AddressModal';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function StaffForm() {
    
    const { id } = useParams(); // Get the staff ID from the URL
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        aadhaarNumber: '',
        mobileNumber: '',
        email: '',
        gender: '',
        salary: '',
        role: '',
        emergencyRelation: '',
        emergencyMobile: '',
        joiningDate: '',
        leavingDate: '',
        birthdate: '',
        shift: '',
        bloodGroup: '',
        image:null,
    });

    const navigate = useNavigate(); // useNavigate hook for navigation
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    


    
    const shiftOptions = [
        { value: 'morning', label: 'Morning' },
        { value: 'fullday', label: 'Fullday' },
        { value: 'evening', label: 'Evening' },
    ];

    useEffect(() => {
        if (id) {
          fetchStaffDetails();
        }
      }, [id]);
    
      const fetchStaffDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:3005/staff/${id}`);
          setFormData(response.data);
        } catch (error) {
          console.error('Error fetching staff details:', error);
        }
      };
    

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
          ...formData,
          [name]: files ? files[0] : value,
        });
      };

    const handleSelectChange = (selectedOption, actionMeta) => {
        setFormData({ ...formData, [actionMeta.name]: selectedOption.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, image: file });

        // Create a preview URL for the selected image
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const data = new FormData();
          for (const key in formData) {
            data.append(key, formData[key]);
          }
    
          const response = id
        ? await axios.put(`http://localhost:3005/staff/${id}`, data)
        : await axios.post('http://localhost:3005/staff', data);

    
        if (response.status === 200) {
            alert('Data Entered Successfully');
            navigate('/staffTable');
          } else {
            console.error('Failed to submit data');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

    

    const documentOptions = [
        { value: 'aadhar', label: 'Aadhar Card' },
        { value: 'driving', label: 'Driving License' },
        { value: 'passport', label: 'Passport' }
    ];

    const reportingPersonOptions = [
        { value: 'none', label: 'No items found' },
    ];

    const roleOptions = [
        { value: 'admin', label: 'Admin' },
        { value: 'super', label: 'Super Admin' },
        { value: 'receptionist', label: 'Receptionist' },
        { value: 'trainer', label: 'Trainer' },
    ];

    const bloodGroupOptions = [
        { value: 'A+', label: 'A+' },
        { value: 'A-', label: 'A-' },
        { value: 'B+', label: 'B+' },
        { value: 'B-', label: 'B-' },
        { value: 'AB+', label: 'AB+' },
        { value: 'AB-', label: 'AB-' },
        { value: 'O+', label: 'O+' },
        { value: 'O-', label: 'O-' }
    ];

    const emergencyRelationOptions = [
        { value: 'mother', label: 'Mother' },
        { value: 'father', label: 'Father' },
        { value: 'son', label: 'Son' },
        { value: 'daughter', label: 'Daughter' },
        { value: 'brother', label: 'Brother' },
        { value: 'sister', label: 'Sister' },
        { value: 'uncle', label: 'Uncle' },
        { value: 'aunty', label: 'Aunty' },
        { value: 'wife', label: 'Wife' },
        { value: 'husband', label: 'Husband' },
        { value: 'grandfather', label: 'Grandfather' },
        { value: 'grandmother', label: 'Grandmother' },
        { value: 'grandchild', label: 'Grandchild' },
        { value: 'neighbour', label: 'Neighbour' },
        { value: 'friend', label: 'Friend' }
    ];

    const handleUploadFromDevice = () => {
        document.getElementById('fileInput').click();
        setIsPopupVisible(false);
    };

    const handleTakePicture = () => {
        console.log("Take picture clicked");
        setIsPopupVisible(false);
    };

    const handleOpenPopup = () => {
        setIsPopupVisible(true);
    };

    const handleClosePopup = () => {
        setIsPopupVisible(false);
    };

    const popupStyles = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
    };

    const popupContentStyles = {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    };

    const buttonStyles = {
        margin: '10px'
    };

    return (
        <div className='container-fluid' >
            <div className="container">

                <div className="d-flex mb-3 align-items-center justify-content-between">
                    <div className="me-auto">
                        <h1 className="ml-3">Staff</h1>
                    </div>
                    <button className="btn btn-secondary" disabled>Disabled</button>
                    <button className="btn btn-primary ms-2" onClick={handleSubmit}>Submit</button>
                </div>

                <hr />

                
                <div className="d-flex mb-3 align-items-center justify-content-between">
                    <div id="upload" className="me-auto position-relative">
                        <img src={imagePreviewUrl || "https://gymxfit.gymxfit.com/assets/images/profile.svg"} alt="Profile" className="image" height="150px" />
                        <button type="button" className="btn btn-primary d-inline-flex align-items-center position-absolute top-0 start-100 translate-middle badge border border-2 border-white rounded" style={{ padding: "5px" }} onClick={handleOpenPopup}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                            </svg>
                        </button>
                        <input 
                            type="file" 
                            id="fileInput" 
                            name="image" 
                            style={{ display: 'none' }} 
                            onChange={handleFileChange} 
                        />
                    </div>
                    <div>
                        <h5>Notification Setting</h5>
                        <div className="form-check form-switch mb-2">
                            <input className="form-check-input" type="checkbox" role="switch" id="emailNotifications" />
                            <label className="form-check-label" htmlFor="emailNotifications">Email Notifications</label>
                        </div>
                        <div className="form-check form-switch mb-2">
                            <input className="form-check-input" type="checkbox" role="switch" id="mobileNotifications" />
                            <label className="form-check-label" htmlFor="mobileNotifications">Mobile Notifications</label>
                        </div>
                        <div className="form-check form-switch mb-2">
                            <input className="form-check-input" type="checkbox" role="switch" id="pushNotifications" />
                            <label className="form-check-label" htmlFor="pushNotifications">Push Notifications</label>
                        </div>
                    </div>
                </div>

                <hr />

            </div>

            <form className="container mb-5">
                <div className="row">
                    <div className="form-group col-md-4">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            name="firstName"
                            placeholder="Enter First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            name="lastName"
                            placeholder="Enter Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="aadhaarNumber">Aadhaar Card Number</label>
                        <input
                            type="text"
                            className="form-control"
                            id="aadhaarNumber"
                            name="aadhaarNumber"
                            placeholder="Enter Aadhaar Card Number"
                            value={formData.aadhaarNumber}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-md-4">
                        <label htmlFor="mobileNumber">Mobile Number</label>
                        <input
                            type="text"
                            className="form-control"
                            id="mobileNumber"
                            name="mobileNumber"
                            placeholder="Enter Mobile Number"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="Enter Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="gender">Gender</label>
                        <div className="mt-2">
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="gender"
                                    id="male"
                                    value="male"
                                    checked={formData.gender === 'male'}
                                    onChange={() => setFormData({ ...formData, gender: 'male' })}
                                />
                                <label className="form-check-label" htmlFor="male">Male</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="gender"
                                    id="female"
                                    value="female"
                                    checked={formData.gender === 'female'}
                                    onChange={() => setFormData({ ...formData, gender: 'female' })}
                                />
                                <label className="form-check-label" htmlFor="female">Female</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="gender"
                                    id="other"
                                    value="other"
                                    checked={formData.gender === 'other'}
                                    onChange={() => setFormData({ ...formData, gender: 'other' })}
                                />
                                <label className="form-check-label" htmlFor="other">Other</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-md-4">
                        <label htmlFor="salary">Salary</label>
                        <input
                            type="text"
                            className="form-control"
                            id="salary"
                            name="salary"
                            placeholder="Enter Salary"
                            value={formData.salary}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="role">Role</label>
                        <Select
                            id="role"
                            name="role"
                            options={roleOptions}
                            placeholder="Select Role"
                            onChange={handleSelectChange}
                            value={roleOptions.find(option => option.value === formData.role)}
                        />
                    </div>

                    <div className="form-group col-md-4">
                        <label htmlFor="emergencyRelation">Emergency Relation</label>
                        <Select
                            options={emergencyRelationOptions}
                            onChange={handleSelectChange}
                            name="emergencyRelation"
                            placeholder="Select Relation"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-md-4">
                        <label htmlFor="joiningDate">Joining Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="joiningDate"
                            name="joiningDate"
                            value={formData.joiningDate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="leavingDate">Leaving Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="leavingDate"
                            name="leavingDate"
                            value={formData.leavingDate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="birthdate">Birthdate</label>
                        <input
                            type="date"
                            className="form-control"
                            id="birthdate"
                            name="birthdate"
                            value={formData.birthdate}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-md-4">
                        <label htmlFor="shift">Shift</label>
                        <Select
                            id="shift"
                            name="shift"
                            options={shiftOptions} // Define your options array
                            placeholder="Select Shift"
                            onChange={handleSelectChange}
                            value={shiftOptions.find(option => option.value === formData.shift)}
                        />
                    </div>

                    <div className="form-group col-md-4">
                        <label htmlFor="bloodGroup">Blood Group</label>
                        <Select
                            options={bloodGroupOptions}
                            onChange={handleSelectChange}
                            name="bloodGroup"
                            placeholder="Select Blood Group"
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="document">Document</label>
                        <Select
                            options={documentOptions}
                            onChange={handleSelectChange}
                            name="document"
                            placeholder="Select Document"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-md-4">
                        <label htmlFor="emergencyMobile">Emergency Mobile Number</label>
                        <input
                            type="text"
                            className="form-control"
                            id="emergencyMobile"
                            name="emergencyMobile"
                            placeholder="Enter Emergency Mobile Number"
                            value={formData.emergencyMobile}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="reportingPerson">Reporting Person</label>
                        <Select
                            options={reportingPersonOptions}
                            onChange={handleSelectChange}
                            name="reportingPerson"
                            placeholder="Select Reporting Person"
                        />
                    </div>
                </div>

            </form>
		

            <AddressModal />

            {isPopupVisible && (
                <div style={popupStyles}>
                    <div style={popupContentStyles}>
                        <h2>Upload Profile Picture</h2>
                        <button style={buttonStyles} className="btn btn-primary" onClick={handleUploadFromDevice}>Upload from Device</button>
                        <button style={buttonStyles} className="btn btn-secondary" onClick={handleTakePicture}>Take Picture</button>
                        <button style={buttonStyles} className="btn btn-danger" onClick={handleClosePopup}>Close</button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default StaffForm;
