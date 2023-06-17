import express from "express";
import mongoose from "mongoose";
import { WorkOut } from "./Models/workoutModel.mjs";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { User } from "./Models/userModel.mjs";
import jwt from "jsonwebtoken";
import { Auth } from "./Auth.mjs";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("/ API called");
});

dotenv.config();

const MONGODB_SERVER = process.env.MONGODB_SERVER;
const PORT = process.env.PORT || 8080;

// GET PRODUCT BY ID
app.get("/workout/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const singleWorkout = await WorkOut.findById(id);
    res.status(200).json(singleWorkout);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// GET ALL PRODUCTS
app.get("/workouts", async (req, res) => {
  try {
    const allWorkouts = await WorkOut.find();
    res.status(200).json(allWorkouts);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// POST PRODUCTS
app.post("/workout", async (req, res) => {
  try {
    const postWorkouts = await WorkOut.create(req.body);
    res.status(200).json(postWorkouts);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
});

// UPDATE PRODUCT
app.put("/workout/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const workoutUpdate = await WorkOut.findByIdAndUpdate(id, req.body);
    if (!workoutUpdate) {
      res.status(404).json(`error #404, product not found on id: ${id}`);
    }
    const updatedWorkout = await WorkOut.findById(id);
    res.status(200).json(updatedWorkout);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// DELETE A PRODUCT
app.delete("/workout/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteWorkout = await WorkOut.findByIdAndDelete(id);
    if (!deleteWorkout) {
      res.status(404).json(`error #404, product not found on id: ${id}`);
    }
    res.status(200).json(deleteWorkout);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const isUser = await User.findOne({ email });
    if (isUser) {
      console.log("same", isUser, email);
      return res.status(409).json({ error: "Email already exists" });
    } else {
      bcrypt.hash(password, 10).then((hashedPassword) => {
        const user = new User({ username, email, password: hashedPassword });
        user.save();
        return res.status(201).send({ user });
      });
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

app.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;
    User.findOne({ email })
      .then((user) => {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err || !result)
            return res.status(401).send(err || "Wrong Password");
          const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1m" }
          );
          const refreshToken = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_REFRESH_SECRET
          );
          const { password, ...restParams } = user._doc;
          return res
            .status(201)
            .send({ user: restParams, token, refreshToken });
        });
      })
      .catch((err) => {
        return res.status(404).send("User Not Found!");
      });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

app.get("/refresh", Auth, (req, res) => {
  try {
    const { user } = req;
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET
    );
    return res.status(201).send({ token });
  } catch (err) {
    return res.status(404).send("User Not Found!");
  }
});

app.get("/protected", Auth, (req, res) => {
  try {
    return res.status(201).send("Protected Routes");
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

mongoose
  .connect(MONGODB_SERVER)
  .then(() => {
    console.log("MongoDB Connected!!!");

    app.listen(PORT, () => {
      console.log(`NODE SERVER RUNNING ON PORT ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e.message);
  });
