import express from 'express';
const router = express.Router();
import {noteController} from '../controller/noteController.js';

router.get("/", noteController.showIndex.bind(noteController));
router.get("/note", noteController.createNote.bind(noteController));
router.post("/note", noteController.createPizza.bind(noteController));
router.get("/note/:id/", noteController.showNote.bind(noteController));
router.post("/note/:id/", noteController.updateNote.bind(noteController));

export const noteRoutes = router;
