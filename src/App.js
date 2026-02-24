// src/App.js
import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import PatientForm from './PatientForm';
import Dashboard from './Dashboard';
import './App.css';

function App() {
  const [offices, setOffices] = useState([]);
  const [officeId, setOfficeId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOffices();
  }, []);

  const fetchOffices = async () => {
    const { data, error } = await supabase
      .from('Offices')
      .select('*');

    if (error) {
      console.error('Error fetching offices:', error);
    } else {
      setOffices(data);
      if (data.length > 0) {
        setOfficeId(data[0].id); // default to first office
      }
    }

    setLoading(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="App">
      <h1>Clinic Management System</h1>

      {offices.length > 0 && (
        <div className="office-selector">
          <label>Select Office: </label>
          <select
            value={officeId || ''}
            onChange={(e) => setOfficeId(e.target.value)}
          >
            {offices.map((office) => (
              <option key={office.id} value={office.id}>
                {office.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {officeId && (
        <>
          <PatientForm officeId={officeId} />
          <Dashboard officeId={officeId} />
        </>
      )}
    </div>
  );
}

export default App;