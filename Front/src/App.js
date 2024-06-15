import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import SidebarComponent from './components/SidebarComponent';
import MemberForm from './components/TempMemberForm';
import StaffForm from './components/StaffForm';
import { useState, useCallback } from 'react';

function App() {
  const [toggle, setToggle] = useState(false);

  const handleToggle = useCallback(() => setToggle(prevToggle => !prevToggle), []);

  return (
    <Router>
      <div className="App">
        <Navbar handleToggle={handleToggle} />
        <div className="d-flex" id="wrapper">
          <SidebarComponent toggle={toggle} />
          <div className="content">
            <Routes>
              <Route path="/" element={<div>Dashboard Content</div>} />
              <Route path="/members" element={<MemberForm />} />
              <Route path="/staff" element={<StaffForm />} />
              <Route path="/reports" element={<div>Reports Content</div>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
