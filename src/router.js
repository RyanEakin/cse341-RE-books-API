import express from 'express';
import { GetBookByIdHandler, GetBooksHandler } from "./controller/books.js";

const router = express.Router();

router.get('/books', GetBooksHandler);
router.get('/book/:id', GetBookByIdHandler);

export default router;