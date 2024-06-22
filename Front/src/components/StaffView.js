import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function StaffView() {
    const { id } = useParams();
    const [staffDetails, setStaffDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStaffDetails = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:3005/staff/${id}`);
            console.log('API Response:', response.data); // Log the API response
            setStaffDetails(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching staff details:', error);
            setError(error);
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchStaffDetails();
    }, [fetchStaffDetails]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading staff details. Please try again later.</div>;
    }

    return (
        <div>
            <h1>Staff Details</h1>
            <p>First Name: {staffDetails.firstName}</p>
            <p>Last Name: {staffDetails.lastName}</p>
            <p>Aadhaar Number: {staffDetails.aadhaarNumber}</p>
            <p>Mobile Number: {staffDetails.mobileNumber}</p>
            <p>Email: {staffDetails.email}</p>
            <p>Gender: {staffDetails.gender}</p>
            <p>Salary: {staffDetails.salary}</p>
            <p>Role: {staffDetails.role}</p>
            <p>Emergency Relation: {staffDetails.emergencyRelation}</p>
            <p>Emergency Mobile: {staffDetails.emergencyMobile}</p>
            <p>Joining Date: {staffDetails.joiningDate}</p>
            <p>Leaving Date: {staffDetails.leavingDate}</p>
            <p>Birthdate: {staffDetails.birthdate}</p>
            <p>Shift: {staffDetails.shift}</p>
            <p>Blood Group: {staffDetails.bloodGroup}</p>
            {staffDetails.image && <img src={`http://localhost:3005/${staffDetails.image}`} alt="Staff" />}
        </div>
    );
}

export default StaffView;
