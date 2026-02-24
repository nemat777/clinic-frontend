// src/Dashboard.js
import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from './supabaseClient';
import './Dashboard.css';

function Dashboard({ officeId }) {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial data
const fetchPatients = useCallback(async () => {
  setLoading(true);

  const { data, error } = await supabase
    .from('PatientIntakes')
    .select('*')
    .eq('office_id', officeId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching patients:', error.message);
  } else {
    setPatients(data);
  }

  setLoading(false);
}, [officeId]);

useEffect(() => {
  fetchPatients();

  const subscription = supabase
    .channel('public:PatientIntakes')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'PatientIntakes' },
      (payload) => {
        if (payload.new.office_id === officeId) {
          setPatients((prev) => [payload.new, ...prev]);
        }
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(subscription);
  };
}, [fetchPatients, officeId]);

  return (
    <div className="dashboard-container">
      <h2>Patient Dashboard</h2>
      {loading ? (
        <p>Loading patients...</p>
      ) : patients.length === 0 ? (
        <p>No patients yet for this office.</p>
      ) : (
        <table className="patient-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>DOB</th>
              <th>Phone</th>
              <th>Symptoms</th>
              <th>History</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.dob}</td>
                <td>{p.phone}</td>
                <td>{p.symptoms}</td>
                <td>{p.history}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;
