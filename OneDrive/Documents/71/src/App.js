import React, { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/leads";

function App() {
  const [leads, setLeads] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    source: "",
    status: "New",
    notes: ""
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    const res = await axios.get(API);
    setLeads(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await axios.put(`${API}/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post(API, form);
    }

    setForm({
      name: "",
      email: "",
      phone: "",
      source: "",
      status: "New",
      notes: ""
    });

    fetchLeads();
  };

  const handleEdit = (lead) => {
    setForm(lead);
    setEditId(lead._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchLeads();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Mini CRM - Lead Management</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
        <input name="source" placeholder="Source" value={form.source} onChange={handleChange} required />

        <select name="status" value={form.status} onChange={handleChange}>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Converted">Converted</option>
        </select>

        <input name="notes" placeholder="Notes" value={form.notes} onChange={handleChange} />

        <button type="submit">
          {editId ? "Update Lead" : "Add Lead"}
        </button>
      </form>

      <hr />

      {leads.map((lead) => (
        <div key={lead._id} style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
          <p><b>Name:</b> {lead.name}</p>
          <p><b>Email:</b> {lead.email}</p>
          <p><b>Phone:</b> {lead.phone}</p>
          <p><b>Source:</b> {lead.source}</p>
          <p><b>Status:</b> {lead.status}</p>
          <p><b>Notes:</b> {lead.notes}</p>

          <button onClick={() => handleEdit(lead)}>Edit</button>
          <button onClick={() => handleDelete(lead._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
