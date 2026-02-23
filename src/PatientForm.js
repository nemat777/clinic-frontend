// src/PatientForm.js
import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import './PatientForm.css'; // optional for custom styling

function PatientForm() {
  const [form, setForm] = useState({
    name: '',
    dob: '',
    phone: '',
    symptoms: '',
    history: '',
    office_id: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('PatientIntakes').insert([form]);
    if (error) {
      alert('Error submitting: ' + error.message);
    } else {
      alert('Patient intake saved successfully!');
      setForm({ name: '', dob: '', phone: '', symptoms: '', history: '', office_id: '' });
    }
  }

  return (
    <div className="form-container">
      <h2>Patient Intake Form</h2>
      <form onSubmit={handleSubmit} className="patient-form">
        <input 
          type="text" 
          placeholder="Full Name" 
          value={form.name} 
          onChange={e => setForm({...form, name: e.target.value})} 
          required 
        />

        <input 
          type="date" 
          placeholder="Date of Birth" 
          value={form.dob} 
          onChange={e => setForm({...form, dob: e.target.value})} 
          required 
        />

        <input 
          type="tel" 
          placeholder="Phone Number" 
          value={form.phone} 
          onChange={e => setForm({...form, phone: e.target.value})} 
        />

        <select value={form.symptoms} onChange={e => setForm({...form, symptoms: e.target.value})} required>
          <option value="">Select Symptoms</option>
          <option value="Skin Rash">Skin Rash</option>
          <option value="Headache">Headache</option>
          <option value="Other">Other</option>
        </select>

        <textarea 
          placeholder="Medical History / Notes" 
          value={form.history} 
          onChange={e => setForm({...form, history: e.target.value})} 
        />

        <select value={form.office_id} onChange={e => setForm({...form, office_id: e.target.value})} required>
          <option value="">Select Office</option>
          <option value="OFFICE1_UUID">Office 1</option>
          <option value="OFFICE2_UUID">Office 2</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PatientForm;