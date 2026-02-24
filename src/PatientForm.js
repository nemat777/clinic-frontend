// src/PatientForm.js
import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import './PatientForm.css';

function PatientForm() {
  const [offices, setOffices] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    phone: '',
    officeId: '', // will be populated dynamically
    symptoms: '',
    medications: '',
    allergies: '',
    medicalHistory: '',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Fetch offices from Supabase
  useEffect(() => {
    async function fetchOffices() {
      const { data, error } = await supabase
        .from('Offices')  // replace with your actual offices table name
        .select('id, name');
      if (error) {
        console.error('Error fetching offices:', error);
      } else {
        setOffices(data);
        if (data.length > 0) {
          setFormData(prev => ({ ...prev, officeId: data[0].id })); // default first office
        }
      }
    }
    fetchOffices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.dob || !formData.symptoms || !formData.officeId) {
      setError('Please fill out all required fields.');
      return;
    }

    const { error } = await supabase
      .from('PatientIntakes') // your table
      .insert([formData]);

    if (error) {
      console.error('Supabase error:', error);
      setError(`Submission failed: ${error.message}`);
    } else {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="form-success">
        <h2>Thank you!</h2>
        <p>Your information has been submitted successfully.</p>
      </div>
    );
  }

  return (
    <form className="patient-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Patient Intake Form</h2>
      {error && <p className="form-error">{error}</p>}

      <div className="form-group">
        <label>First Name *</label>
        <input name="firstName" value={formData.firstName} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Last Name *</label>
        <input name="lastName" value={formData.lastName} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Date of Birth *</label>
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Phone</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Office *</label>
        <select name="officeId" value={formData.officeId} onChange={handleChange} required>
          {offices.map(office => (
            <option key={office.id} value={office.id}>{office.name}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Symptoms *</label>
        <textarea name="symptoms" value={formData.symptoms} onChange={handleChange} placeholder="Describe your symptoms" required />
      </div>

      <div className="form-group">
        <label>Current Medications</label>
        <textarea name="medications" value={formData.medications} onChange={handleChange} placeholder="List any medications you take" />
      </div>

      <div className="form-group">
        <label>Allergies</label>
        <textarea name="allergies" value={formData.allergies} onChange={handleChange} placeholder="List any allergies" />
      </div>

      <div className="form-group">
        <label>Medical History</label>
        <textarea name="medicalHistory" value={formData.medicalHistory} onChange={handleChange} placeholder="Brief medical history" />
      </div>

      <div className="form-group">
        <label>Additional Notes</label>
        <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Any other information" />
      </div>

      <button type="submit" className="form-submit">Submit</button>
    </form>
  );
}

export default PatientForm;