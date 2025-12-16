const API_BASE = "http://localhost:5000";

export const loginAPI = async (data) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const createLeaveAPI = async (data, token) => {
  const res = await fetch(`${API_BASE}/leaves`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const myLeavesAPI = async (token) => {
  const res = await fetch(`${API_BASE}/leaves/my-leaves`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const allLeavesAPI = async (token) => {
  const res = await fetch(`${API_BASE}/leaves/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const updateLeaveStatusAPI = async (id, status, token) => {
  const res = await fetch(`${API_BASE}/leaves/${id}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
  return res.json();
};
