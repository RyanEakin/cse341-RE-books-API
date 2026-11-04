import { getDb } from "../db/connect.js";

const getAllBooks = async () => {
    const books = await getDb().collection('books').find({}).toArray();
    return books;
};
// moved this from server.js to collect ALL books in the database

export { getAllBooks };