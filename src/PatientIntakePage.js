// src/PatientIntakePage.js
import React from 'react';
import PatientForm from './PatientForm';

function PatientIntakePage() {
  return (
    <div style={{ padding: '50px' }}>
      <h1>Patient Intake</h1>
      <PatientForm />
    </div>
  );
}

export default PatientIntakePage;