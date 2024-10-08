// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Form, Button, Card, Container, Alert } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

// const UpdateMemberForm = () => {
//   const { id } = useParams(); // Get member ID from the URL
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     Name: "",
//     Email: "",
//     Phone: "",
//     Plan: "",
//     Password: "", // Password field added
//   });

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   // Fetch the member details by ID when the component mounts
//   useEffect(() => {
//     const fetchMember = async () => {
//       try {
//         const response = await fetch(`http://localhost:3010/members/${id}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch member data.");
//         }
//         const data = await response.json();
//         setFormData({
//           Name: data.Name,
//           Email: data.Email,
//           Phone: data.Phone,
//           Plan: data.Plan,
//           Password: "", // Keep the password empty for security
//         });
//       } catch (err) {
//         console.error("Error fetching member:", err);
//         setError("Failed to load member data.");
//       }
//     };
//     fetchMember();
//   }, [id]);

//   // Handle form field changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Handle form submission to update the member
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(`http://localhost:3010/members/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData), // Send the updated data
//       });

//       if (!response.ok) {
//         throw new Error("Failed to update member.");
//       }

//       const data = await response.json();
//       setSuccess("Member updated successfully!");
//       setError("");

//       // Optionally, navigate back to the member list page or another page
//       navigate("/members"); // Redirect after updating
//     } catch (err) {
//       console.error("Error updating member:", err);
//       setError("Error updating member.");
//       setSuccess("");
//     }
//   };

//   return (
//     <Container className="mt-5">
//       <Card
//         style={{
//           padding: "30px",
//           borderRadius: "12px",
//           boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
//         }}
//       >
//         <h2 className="text-center mb-4">Update Member</h2>

//         {/* Error & Success Alert Messages */}
//         {error && <Alert variant="danger">{error}</Alert>}
//         {success && <Alert variant="success">{success}</Alert>}

//         {/* Update Form */}
//         <Form onSubmit={handleSubmit}>
//           <Form.Group className="mb-3">
//             <Form.Label>Name</Form.Label>
//             <Form.Control
//               type="text"
//               name="Name"
//               value={formData.Name}
//               onChange={handleChange}
//               required
//               placeholder="Enter full name"
//               style={styles.input}
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Email</Form.Label>
//             <Form.Control
//               type="email"
//               name="Email"
//               value={formData.Email}
//               onChange={handleChange}
//               required
//               placeholder="Enter email address"
//               style={styles.input}
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Phone</Form.Label>
//             <Form.Control
//               type="tel"
//               name="Phone"
//               value={formData.Phone}
//               onChange={handleChange}
//               required
//               placeholder="Enter phone number"
//               style={styles.input}
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               type="password"
//               name="Password"
//               value={formData.Password}
//               onChange={handleChange}
//               placeholder="Enter new password"
//               style={styles.input}
//             />
//           </Form.Group>

//           <Form.Group className="mb-4">
//             <Form.Label>Membership Plan</Form.Label>
//             <Form.Select
//               name="Plan"
//               value={formData.Plan}
//               onChange={handleChange}
//               required
//               style={styles.input}
//             >
//               <option value="basic">Basic Plan - $299/year</option>
//               <option value="standard">Standard Plan - $499/year</option>
//               <option value="premium">Premium Plan - $699/year</option>
//             </Form.Select>
//           </Form.Group>

//           <Button
//             variant="primary"
//             type="submit"
//             className="w-100"
//             style={styles.submitButton}
//           >
//             Update Member
//           </Button>
//         </Form>
//       </Card>
//     </Container>
//   );
// };

// // Inline styles for the form
// const styles = {
//   input: {
//     borderRadius: "8px",
//     padding: "10px",
//     border: "1px solid #ddd",
//   },
//   submitButton: {
//     backgroundColor: "#007bff",
//     border: "none",
//     padding: "12px",
//     borderRadius: "8px",
//     fontSize: "16px",
//     fontWeight: "bold",
//   },
// };

// export default UpdateMemberForm;
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap"; // React-Bootstrap components
import { useNavigate, useParams } from "react-router-dom"; // to get member ID from URL and navigate after update

const UpdateMemberForm = () => {
  const { id } = useParams(); // Get member ID from the URL
  const navigate = useNavigate();
  const [members, setMembers] = useState({});

  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Plan: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // // Fetch the member details by ID when the component mounts
  // useEffect(() => {
  //   // Fetch the specific member by ID
  //   const fetchMember = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:3010/members/${id}`);
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch member data.");
  //       }
  //       const data = await response.json();
  //       setFormData({
  //         Name: data.Name,
  //         Email: data.Email,
  //         Phone: data.Phone,
  //         Plan: data.Plan,
  //       });
  //     } catch (err) {
  //       console.error("Error fetching member:", err);
  //       setError("Failed to load member data.");
  //     }
  //   };
  //   fetchMember();
  // }, [id]);

  useEffect(() => {
    fetch("http://localhost:3010/members/"+id)
      .then((response) => response.json())
      .then((data) => {
        setFormData(data);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission to update the member
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3010/members/${id}`, {
        method: "PUT", // Use PUT to update
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send the updated data
      });

      if (!response.ok) {
        throw new Error("Failed to update member.");
      }

      const data = await response.json();
      setSuccess("Member updated successfully!");
      setError("");

      // Optionally, navigate back to the member list page or another page
      navigate("/AdminDashboard"); // Redirect after updating
    } catch (err) {
      console.error("Error updating member:", err);
      setError("Error updating member.");
      setSuccess("");
    }
  };

  return (
    <Container className="mt-5">
      <Card
        style={{
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 className="text-center mb-4">Update Member</h2>

        {/* Error & Success Alert Messages */}
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        {/* Update Form */}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              required
              placeholder="Enter full name"
              style={styles.input}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              required
              placeholder="Enter email address"
              style={styles.input}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="tel"
              name="Phone"
              value={formData.Phone}
              onChange={handleChange}
              required
              placeholder="Enter phone number"
              style={styles.input}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Membership Plan</Form.Label>
            <Form.Select
              name="Plan"
              value={formData.Plan}
              onChange={handleChange}
              required
              style={styles.input}
            >
              <option value="basic">Basic Plan - $299/year</option>
              <option value="standard">Standard Plan - $499/year</option>
              <option value="premium">Premium Plan - $699/year</option>
            </Form.Select>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100"
            style={styles.submitButton}
          >
            Update Member
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

// Inline styles for the form
const styles = {
  input: {
    borderRadius: "8px",
    padding: "10px",
    border: "1px solid #ddd",
  },
  submitButton: {
    backgroundColor: "#007bff",
    border: "none",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
  },
};

export default UpdateMemberForm;
