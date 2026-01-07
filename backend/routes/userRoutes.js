import express from "express"
import { createUser, getByUsername, getByUserId, editUser, deleteUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/", createUser);
router.get("/:username", getByUsername);
router.get("/id/:userId", getByUserId);
router.put("/:userId", editUser);
router.delete("/:userId", deleteUser);

export default router;