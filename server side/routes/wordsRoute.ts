import express, { Express, Request, Response, Router } from "express";
import { getWords } from '../controllers/wordsController'
const router = Router()

router.route('/').get(getWords)

export default router;