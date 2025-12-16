import { useEffect, useState } from "react";
import { allLeavesAPI, updateLeaveStatusAPI } from "../services/api";

export default function AdminDashboard({ token }) {
  const [leaves, setLeaves] = useState([]);

  const loadLeaves = async () => {
    const res = await allLeavesAPI(token);
    setLeaves(res.leaves || []);
  };

  useEffect(() => {
    loadLeaves();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {leaves.map((l) => (
        <div key={l._id}>
          {l.employeeId?.name} - {l.reason} - {l.status}
          <button onClick={() => updateLeaveStatusAPI(l._id, "Approved", token)}>Approve</button>
          <button onClick={() => updateLeaveStatusAPI(l._id, "Rejected", token)}>Reject</button>
        </div>
      ))}
    </div>
  );
}
