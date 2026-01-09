import express from "express"
import { follow, unfollow } from "../controllers/followersController.js";

const router = express.Router()

router.post("/:followUserId/:followerUserId", follow);
router.delete("/:followUserId/:followerUserId", unfollow);

export default router;