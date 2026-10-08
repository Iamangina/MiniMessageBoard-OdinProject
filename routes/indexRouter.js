const { Router } = require("express");
const db = require("../db/queries");

const router = Router();

//const today = new Date();

// const messages = [
//   {
//     text: "Hi there!",
//     user: "Angina",
//     added: today.toLocaleDateString('en-En')
//   },
//   {
//     text: "Welcome to my mini message board.",
//     user: "Angina",
//     added: today.toLocaleDateString('en-En')
//   }
// ];

router.get("/", async (req, res) => {
  const messages = await db.getAllMessages();

  res.render("index", {
    title: "Mini Messageboard",
    messages: messages
  });
});

router.get("/new", async (req, res) => {
  const messages = await db.getAllMessages();

  res.render("form", {
    messages: messages
  });
});
router.post("/new", async (req, res) => {
  const { author, messageText } = req.body;

  await db.insertMessage(author, messageText);

  res.redirect("/");
});

router.get("/message/:id", async (req, res) => {
  const { id } = req.params;

  const message = await db.getMessageById(id);

  if (!message) {
    return res.status(404).send("Message not found");
  }

  res.render("message", { message });
});

module.exports = router;
