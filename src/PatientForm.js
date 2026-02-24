// src/PatientForm.js
import React, { useState, useEffect } from 'react';
import './PatientForm.css';

export default function PatientForm() {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [summary, setSummary] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Debounce AI summary request
  useEffect(() => {
    if (!symptoms) {
      setSummary('');
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const res = await fetch('/api/ai-summary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ symptoms }),
        });

        if (!res.ok) throw new Error('AI request failed');
        const data = await res.json();
        setSummary(data.summary || '');
      } catch (err) {
        console.error(err);
        setSummary('');
      }
    }, 1000); // 1 second debounce

    return () => clearTimeout(timeout);
  }, [symptoms]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/submit-intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, dob, symptoms, summary }),
      });

      if (!res.ok) throw new Error('Submission failed');
      alert('Form submitted successfully!');
      setName('');
      setDob('');
      setSymptoms('');
      setSummary('');
    } catch (err) {
      console.error(err);
      setError('Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="patient-form" onSubmit={handleSubmit}>
      <h2>Patient Intake Form</h2>
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="date"
        placeholder="Date of Birth"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        required
      />
      <textarea
        placeholder="Describe your symptoms..."
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        required
      />
      <textarea
        placeholder="AI Summary"
        value={summary}
        readOnly
      />
      {error && <div className="error">{error}</div>}
      <button type="submit" disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}