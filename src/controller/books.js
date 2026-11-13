import { getAllBooks, getBookById, CreateBook, UpdateBookById, RemoveBookById} from '../models/books.js';

const GetBooksHandler = async(req,res) => {
    try {
        const bookList = await getAllBooks();
        return res.status(200).json(bookList);

    } catch (error) {
        console.error('GET /books failed:', error.message);
        return res.status(500).json({message: 'Internal Server Error'});
    }
};

const GetBookByIdHandler = async(req,res) => {
    const bookId = req.params.id;

    try {
        const book = await getBookById(bookId);
        
        if (!book) {
        return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(200).json(book);

    } catch (error) {
        console.error('GET /book/:id failed:', error.message);
        return res.status(500).json({message: 'Internal server error'});
    }
};

const PostBookHandler = async(req,res) => {
    const bookId = req.params.id;

    try {

        
        //book.forEach(field => { //checks if ANY fields are empty, including authorId
        //    if (field.name === null || "") {
        //        return res.status(400).json({message: 'required field is missing or authorId already exists'});
        //    }
        //});
        //test-values for CreateBook = "b4","a4","test-book","1990-08-21"

        const book = await CreateBook("b4","a4","test-book","1990-08-21");
        return res.status(201).json(book);

    } catch (error) {
        console.error('POST /books failed:', error.message);
        return res.status(500).json({message: 'Internal server error'});
    }
};

const PutBookByIdHandler = async(req,res) => {
    const bookId = req.params.id;

    try {
        const book = await getBookById(bookId);
        
        if (!book) {
        return res.status(404).json({ message: 'Book not found' });
        }

        //book.forEach(field => { //checks if ANY fields are empty, including authorId
        //    if (field.name === null || "") {
        //        return res.status(400).json({message: 'required field is missing or authorId already exists'});
        //    }
        //});

        const updateOp = await UpdateBookById("b4","a4","test-book","1990-09-23");
        return res.status(200).json(book);

    } catch (error) {
        console.error('PUT /book/:id failed:', error.message);
        return res.status(500).json({message: 'Internal server error'});
    }
};

const DeleteBookByIdHandler = async(req,res) => {
    const bookId = req.params.id;

    try {
        const book = await getBookById(bookId);
        
        if (!book) {
        return res.status(404).json({ message: 'Book not found' });
        }

        const removeOp = await RemoveBookById(bookId);

        if(book === removeOp) {
            return res.status(204);
        }

    } catch (error) {
        console.error('DELETE /book/:id failed:', error.message);
        return res.status(500).json({message: 'Internal server error'});
    }
};

export {GetBooksHandler, GetBookByIdHandler, PostBookHandler, PutBookByIdHandler, DeleteBookByIdHandler};