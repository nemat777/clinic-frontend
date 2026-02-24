// src/PatientForm.js
import React, { useState } from 'react';
import { supabase } from './supabaseClient';

function PatientForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    phone: '',
    officeId: 'OFFICE1_UUID',
    symptoms: '',
    medications: '',
    allergies: '',
    medicalHistory: '',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const offices = [
    { id: 'OFFICE1_UUID', name: 'Office 1' },
    { id: 'OFFICE2_UUID', name: 'Office 2' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.dob || !formData.symptoms) {
      setError('Please fill out all required fields.');
      return;
    }

    const { error } = await supabase
      .from('PatientIntakes')
      .insert([formData]);

    if (error) {
      console.error(error);
      setError('Submission failed. Please try again.');
    } else {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h2>Thank you!</h2>
        <p>Your information has been submitted successfully.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Patient Intake Form</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <label>First Name *</label>
      <input name="firstName" value={formData.firstName} onChange={handleChange} required />

      <label>Last Name *</label>
      <input name="lastName" value={formData.lastName} onChange={handleChange} required />

      <label>Date of Birth *</label>
      <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />

      <label>Email</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} />

      <label>Phone</label>
      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />

      <label>Office *</label>
      <select name="officeId" value={formData.officeId} onChange={handleChange}>
        {offices.map(office => (
          <option key={office.id} value={office.id}>{office.name}</option>
        ))}
      </select>

      <label>Symptoms *</label>
      <textarea
        name="symptoms"
        value={formData.symptoms}
        onChange={handleChange}
        placeholder="Describe your symptoms"
        required
      />

      <label>Current Medications</label>
      <textarea
        name="medications"
        value={formData.medications}
        onChange={handleChange}
        placeholder="List any medications you take"
      />

      <label>Allergies</label>
      <textarea
        name="allergies"
        value={formData.allergies}
        onChange={handleChange}
        placeholder="List any allergies"
      />

      <label>Medical History</label>
      <textarea
        name="medicalHistory"
        value={formData.medicalHistory}
        onChange={handleChange}
        placeholder="Brief medical history"
      />

      <label>Additional Notes</label>
      <textarea
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        placeholder="Any other information"
      />

      <button type="submit" style={{ marginTop: '20px', padding: '10px 20px' }}>
        Submit
      </button>
    </form>
  );
}

export default PatientForm;