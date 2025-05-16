import express from "express";
import { getEntries, saveEntries } from "../utils/fileStorage.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(getEntries());
});

router.post("/", (req, res) => {
  const entries = getEntries();
  const newEntry = { ...req.body, id: Date.now() };
  entries.push(newEntry);
  saveEntries(entries);
  res.status(201).json(newEntry);
});

router.put("/:id", (req, res) => {
  const entries = getEntries();
  const updated = entries.map((e) =>
    e.id == req.params.id ? { ...e, ...req.body } : e
  );
  saveEntries(updated);
  res.json({ message: "Updated" });
});

router.delete("/:id", (req, res) => {
  const filtered = getEntries().filter((e) => e.id != req.params.id);
  saveEntries(filtered);
  res.json({ message: "Deleted" });
});

export default router;
