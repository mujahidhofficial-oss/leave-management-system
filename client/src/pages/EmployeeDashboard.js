import { useEffect, useState } from "react";
import { createLeaveAPI, myLeavesAPI } from "../services/api";

//  onLogout 
export default function EmployeeDashboard({ token, onLogout }) {
  const [leaves, setLeaves] = useState([]);
  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    reason: "",
  });

 
  const loadLeaves = async () => {
    const res = await myLeavesAPI(token);
    setLeaves(res.leaves || []);
  };

  
  useEffect(() => {
    loadLeaves();
  }, []);

  //  validation 
  const applyLeave = async () => {
    if (!form.startDate || !form.endDate || !form.reason) {
      alert("All fields are required");
      return;
    }

    await createLeaveAPI(form, token);

    // 🔹 CHANGED: reset form after success
    setForm({ startDate: "", endDate: "", reason: "" });

    loadLeaves();
  };

  return (
    <div style={{ padding: 20 }}>
      {/* 🔹 CHANGED: Logout button */}
      <button onClick={onLogout} style={{ marginBottom: 10 }}>
        Logout
      </button>

      <h2>Employee Dashboard</h2>

      
      <input
        type="date"
        value={form.startDate}
        onChange={(e) =>
          setForm({ ...form, startDate: e.target.value })
        }
      />

      <input
        type="date"
        value={form.endDate}
        onChange={(e) =>
          setForm({ ...form, endDate: e.target.value })
        }
      />

      <input
        placeholder="Reason"
        value={form.reason}
        onChange={(e) =>
          setForm({ ...form, reason: e.target.value })
        }
      />

      <button onClick={applyLeave}>Apply Leave</button>

      <hr />

      <ul>
        {leaves.map((l) => (
          <li key={l._id}>
            {l.reason} - <strong>{l.status}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
