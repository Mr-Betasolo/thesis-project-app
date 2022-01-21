import express from "express";
import mongoose from "mongoose";

const router = express.Router();

import {
  addSubject,
  updateSubject,
  deleteSubject,
} from "../controllers/dashboard.js";
import { verifyUser } from "../utils/tokenUtils.js";

router.post("/addSubject/:id", verifyUser, addSubject);
router.put("/updateSubject/:id", verifyUser, updateSubject);
router.put("/removeSubject/:id", verifyUser, deleteSubject);

export default router;
