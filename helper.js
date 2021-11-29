import { client } from "./index.js";
import bcrypt from "bcrypt";

async function showAllBooks(filter) {
  const books = await client
    .db("Books")
    .collection("booklist")
    .find(filter)
    .toArray();
  return books;
}

async function findBooksById(id) {
  const book = await client
    .db("Books")
    .collection("booklist")
    .findOne({ id: id });
  return book;
}

async function addBooks(data) {
  const addedbook = await client
    .db("Books")
    .collection("booklist")
    .insertMany(data);
  return addedbook;
}

async function editBook(name, req) {
  const editbook = await client
    .db("Books")
    .collection("booklist")
    .updateOne({ name: name }, { $set: req.body });
  return editbook;
}

async function deleteBook(id) {
  const book = await client
    .db("Books")
    .collection("booklist")
    .deleteOne({ id: id });
  return book;
}

async function genPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);
  return hashedPass;
}

genPassword("password@123");

export {
  showAllBooks,
  findBooksById,
  addBooks,
  editBook,
  deleteBook,
  genPassword,
};
