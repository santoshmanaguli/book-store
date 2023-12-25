import express from "express";
import { Book } from "../models/BookModel.js";

const route = express.Router();

//routes for getting all books from database

route.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

route.put("/:id", async (req, res) => {
  try {
    if (!req.body.title | !req.body.author | !req.body.publishYear) {
      res.status(400).send("send all the required fields");
    }
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//delete a book

route.delete("/:id", async (request, response) => {
  try {
    if (!request.params) {
      response.status(500).send("please send id");
    }

    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "not found" });
    }

    return response.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

//post api
route.post("/", async (req, res) => {
  try {
    if (!req.body.title | !req.body.author | !req.body.publishYear) {
      return res.status(500).send("Send all the required fields");
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});


export default route;