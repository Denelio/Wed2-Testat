import express from 'express';
const router = express.Router();
import {noteController} from '../controller/noteController.js';

router.get("/", noteController.showIndex.bind(noteController));
router.get("/note", noteController.createNote.bind(noteController));
router.post("/note", noteController.createPizza.bind(noteController));
router.get("/note/:id/", noteController.showOrder.bind(noteController));
router.delete("/note/:id/", noteController.deleteOrder.bind(noteController));

export const noteRoutes = router;
