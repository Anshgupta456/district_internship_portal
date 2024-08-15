import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import GovDashboard from './pages/GovDashboard';
import Jobs from './pages/Jobs';
import GovRegister from './pages/GovRegister';
import GovResTracker from './pages/GovResTracker';
import UniRegister from './pages/UniRegister';
import GovNavbar from './components/GovNavbar';
import ResponsesTable from './components/ResponsesTable';
import Header from './components/Header';
import JobsPosted from './pages/JobsPosted';
import StdRegister from './pages/StdRegister';
import StdDashboard from './pages/StdDashboard';
import ViewJobs from './pages/ViewJobs';
import JobDescription from './pages/JobDescription';
import UniDashboard from './pages/UniDashboard';
import StudentList from './pages/ViewStdRecord';
import ManageWorkingHours from './components/ManageWorkingHours';
import Admin from './pages/Admin';

function App() {
  const { role } = useContext(AuthContext);

  return (
    <Router>
      <Header />
      <Navbar />
      {role === 'government' && <GovNavbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/govdashboard" element={<GovDashboard />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/govregister" element={<GovRegister />} />
        <Route path="/govrestracker" element={<GovResTracker />} />
        <Route path="/uniregister" element={<UniRegister />} />
        <Route path="/jobsposted" element={<JobsPosted />} />
        <Route path="/stdregister" element={<StdRegister />} />
        <Route path="/stddashboard" element={<StdDashboard />} />
        <Route path="/workinghours" element={<ManageWorkingHours />} />
        <Route path="/viewjobs" element={<ViewJobs />} />
        <Route path="/viewstudent" element={<StudentList />} />
        <Route path="/response/:id" element={<ResponsesTable />} />
        <Route path="/jobdescription/:id" element={<JobDescription />} />
        <Route path="/unidashboard" element={<UniDashboard />} />
        <Route path="/viewstdrecord" element={<StudentList />} />
      </Routes>
    </Router>
  );
}

export default App;
