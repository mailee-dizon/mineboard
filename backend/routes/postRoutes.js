import express from "express"
import { createPost, getAllUserPosts, editPost, deletePost } from "../controllers/postController.js";

const router = express.Router();

router.post("/", createPost);
router.get("/:userId", getAllUserPosts);
router.put("/:postId", editPost);
router.delete("/:userId/:postId", deletePost);

export default router;