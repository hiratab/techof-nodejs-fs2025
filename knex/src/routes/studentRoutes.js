import { Router } from "express";
import { db } from "../db/knex.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const students = await db("students").select("*");
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao buscar students" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, email, course } = req.body;
    const [id] = await db("students").insert({ name, email, course });
    const student = await db("students").where({ id }).first();
    res.status(201).json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao criar student" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name, email, course } = req.body;
    await db("students").where({ id: req.params.id }).update({ name, email, course });
    const student = await db("students").where({ id: req.params.id }).first();
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao atualizar student" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await db("students").where({ id: req.params.id }).del();
    res.json({ message: "Student removido" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao deletar student" });
  }
});

export default router;
