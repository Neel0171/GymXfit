// Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [staffCount, setStaffCount] = useState(0);

    useEffect(() => {
        const fetchStaffCount = async () => {
            try {
                const response = await axios.get('/api/staff/count');
                console.log('Fetched staff count:', response.data); // Debug logging
                if (response.data && response.data.count !== undefined) {
                    setStaffCount(response.data.count);
                } else {
                    console.error('Invalid response format:', response);
                }
            } catch (error) {
                console.error('Error fetching staff count:', error);
            }
        };

        fetchStaffCount();
    }, []);

    return (
        <div className="dashboard-card">
            <h2>Total Staff</h2>
            <p>{staffCount}</p>
        </div>
    );
};

export default Dashboard;
