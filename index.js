import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { bookRouter } from "./routes/books.js";

dotenv.config();

const app = express();

app.use(express.json()); //Middlewere to convert all the request to JSON

app.use(cors());

const PORT = process.env.PORT || 9000;

const MONGO_URL = process.env.MONGO_URL;

export async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo DB is connected.");
  return client;
}
createConnection();

const client = await createConnection();

app.get("/", (req, res) => {
  res.send("Hello Reader");
});

app.use("/booklist", bookRouter);

app.listen(PORT, () =>
  console.log("The server has started in local host ", PORT)
);

export { client };
