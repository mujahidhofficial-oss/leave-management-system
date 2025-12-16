import { useEffect, useState } from "react";
import { createLeaveAPI, myLeavesAPI } from "../services/api";

export default function EmployeeDashboard({ token }) {
  const [leaves, setLeaves] = useState([]);
  const [form, setForm] = useState({ startDate: "", endDate: "", reason: "" });

  const loadLeaves = async () => {
    const res = await myLeavesAPI(token);
    setLeaves(res.leaves || []);
  };

  useEffect(() => {
    loadLeaves();
  }, []);

  const applyLeave = async () => {
    await createLeaveAPI(form, token);
    loadLeaves();
  };

  return (
    <div>
      <h2>Employee Dashboard</h2>

      <input type="date" onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
      <input type="date" onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
      <input placeholder="Reason" onChange={(e) => setForm({ ...form, reason: e.target.value })} />
      <button onClick={applyLeave}>Apply Leave</button>

      <ul>
        {leaves.map((l) => (
          <li key={l._id}>{l.reason} - {l.status}</li>
        ))}
      </ul>
    </div>
  );
}
