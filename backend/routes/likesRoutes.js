import express from "express"
import { likePost, unlikePost } from "../controllers/likesController.js";
const router = express.Router();

router.post("/:userId/:postId", likePost);
router.delete("/:userId/:postId", unlikePost);

export default router;