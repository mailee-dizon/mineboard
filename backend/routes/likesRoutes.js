import express from "express"
import { likePost, unlikePost, getUserLike } from "../controllers/likesController.js";
const router = express.Router();

router.post("/:userId/:postId", likePost);
router.delete("/:userId/:postId", unlikePost);
router.get("/:userId/:postId", getUserLike);

export default router;