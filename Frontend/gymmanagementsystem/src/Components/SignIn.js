// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

// const SignIn = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("member");
//   const navigate = useNavigate(); // Initialize useNavigate
//   const [errorMessage, setErrorMessage] = useState(""); // State for error messages

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent page refresh
//     setErrorMessage(""); // Clear previous error messages

//     if (role === "admin") {
//       // Hardcoded admin credentials
//       const adminCredentials = {
//         email: "admin@gmail.com", // hardcoded admin username
//         password: "admin123", // hardcoded admin password
//       };

//       // Check if the provided credentials match admin credentials
//       if (
//         email === adminCredentials.email &&
//         password === adminCredentials.password
//       ) {
//         navigate("/AdminDashboard");
//       } else {
//         alert("Invalid admin credentials");
//       }
//     } else {
//       try {
//         // Make an API request to the backend to verify the member's credentials
//         const response = await fetch("http://localhost:3010/api/signin", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ email, password }),
//         });

//         const data = await response.json();

//         if (response.ok && data.id) {
//           // Set user ID in local storage for future use
//           localStorage.setItem("id", data.id);
//           console.log("User ID stored in localStorage:", localStorage.getItem('id'));

//           // Redirect based on user role
//           navigate("/UserDashboard");
//         } else {
//           setErrorMessage("Invalid login credentials.");
//           alert("Login failed: No valid ID found or incorrect credentials.");
//         }
//       } catch (error) {
//         setErrorMessage("Server error. Please try again later.");
//         console.error("Error during login request:", error);
//       }
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2>Sign In</h2>
//       <form onSubmit={handleSubmit} style={styles.form}>
//         {/* Email Input */}
//         <div style={styles.inputGroup}>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             style={styles.input}
//           />
//         </div>

//         {/* Password Input */}
//         <div style={styles.inputGroup}>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             style={styles.input}
//           />
//         </div>

//         {/* Role Selection */}
//         <div style={styles.inputGroup}>
//           <label>Select Role:</label>
//           <div>
//             <label>
//               <input
//                 type="radio"
//                 value="admin"
//                 checked={role === "admin"}
//                 onChange={() => setRole("admin")}
//               />
//               Admin
//             </label>
//             <label style={styles.radioLabel}>
//               <input
//                 type="radio"
//                 value="member"
//                 checked={role === "member"}
//                 onChange={() => setRole("member")}
//               />
//               Member
//             </label>
//           </div>
//         </div>

//         {/* Submit Button */}
//         <button type="submit" style={styles.button}>
//           Sign In
//         </button>

//         {/* Error message */}
//         {errorMessage && (
//           <div style={styles.error}>
//             {errorMessage}
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };

// // Inline CSS for styling
// const styles = {
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     height: "100vh",
//     backgroundColor: "#f4f4f4",
//   },
//   form: {
//     padding: "20px",
//     borderRadius: "10px",
//     backgroundColor: "#fff",
//     boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//     maxWidth: "400px",
//     width: "100%",
//   },
//   inputGroup: {
//     marginBottom: "15px",
//   },
//   input: {
//     width: "100%",
//     padding: "10px",
//     marginTop: "5px",
//     borderRadius: "5px",
//     border: "1px solid #ccc",
//   },
//   button: {
//     width: "100%",
//     padding: "10px",
//     backgroundColor: "#007bff",
//     color: "white",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
//   radioLabel: {
//     marginLeft: "10px",
//   },
//   error: {
//     color: "red",
//     marginTop: "10px",
//   },
// };

// export default SignIn;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("member");
  const navigate = useNavigate(); // Initialize useNavigate
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    setErrorMessage(""); // Clear previous error messages
    if (role === "admin") {
      // Redirect to admin dashboard
      // Here you can hardcode the admin username and password, or make an API request
      const adminCredentials = {
        email: "admin@gmail.com", // hardcoded admin username
        password: "admin123", // hardcoded admin password
      };

      // Check if the provided username and password match admin credentials
      if (
        email === adminCredentials.email &&
        password === adminCredentials.password
      ) {
        navigate("/AdminDashboard");
      } else {
        alert();
      }
    }
    else{
      try {
        // Make an API request to the backend to verify the user's credentials
        const response = await fetch("http://localhost:3010/api/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password}),
        });
  
        const data = await response.json();

        console.log(data);
        // console.log("%c Data",data,"color : green")

        if (response.ok) {
          // Redirect based on user role
          localStorage.setItem("id" , data.data._id);
          navigate("/UserDashboard");
        } else {
          setErrorMessage(data.message); // Display error message
        }
      } catch (error) {
        setErrorMessage("Server error. Please try again later.");
      }
    }
    
  };

  return (
    <div style={styles.container}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Email Input */}
        <div style={styles.inputGroup}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        {/* Password Input */}
        <div style={styles.inputGroup}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        {/* Role Selection */}
        <div style={styles.inputGroup}>
          <label>Select Role:</label>
          <div>
            <label>
              <input
                type="radio"
                value="admin"
                checked={role === "admin"}
                onChange={() => setRole("admin")}
              />
              Admin
            </label>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                value="member"
                checked={role === "member"}
                onChange={() => setRole("member")}
              />
              Member
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" style={styles.button}>
          Sign In
        </button>

        {/* Error message */}
        {errorMessage && (
          <div style={styles.error}>
            {errorMessage}
          </div>
        )}
      </form>
    </div>
  );
};

// Inline CSS for styling
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
  },
  form: {
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    width: "100%",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  radioLabel: {
    marginLeft: "10px",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
};

export default SignIn;