import express from "express";

const router = express.Router();

import {
  addSubject,
  updateSubject,
  deleteSubject,
  addStudent,
  updateStudent,
  deleteStudent,
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

export default router;
