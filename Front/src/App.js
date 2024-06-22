import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import SidebarComponent from './components/SidebarComponent';
import StaffForm from './components/StaffForm';
import StaffTable from './components/StaffTable';
import StaffView from './components/StaffView';
import MemberForm from './components/MemberForm';
import MemberTable from './components/MemberTable';
import MemberView from './components/MemberView';
import Dashboard from './components/Dashboard';
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
              <Route path="/" element={<Dashboard />} />
              {/* <Route path="/members" element={<MemberForm />} /> */}
              <Route path="/MemberForm" element={<MemberForm />} />
              <Route path="/staffForm" element={<StaffForm />} />
              <Route path="/memberTable" element={<MemberTable />} />
              <Route path="/staffTable" element={<StaffTable />} />
              <Route path="/staffForm/:id" element={<StaffForm />} /> {/* For editing staff */}
              <Route path="/staffView/:id" element={<StaffView />} /> {/* For viewing staff details */}
              <Route path="/memberForm/:id" element={<MemberForm />} /> {/* For editing staff */}
              <Route path="/memberView/:id" element={<MemberView />} /> {/* For viewing staff details */}
              <Route path="/reports" element={<div>Reports Content</div>} />

            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
