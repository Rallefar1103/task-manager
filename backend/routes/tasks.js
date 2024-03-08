const express = require("express");
const router = express.Router();
const Task = require("../models/task");

router.post("/", async (req, res) => {
  console.log("Creating new task with title ", req.body);
  try {
    const { title, completed } = req.body;
    const newTask = new Task({
      title: title,
      completed: completed,
    });
    const savedTask = await newTask.save();
    res.status(200).send(savedTask);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/", async (req, res) => {
  console.log("Fetching all tasks!");
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:taskId", async (req, res) => {});

router.put("/:taskId", async (req, res) => {});

router.delete("/:taskId", async (req, res) => {});

module.exports = router;
