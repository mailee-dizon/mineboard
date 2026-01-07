import express from "express"
import { createUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/", createUser);
// router.get("/:", getByUsername);
// router.put("/", editUser);
// router.delete("/", deleteUser);

export default router;