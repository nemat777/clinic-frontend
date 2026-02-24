import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PatientIntakePage from './PatientIntakePage';
import ProtectedDashboard from './ProtectedDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PatientIntakePage />} />
        <Route path="/dashboard" element={<ProtectedDashboard officeId="OFFICE1_UUID" />} />
      </Routes>
    </Router>
  );
}

export default App;