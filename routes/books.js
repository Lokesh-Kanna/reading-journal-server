import {
  showAllBooks,
  findBooksById,
  addBooks,
  editBook,
  deleteBook,
} from "../helper.js";
import express from "express";

// Steps:
// 1. use app.use in index.js to create a routing path
// 2. import router here
// 3. import other nexessary items
// 4. remove "/booklist" because we already added it as common in app.use() to avoid repetition

const router = express.Router();

//app.get has been changed to router.get and so on for outing purpose
router.get("/", async (req, res) => {
  let filter = req.query;

  if (filter.pubyear) {
    filter.pubyear = parseInt(filter.pubyear);
  }

  const books = await showAllBooks(filter);
  // async function showAllBooks(filter) {
  //   const client = await createConnection();
  //   const books = await client
  //     .db("Books")
  //     .collection("booklist")
  //     .find(filter)
  //     .toArray();
  //   return books;
  // }
  res.send(books);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const book = await findBooksById(id);

  book
    ? res.send(book)
    : res.send({ message: `There is no book with the id ${id}` });
});

router.post("/", async (req, res) => {
  const data = req.body;
  const addedbook = await addBooks(data);

  res.send(addedbook);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const book = await deleteBook(id);

  book
    ? res.send(book)
    : res.send({ message: `There is no book with the id ${id}` });
});

router.put("/", async (req, res) => {
  const { name } = req.query;

  const editbook = await editBook(name, req);

  res.send(editbook);
});

export const bookRouter = router;
