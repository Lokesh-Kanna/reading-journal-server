import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import {
  showAllBooks,
  findBooksById,
  addBooks,
  editBook,
  deleteBook,
} from "./helper.js";

dotenv.config();

const app = express();

app.use(express.json()); //Middlewere to convert all the request to JSON

const PORT = 9000;

const MONGO_URL = process.env.MONGO_URL;

export async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo DB is connected.");
  return client;
}
createConnection();

app.get("/", (req, res) => {
  res.send("Hello Reader");
});

app.get("/booklist", async (req, res) => {
  let filter = req.query;

  if (filter.pubyear) {
    filter.pubyear = parseInt(filter.pubyear);
  }

  const books = await showAllBooks(filter);
  res.send(books);
});

app.get("/booklist/:id", async (req, res) => {
  const { id } = req.params;
  const book = await findBooksById(id);

  book
    ? res.send(book)
    : res.send({ message: `There is no book with the id ${id}` });
});

app.post("/booklist", async (req, res) => {
  const data = req.body;
  const addedbook = await addBooks(data);

  res.send(addedbook);
});

app.delete("/booklist/:id", async (req, res) => {
  const { id } = req.params;
  const book = await deleteBook(id);

  book
    ? res.send(book)
    : res.send({ message: `There is no book with the id ${id}` });
});

app.put("/booklist", async (req, res) => {
  const { name } = req.query;

  const editbook = await editBook(name, req);

  res.send(editbook);
});

app.listen(PORT, () =>
  console.log("The server has started in local host ", PORT)
);
