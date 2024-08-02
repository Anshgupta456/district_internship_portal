import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard';
import Jobs from './pages/Jobs';
import GovRegister from './pages/GovRegister';
import GovResTracker from './pages/GovResTracker';
import UniRegister from './pages/UniRegister';
import GovNavbar from './components/GovNavbar';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Navbar />
      <GovNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/GovRegister" element={<GovRegister />} />
        <Route path="/govResTracker" element={<GovResTracker />} />
        <Route path="/UniRegister" element={<UniRegister />} />
      </Routes>
    </Router>
  );
}

export default App;
