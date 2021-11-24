import express from "express";
import { MongoClient } from "mongodb";

const app = express();

app.use(express.json()); //Middlewere to convert all the request to JSON

const PORT = 9000;

const MONGO_URL =
  "mongodb+srv://LokeshKanna:book123@cluster0.60x6w.mongodb.net";

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo DB is connected.");
  return client;
  //   const testFind = await client
  //     .db("Books")
  //     .collection("booklist")
  //     .findOne({ id: "2" });
  //   console.log(testFind);
}
createConnection();

app.get("/", (req, res) => {
  res.send("Hello Reader");
});

app.get("/booklist", async (req, res) => {
  //   const { name } = req.query;
  //   const { year } = req.query;

  //   if (name) {
  //     const book = BooksList.find((bk) => bk.name === name);
  //     res.send(book);
  //     book
  //       ? res.send(book)
  //       : res.send({ message: `There are no books called ${name} in the list` });
  //   }

  //   if (year) {
  //     const book = BooksList.find((bk) => bk.pubyear === year);
  //     res.send(book);
  //     book
  //       ? res.send(book)
  //       : res.send({ message: `There are no books with the year ${year}` });
  //   }

  let filter = req.query;

  if (filter.rating) {
    filter.rating = parseInt(filter.rating);
  }
  console.log(filter);

  const client = await createConnection();

  const books = await client
    .db("Books")
    .collection("booklist")
    .find(filter)
    .toArray();
  //   console.log(books);
  res.send(books);
});

app.get("/booklist/:id", async (req, res) => {
  const { id } = req.params;
  //   const book = BooksList.find((bk) => bk.id === id);
  const client = await createConnection();

  const book = await client
    .db("Books")
    .collection("booklist")
    .findOne({ id: id });

  book
    ? res.send(book)
    : res.send({ message: `There is no book with the id ${id}` });
});

app.post("/booklist", async (req, res) => {
  const data = req.body;
  const client = await createConnection();

  const addedbook = await client
    .db("Books")
    .collection("booklist")
    .insertMany(data);

  res.send(addedbook);
});

app.listen(PORT, () =>
  console.log("The server has started in local host ", PORT)
);
