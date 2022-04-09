import express from "express";

const router = express.Router();

import {
  addSubject,
  updateSubject,
  deleteSubject,
  addStudent,
  updateStudent,
  deleteStudent,
  addScore,
} from "../controllers/dashboard.js";
import { verifyUser } from "../utils/tokenUtils.js";

// subject routes
router.post("/addSubject/:id", verifyUser, addSubject);
router.put("/updateSubject/:id", verifyUser, updateSubject);
router.put("/removeSubject/:id", verifyUser, deleteSubject);

// student routes
router.post("/addStudent/:id", verifyUser, addStudent);
router.put("/updateStudent/:id", verifyUser, updateStudent);
router.put("/removeStudent/:id", verifyUser, deleteStudent);

// score routes
router.put("/addScore/:userId/:studentId", verifyUser, addScore);

export default router;
