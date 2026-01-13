import express from "express"
import { createBoard, saveToBoard, removeFromBoard, getBoardByName, deleteBoard } from "../controllers/boardsController.js";

const router = express.Router()

router.post("/:userId", createBoard);
router.put("/:boardId/add", saveToBoard);
router.put("/:boardId/delete", removeFromBoard);
router.get("/:boardName", getBoardByName);
router.delete("/:boardId", deleteBoard);


export default router