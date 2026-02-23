// src/App.js
import React, { useState } from 'react';
import PatientForm from './PatientForm';
import Dashboard from './Dashboard';
import './App.css';

function App() {
  const [officeId, setOfficeId] = useState('OFFICE1_UUID');

  return (
    <div className="App">
      <h1>Clinic Management</h1>

      <div className="office-selector">
        <label>Select Office:</label>
        <select value={officeId} onChange={e => setOfficeId(e.target.value)}>
          <option value="OFFICE1_UUID">Office 1</option>
          <option value="OFFICE2_UUID">Office 2</option>
        </select>
      </div>

      <PatientForm />
      <Dashboard officeId={officeId} />
    </div>
  );
}

export default App;