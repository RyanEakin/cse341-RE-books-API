import express from 'express';
import { GetBooksHandler } from "./controller/books.js";

const router = express.Router();

router.get('/books', GetBooksHandler);

export default router;