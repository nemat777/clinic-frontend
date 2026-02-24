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
    officeId: '', // dynamically set
    symptoms: '',
    summary: '',  // AI-generated
    medications: '',
    allergies: '',
    medicalHistory: '',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loadingSummary, setLoadingSummary] = useState(false);

  // Fetch offices dynamically
  useEffect(() => {
    async function fetchOffices() {
      const { data, error } = await supabase
        .from('Offices')
        .select('id, name');
      if (error) {
        console.error('Error fetching offices:', error);
      } else {
        setOffices(data);
        if (data.length > 0) {
          setFormData(prev => ({ ...prev, officeId: data[0].id }));
        }
      }
    }
    fetchOffices();
  }, []);

  // Handle input change
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // AI summary for symptoms
   if (name === 'symptoms' && value.trim().length > 5) {
  setLoadingSummary(true);
  try {
    const response = await fetch('/api/ai-summary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symptoms: value })
    });
    const data = await response.json();
    setFormData(prev => ({ ...prev, summary: data.summary }));
  } catch (err) {
    console.error('AI summary error:', err);
  } finally {
    setLoadingSummary(false);
  }
}
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
      .from('PatientIntakes')
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
        <textarea
          name="symptoms"
          value={formData.symptoms}
          onChange={handleChange}
          placeholder="Describe your symptoms"
          required
        />
        {loadingSummary && <p>Generating summary...</p>}
      </div>

      <div className="form-group">
        <label>AI Summary</label>
        <textarea
          name="summary"
          value={formData.summary}
          readOnly
          placeholder="AI-generated summary will appear here"
        />
      </div>

      <div className="form-group">
        <label>Current Medications</label>
        <textarea name="medications" value={formData.medications} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Allergies</label>
        <textarea name="allergies" value={formData.allergies} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Medical History</label>
        <textarea name="medicalHistory" value={formData.medicalHistory} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Additional Notes</label>
        <textarea name="notes" value={formData.notes} onChange={handleChange} />
      </div>

      <button type="submit" className="form-submit">Submit</button>
    </form>
  );
}

export default PatientForm;