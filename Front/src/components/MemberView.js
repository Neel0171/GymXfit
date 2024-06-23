import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function MemberView() {
    const { id } = useParams();
    const [memberDetails, setMemberDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMemberDetails = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:3005/member/${id}`);
            console.log('API Response:', response.data); // Log the API response
            setMemberDetails(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching staff details:', error);
            setError(error);
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchMemberDetails();
    }, [fetchMemberDetails]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading staff details. Please try again later.</div>;
    }

    return (
        <div>
            <h1>Staff Details</h1>
            <p>First Name: {memberDetails.firstName}</p>
            <p>Last Name: {memberDetails.lastName}</p>
            <p>Aadhaar Number: {memberDetails.aadhaarNumber}</p>
            <p>Mobile Number: {memberDetails.mobileNumber}</p>
            <p>Email: {memberDetails.email}</p>
            <p>Gender: {memberDetails.gender}</p>
            <p>Salary: {memberDetails.salary}</p>
            <p>Role: {memberDetails.role}</p>
            <p>Emergency Relation: {memberDetails.emergencyRelation}</p>
            <p>Emergency Mobile: {memberDetails.emergencyMobile}</p>
            <p>Joining Date: {memberDetails.joiningDate}</p>
            <p>Leaving Date: {memberDetails.leavingDate}</p>
            <p>Birthdate: {memberDetails.birthdate}</p>
            <p>Shift: {memberDetails.shift}</p>
            <p>Blood Group: {memberDetails.bloodGroup}</p>
            {memberDetails.image && <img src={`http://localhost:3005/${memberDetails.image}`} alt="Member" />}
        </div>
    );
}

export default MemberView;
