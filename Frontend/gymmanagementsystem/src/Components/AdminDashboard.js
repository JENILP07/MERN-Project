import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [members, setMembers] = useState([]);
  const [editMember, setEditMember] = useState(null);
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Plan, setPlan] = useState("");
  const [Password, setPassword] = useState(""); // Password for existing members
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberPhone, setNewMemberPhone] = useState("");
  const [newMemberPlan, setNewMemberPlan] = useState("");
  const [newMemberPassword, setNewMemberPassword] = useState(""); // Password for new members
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3010/members")
      .then((response) => response.json())
      .then((data) => {
        setMembers(data);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3010/members/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => window.location.reload());
  };

  const handleEdit = (id) => {
    navigate('/Updatepage/'+id)
  };

  const handleSave = () => {
    setMembers(
      members.map((member) =>
        member.id === editMember.id
          ? { ...member, Name, Email, Phone, Plan, Password }
          : member
      )
    );
    setEditMember(null);
    setName("");
    setEmail("");
    setPhone("");
    setPlan("");
    setPassword(""); // Reset password field after saving
  };

  const handleAddMember = (e) => {
    e.preventDefault();

    const newMember = {
      Name: newMemberName,
      Email: newMemberEmail,
      Phone: newMemberPhone,
      Plan: newMemberPlan,
      Password: newMemberPassword, // Include password for new member
    };

    fetch("http://localhost:3010/members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMember),
    })
      .then((res) => res.json())
      .then((data) => {
        setMembers([...members, data]);
        setNewMemberName("");
        setNewMemberEmail("");
        setNewMemberPhone("");
        setNewMemberPlan("");
        setNewMemberPassword(""); // Reset password field after adding member
      })
      .catch((error) => console.error("Error adding member:", error));
  };

  return (
    <div style={styles.container}>
      <h2>Admin Dashboard</h2>

      {/* Edit Member Section */}
      {editMember && (
        <div style={styles.editForm}>
          <h3>Edit Member</h3>
          <div style={styles.inputGroup}>
            <label>Name:</label>
            <input
              type="text"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label>Email:</label>
            <input
              type="email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label>Phone Number:</label>
            <input
              type="tel"
              value={Phone}
              onChange={(e) => setPhone(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label>Password:</label>
            <input
              type="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label>Plan Type:</label>
            <input
              type="text"
              value={Plan}
              onChange={(e) => setPlan(e.target.value)}
              style={styles.input}
            />
          </div>
          <button onClick={handleSave} style={styles.saveButton}>
            Save
          </button>
        </div>
      )}

      {/* Add New Member Section */}
      <div style={styles.addForm}>
        <h3>Add New Member</h3>
        <form onSubmit={handleAddMember}>
          <div style={styles.inputGroup}>
            <label>Name:</label>
            <input
              type="text"
              value={newMemberName}
              onChange={(e) => setNewMemberName(e.target.value)}
              style={styles.input}
              placeholder="Enter member name"
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label>Email:</label>
            <input
              type="email"
              value={newMemberEmail}
              onChange={(e) => setNewMemberEmail(e.target.value)}
              style={styles.input}
              placeholder="Enter member email"
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label>Phone Number:</label>
            <input
              type="tel"
              value={newMemberPhone}
              onChange={(e) => setNewMemberPhone(e.target.value)}
              style={styles.input}
              placeholder="Enter phone number"
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label>Password:</label>
            <input
              type="password"
              value={newMemberPassword}
              onChange={(e) => setNewMemberPassword(e.target.value)}
              style={styles.input}
              placeholder="Enter password"
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label>Plan Type:</label>
            <input
              type="text"
              value={newMemberPlan}
              onChange={(e) => setNewMemberPlan(e.target.value)}
              style={styles.input}
              placeholder="Enter plan type"
              required
            />
          </div>
          <button type="submit" style={styles.addButton}>
            Add Member
          </button>
        </form>
      </div>

      {/* Members List */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Plan Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member._id}>
              <td>{member.Name}</td>
              <td>{member.Email}</td>
              <td>{member.Phone}</td>
              <td>{member.Plan}</td>
              <td>
                <button
                  onClick={() => handleEdit(member._id)}
                  style={styles.actionButton}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(member._id)}
                  style={styles.deleteButton}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Inline styles for basic layout
const styles = {
  container: {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  inputGroup: {
    marginBottom: "10px",
  },
  input: {
    padding: "8px",
    width: "100%",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  saveButton: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  actionButton: {
    marginRight: "10px",
    padding: "5px 10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "5px 10px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  editForm: {
    marginBottom: "20px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  addForm: {
    marginBottom: "20px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  addButton: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default AdminDashboard;
