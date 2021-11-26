import { createConnection } from "./index.js";

async function showAllBooks(filter) {
  const client = await createConnection();

  const books = await client
    .db("Books")
    .collection("booklist")
    .find(filter)
    .toArray();
  return books;
}

async function findBooksById(id) {
  const client = await createConnection();

  const book = await client
    .db("Books")
    .collection("booklist")
    .findOne({ id: id });
  return book;
}

async function addBooks(data) {
  const client = await createConnection();

  const addedbook = await client
    .db("Books")
    .collection("booklist")
    .insertMany(data);
  return addedbook;
}

async function editBook(name, req) {
  const client = await createConnection();

  const editbook = await client
    .db("Books")
    .collection("booklist")
    .updateOne({ name: name }, { $set: req.body });
  return editbook;
}

async function deleteBook(id) {
  const client = await createConnection();

  const book = await client
    .db("Books")
    .collection("booklist")
    .deleteOne({ id: id });
  return book;
}

export { showAllBooks, findBooksById, addBooks, editBook, deleteBook };
