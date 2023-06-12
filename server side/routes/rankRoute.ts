import { Router } from "express";
import { postRank } from "../controllers/rankController";
const router = Router()

router.route('/').post(postRank)

export default router;