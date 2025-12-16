import { useEffect, useState } from "react";
import { allLeavesAPI, updateLeaveStatusAPI } from "../services/api";

// 🔹 CHANGED: added onLogout prop
export default function AdminDashboard({ token, onLogout }) {
  const [leaves, setLeaves] = useState([]);

  // 🔹 NO CHANGE: load all leave requests
  const loadLeaves = async () => {
    const res = await allLeavesAPI(token);
    setLeaves(res.leaves || []);
  };

  // 🔹 NO CHANGE: load leaves on page load
  useEffect(() => {
    loadLeaves();
  }, []);

  // 🔹 CHANGED: handle approve / reject with reload
  const updateStatus = async (id, status) => {
    await updateLeaveStatusAPI(id, status, token);
    loadLeaves(); // refresh list after action
  };

  return (
    <div style={{ padding: 20 }}>
      {/* 🔹 CHANGED: Logout button */}
      <button onClick={onLogout} style={{ marginBottom: 10 }}>
        Logout
      </button>

      <h2>Admin Dashboard</h2>

      <hr />

      {leaves.map((l) => (
        <div key={l._id} style={{ marginBottom: 8 }}>
          <strong>{l.employeeId?.name}</strong> — {l.reason} —{" "}
          <b>{l.status}</b>

          {/* 🔹 CHANGED: disable buttons if already processed */}
          <button
            disabled={l.status !== "Pending"}
            onClick={() => updateStatus(l._id, "Approved")}
            style={{ marginLeft: 10 }}
          >
            Approve
          </button>

          <button
            disabled={l.status !== "Pending"}
            onClick={() => updateStatus(l._id, "Rejected")}
            style={{ marginLeft: 5 }}
          >
            Reject
          </button>
        </div>
      ))}
    </div>
  );
}
