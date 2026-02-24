// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PatientIntakePage from './PatientIntakePage';
import ProtectedDashboard from './ProtectedDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public patient intake */}
        <Route path="/" element={<PatientIntakePage />} />

        {/* Protected doctor dashboard */}
        <Route path="/dashboard" element={<ProtectedDashboard officeId="OFFICE1_UUID" />} />
      </Routes>
    </Router>
  );
}

export default App;
