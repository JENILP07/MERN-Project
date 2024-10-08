// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const UserDashboard = () => {
//   const [user, setUser] = useState({
//     Name: "",
//     Email: "",
//     Plan: "",
//     Password: "",
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const id = localStorage.getItem('id');
//     console.log("Fetched ID from localStorage:", id); // Debugging line

//     if (id) {
//       fetch(`http://localhost:3010/members/${id}`)
//         .then((response) => {
//           console.log("API Response:", response); // Added logging for API response
//           if (!response.ok) {
//             console.error("Failed to fetch data. Status:", response.status);
//             throw new Error(`Error: ${response.status} - ${response.statusText}`);
//           }
//           return response.json();
//         })
//         .then((data) => {
//           console.log("User Data fetched from API:", data); // Log fetched data
//           setUser(data);
//         })
//         .catch((error) => {
//           console.error("Error fetching user data:", error);
//           setError("Failed to load user details.");
//         });
//     } else {
//       console.error("No ID found in localStorage.");
//       setError("No user ID found. Please log in.");
//     }
//   }, []);

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleSave = async () => {
//     const id = localStorage.getItem('id');
//     try {
//       const response = await fetch(`http://localhost:3010/members/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(user),
//       });

//       if (!response.ok) {
//         console.error("Failed to save data. Status:", response.status);
//         throw new Error(`Error: ${response.status} - ${response.statusText}`);
//       }

//       const updatedUser = await response.json();
//       setUser(updatedUser);
//       setIsEditing(false);
//     } catch (error) {
//       console.error("Error saving user data:", error);
//       setError("Failed to save changes.");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('id');
//     navigate("/");
//   };

//   return (
//     <div style={styles.container}>
//       <h2>User Dashboard</h2>
//       {error && <p style={styles.error}>{error}</p>}
//       <div style={styles.card}>
//         <h3>User Details</h3>
//         <div>
//           <label style={styles.label}>Name:</label>
//           {isEditing ? (
//             <input
//               type="text"
//               value={user.Name}
//               onChange={(e) => setUser({ ...user, Name: e.target.value })}
//               style={styles.input}
//             />
//           ) : (
//             <span>{user.Name}</span>
//           )}
//         </div>
//         <div>
//           <label style={styles.label}>Email:</label>
//           {isEditing ? (
//             <input
//               type="email"
//               value={user.Email}
//               onChange={(e) => setUser({ ...user, Email: e.target.value })}
//               style={styles.input}
//             />
//           ) : (
//             <span>{user.Email}</span>
//           )}
//         </div>
//         <div>
//           <label style={styles.label}>Password:</label>
//           {isEditing ? (
//             <input
//               type="password"
//               value={user.Password}
//               onChange={(e) => setUser({ ...user, Password: e.target.value })}
//               style={styles.input}
//             />
//           ) : (
//             <span>{"******"}</span>
//           )}
//         </div>
//         <div>
//           <label style={styles.label}>Plan:</label>
//           <span>{user.Plan}</span>
//         </div>
//         <div style={styles.buttons}>
//           {isEditing ? (
//             <button onClick={handleSave} style={styles.button}>
//               Save
//             </button>
//           ) : (
//             <button onClick={handleEdit} style={styles.button}>
//               Edit
//             </button>
//           )}
//           <button onClick={handleLogout} style={styles.logoutButton}>
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     height: "100vh",
//     backgroundColor: "#f4f4f4",
//   },
//   card: {
//     backgroundColor: "#fff",
//     padding: "20px",
//     borderRadius: "10px",
//     boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//     width: "100%",
//     maxWidth: "400px",
//   },
//   label: {
//     display: "block",
//     fontWeight: "bold",
//     marginBottom: "5px",
//     marginTop: "15px",
//   },
//   input: {
//     width: "100%",
//     padding: "10px",
//     borderRadius: "5px",
//     border: "1px solid #ccc",
//   },
//   buttons: {
//     display: "flex",
//     justifyContent: "space-between",
//     marginTop: "20px",
//   },
//   button: {
//     padding: "10px 20px",
//     backgroundColor: "#007bff",
//     color: "white",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
//   logoutButton: {
//     padding: "10px 20px",
//     backgroundColor: "#dc3545",
//     color: "white",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
//   error: {
//     color: "red",
//     marginBottom: "20px",
//   },
// };

// export default UserDashboard;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const [user, setUser] = useState({
    Name: '',
    Email: '',
    Plan: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  console.log(id)

  useEffect(() => {
    // Fetch user details from backend
    fetch(`http://localhost:3010/members/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        return response.json();
      })
      .then((data) => setUser(data))
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setError('Failed to load user details.');
      });
  }, [id]);
  
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3010/members/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error('Failed to save changes');
      }

      const updatedUser = await response.json();
      setUser(updatedUser); // Update user state with saved data
      setIsEditing(false); // Exit editing mode
    } catch (error) {
      console.error('Error saving user data:', error);
      setError('Failed to save changes.');
    }

    window.location.reload()
  };

  const handleLogout = () => {
    localStorage.removeItem("id");
    // Add logout logic (e.g., clear session or token)
    navigate('/'); // Redirect to sign-in or home page
  };

  return (
    <div style={styles.container}>
      <h2>User Dashboard</h2>

      {error && <p style={styles.error}>{error}</p>} {/* Display error message if any */}

      <div style={styles.card}>
        <h3>User Details</h3>
        <div>
          <label style={styles.label}>Name:</label>
          {isEditing ? (
            <input
              type="text"
              value={user.Name}
              onChange={(e) => setUser({ ...user, Name: e.target.value })}
              style={styles.input}
            />
          ) : (
            <span>{user.Name}</span>
          )}
        </div>
        <div>
          <label style={styles.label}>Email:</label>
          {isEditing ? (
            <input
              type="email"
              value={user.Email}
              onChange={(e) => setUser({ ...user, Email: e.target.value })}
              style={styles.input}
            />
          ) : (
            <span>{user.Email}</span>
          )}
        </div>
        <div>
          <label style={styles.label}>Plan:</label>
          <span>{user.Plan}</span>
        </div>

        <div style={styles.buttons}>
          {isEditing ? (
            <button onClick={handleSave} style={styles.button}>
              Save
            </button>
          ) : (
            <button onClick={handleEdit} style={styles.button}>
              Edit
            </button>
          )}
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

// Inline CSS for styling
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4',
  },
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  label: {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '5px',
    marginTop: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  logoutButton: {
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: '20px',
  },
};

export default UserDashboard;
