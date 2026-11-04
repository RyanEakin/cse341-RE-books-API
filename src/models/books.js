import { getDb } from "../db/connect.js";

const getAllBooks = async () => {
    const books = await getDb().collection('books').find({}).toArray();
    return books;
};
// moved this from server.js to collect ALL books in the database


const getBookById = async (bookId) => {
    const book = await getDb().collection('books').findOne({ id: bookId });
    return book;
}; //this collects the book/record from the MongoDB database by it's bookId

export { getAllBooks, getBookById };