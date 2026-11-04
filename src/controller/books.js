import { getAllBooks } from '../models/books.js';

const GetBooksHandler = async(req,res) => {
    try {
        const bookList = await getAllBooks();
        return res.status(200).json(bookList);

    } catch (error) {
        console.error('GET /books failed:', error.message);
        return res.status(500).json({message: 'Internal Server Error'});
    }
};

export {GetBooksHandler};