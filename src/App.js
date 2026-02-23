// src/App.js
import React from 'react';
import ProtectedDashboard from './ProtectedDashboard';

function App() {
  return (
    <div>
      {/* Replace this officeId with dynamic value per office later */}
      <ProtectedDashboard officeId="OFFICE1_UUID" />
    </div>
  );
}

export default App;
