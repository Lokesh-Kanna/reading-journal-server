import express from "express";

const app = express();

const PORT = 9000;

const BooksList = [
  {
    id: "0",
    name: "Rich Dad Poor Dad",
    rating: 4.1,
    author: "Robert T. Kiyosaki",
    pubyear: "1997",
    genre: ["Nonfiction, ", "Business, ", "Finance, "],
    url: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1388211242i/69571.jpg",
    summary:
      "Rich Dad Poor Dad is Robert's story of growing up with two dads — his real father and the father of his best friend, his 'rich dad' — and the ways in which both men shaped his thoughts about money and investing. The book explodes the myth that you need to earn a high income to be rich and explains the difference between working for money and having your money work for you.",
  },
  {
    id: "1",
    name: "The Immortals of Meluha",
    rating: 4.11,
    author: "Amish Tripathi",
    pubyear: "2010",
    genre: ["Fiction, ", "Myhtology, ", "Historic Fiction"],
    url: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1334659192i/7913305.jpg",
    summary:
      "1900 BC. A near perfect empire created by lord Ram and now ruled by Suryavanshis face devastating terrorist attacks from the east, the land of the Chandravanshis. The only hope for the Suryavanshis is an ancient legend: When evil reaches epic proportions, when all seems lost, when it appears that your enemies have triumphed, a hero will emerge. Is the rough-hewn Tibetan immigrant Shiva, really that hero? And does he want to be that hero at all? Drawn suddenly to his destiny, by duty as well as by love, will Shiva lead the Suryavanshi vengeance and destroy evil?",
  },
  {
    id: "2",
    name: "How to Win Friends and Influence People",
    rating: 4.21,
    author: "Dale Carnegie",
    pubyear: "1936",
    genre: ["Nonfiction, ", "Psychology, ", "Self Help, "],
    url: "https://images-na.ssl-images-amazon.com/images/I/81PQGGNul3L.jpg",
    summary:
      "Don’t criticize, condemn or complain. Give honest and sincere appreciation. Arouse in the other person an eager want. Become genuinely interested in other people. Smile. Remember the person’s name. Be a good listener. Talk in terms of the other person’s interests. Make the other person feel important. Avoid arguments. Respect other person’s opinions. If you are wrong, admit it. Begin in a friendly way. Get the other person saying, 'yes'. Let the other person talk more. Let the other person feel that the idea is his or hers. see things from the other person’s point of view. Be sympathetic. Appeal to the nobler motives. Dramatize your ideas. Throw a challenge. Begin with praise and honest appreciation. Call attention to people’s mistakes indirectly. Talk about your own mistakes before criticizing others. Ask questions instead of giving orders. Let others save face. Praise the slightest improvemen. Give the other person a fine reputation to live up to. Use encouragement. Make the other person happy about doing the thing you suggest.",
  },
  {
    id: "3",
    name: "Dracula",
    rating: 4,
    author: "Bram Stoker",
    pubyear: "1897",
    genre: ["Fiction, ", "Horror, ", "Paranormal"],
    url: "https://kbimages1-a.akamaihd.net/88a05cf1-a3b6-461b-a8f7-f0e25b06274a/353/569/90/False/dracula-bram-stoker.jpg",
    summary:
      "Dracula is a novel by Bram Stoker, published in 1897. As an epistolary novel, the narrative is related through letters, diary entries, and newspaper articles. It has no single protagonist, but opens with solicitor Jonathan Harker taking a business trip to stay at the castle of a Transylvanian noble, Count Dracula. Harker escapes the castle after discovering that Dracula is a vampire, and the Count moves to England and plagues the seaside town of Whitby. A small group, led by Abraham Van Helsing, hunt Dracula and, in the end, kill him.",
  },
];

app.get("/", (req, res) => {
  res.send("Hello Reader");
});

app.get("/booklist", (req, res) => {
  const { name } = req.query;
  const { year } = req.query;

  if (name) {
    const book = BooksList.find((bk) => bk.name === name);
    res.send(book);
    book
      ? res.send(book)
      : res.send({ message: `There are no books called ${name} in the list` });
  }

  if (year) {
    const book = BooksList.find((bk) => bk.pubyear === year);
    res.send(book);
    book
      ? res.send(book)
      : res.send({ message: `There are no books with the year ${year}` });
  }

  res.send(BooksList);
});

app.get("/booklist/:id", (req, res) => {
  const { id } = req.params;
  const book = BooksList.find((bk) => bk.id === id);
  book
    ? res.send(book)
    : res.send({ message: `There is no book with the id ${id}` });
});

app.listen(PORT, () =>
  console.log("The server has started in local host ", PORT)
);
