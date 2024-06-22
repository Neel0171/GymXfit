import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'; // Import required icons

function StaffTable() {
  const [staffData, setStaffData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStaffData();
  }, []);

  const fetchStaffData = async () => {
    try {
      const response = await axios.get('http://localhost:3005/staff');
      setStaffData(response.data);
    } catch (error) {
      console.error('Error fetching staff data:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/staffForm/${id}`);
  };

  const handleView = (id) => {
    navigate(`/staffView/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3005/staff/${id}`);
      fetchStaffData(); // Refresh the data after deletion
    } catch (error) {
      console.error('Error deleting staff:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Staff List</h2>
      <div className="text-right mb-3">
        <button onClick={() => navigate('/staffForm')} className="btn btn-primary">Add</button>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Action</th>
            <th>Code</th>
            <th>Name</th>
            <th>Reporting</th>
            <th>Email</th>
            <th>Mobile No.</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {staffData.map((staff) => (
            <tr key={staff._id}>
              <td>
                <button onClick={() => handleView(staff._id)} className="btn btn-info btn-sm mr-1">
                  <FontAwesomeIcon icon={faEye} />
                </button>
                <button onClick={() => handleEdit(staff._id)} className="btn btn-warning btn-sm mx-1">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button onClick={() => handleDelete(staff._id)} className="btn btn-danger btn-sm ml-1">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
              <td>{staff.code}</td>
              <td>{staff.firstName}</td>
              <td>{staff.reporting}</td>
              <td>{staff.email}</td>
              <td>{staff.mobileNumber}</td>
              <td>{staff.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StaffTable;
