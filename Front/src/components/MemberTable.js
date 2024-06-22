import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'; // Import required icons

function MemberTable() {
  const [memberData, setMemberData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMemberData();
  }, []);

  const fetchMemberData = async () => {
    try {
      const response = await axios.get('http://localhost:3005/members');
      setMemberData(response.data);
    } catch (error) {
      console.error('Error fetching member data:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/memberForm/${id}`);
  };

  const handleView = (id) => {
    navigate(`/memberView/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3005/members/${id}`);
      fetchMemberData(); // Refresh the data after deletion
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Member List</h2>
      <div className="text-right mb-3">
        <button onClick={() => navigate('/memberForm')} className="btn btn-primary">Add</button>
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
          {memberData.map((member) => (
            <tr key={member._id}>
              <td>
                <button onClick={() => handleView(member._id)} className="btn btn-info btn-sm mr-1">
                  <FontAwesomeIcon icon={faEye} />
                </button>
                <button onClick={() => handleEdit(member._id)} className="btn btn-warning btn-sm mx-1">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button onClick={() => handleDelete(member._id)} className="btn btn-danger btn-sm ml-1">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
              <td>{member.code}</td>
              <td>{member.firstName}</td>
              <td>{member.reporting}</td>
              <td>{member.email}</td>
              <td>{member.mobileNumber}</td>
              <td>{member.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MemberTable;
