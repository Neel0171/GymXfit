import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StaffCount = () => {
    const [count, setCount] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStaffCount = async () => {
            try {
                const response = await axios.get('/staff/count');
                setCount(response.data.count);
            } catch (err) {
                setError('Could not fetch staff count');
            }
        };

        fetchStaffCount();
    }, []);

    return (
        <div className='dashboard-card'>
            <h1>Total Staff</h1>
            {error ? <p>{error}</p> : <p>Number of staff members: {count}</p>}
        </div>
    );
};

export default StaffCount;
