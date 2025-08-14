const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require('bcrypt');
const members = require("./Members");
const Members = require("./Members");

const connectionString =
  "mongodb+srv://jenilp298:jenil007@cluster0.xjiue.mongodb.net/Project";

mongoose.connect(connectionString).then(() => {
  console.log("MongoDB Connected...");
  const app = express();

  // Use express built-in body parsers
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // getALL
  app.get("/members", async (req, res) => {
    res.send(await members.find());
  });

  // getById
  app.get("/members/:id", async (req, res) => {
    const {id} = req.params
    const ans = await Members.findById(id);
    res.send(ans);
  });

  // Insert
  app.post("/members", async (req, res) => {
    const stu = new members({ ...req.body });
    res.send(await stu.save());
  });

  // Delete
  app.delete("/members/:id", async (req, res) => {
    res.send(await members.findByIdAndDelete(req.params.id));
  });

  // Update
  app.put("/members/:id", async (req, res) => {
    const {Name, Phone, Email, Plan} = req.body;

    const {id} = req.params;

    console.log(id);

    const member = await Members.findByIdAndUpdate(
      id,
      {
        $set : {
          Name,
          Phone,
          Plan,
          Email
        }
      },
      {new : true}
    );

    console.log(member);

    if(!member){
      return res.status(404).send({message : "Member not found"})
    }

    return res.status(200).json({
      data : member,
      message : "Update member successfully"
    })
    // const indexToEdit = members.findIndex((stu) => stu.id == req.params.id);
    // employes[indexToEdit] = req.body;
    // res.send("employe Updated");
  });

  // signin
  app.post('/api/signin', async (req, res) => {
    const { email, password, role } = req.body;
  
    try {
      // Find the user by email and role
      const user = await Members.findOne({ Email : email });
  
      if (!user) {
        return res.status(400).json({ message: 'User not found', success : false });
      }
  
      // Compare the password
      const isMatch = password === user.Password;

      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials', success : false });
      }
  
      return res.status(200).json({ message: 'Login successful', success : true, data : user });
    } catch (error) {
      return res.status(500).json({ message: 'Server error', success : false });
    }
  });

  app.listen(3010, () => {
    console.log("Server started at 3010");
  });
});

//module.exports = mongoose.model('member', schema,'Members')