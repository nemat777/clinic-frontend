// src/PatientForm.js
import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import './PatientForm.css';

export default function PatientForm({ officeId }) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    dob: '',
    phone: '',
    email: '',
    symptoms: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { error } = await supabase.from('PatientIntakes').insert([
      {
        ...formData,
        office_id: officeId,
      },
    ]);

    if (error) {
      console.error(error);
      setMessage('Submission failed. Please try again.');
    } else {
      setMessage('Form submitted successfully!');
      setFormData({
        first_name: '',
        last_name: '',
        dob: '',
        phone: '',
        email: '',
        symptoms: '',
      });
    }

    setLoading(false);
  };

  return (
    <form className="patient-form" onSubmit={handleSubmit}>
      <h2>Patient Intake Form</h2>

      <input
        type="text"
        name="first_name"
        placeholder="First Name"
        value={formData.first_name}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="last_name"
        placeholder="Last Name"
        value={formData.last_name}
        onChange={handleChange}
        required
      />

      <input
        type="date"
        name="dob"
        value={formData.dob}
        onChange={handleChange}
        required
      />

      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
      />

      <textarea
        name="symptoms"
        placeholder="Describe your symptoms..."
        value={formData.symptoms}
        onChange={handleChange}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>

      {message && <p>{message}</p>}
    </form>
  );
}