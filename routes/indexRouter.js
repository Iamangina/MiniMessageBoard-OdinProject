const { Router } = require("express");

const router = Router();

const today = new Date();

const messages = [
  {
    text: "Hi there!",
    user: "Angina",
    added: today.toLocaleDateString('en-En')
  },
  {
    text: "Welcome to my mini message board.",
    user: "Angina",
    added: today.toLocaleDateString('en-En')
  }
];

router.get("/", (req, res) => {
  res.render("index", {
    title: "Mini Messageboard",
    messages: messages
  });
});

router.get("/new", (req, res) => {
    res.render("form", {
        messages: messages
    })
})

router.post("/new", (req, res) => {
    const {author, messageText} = req.body;
    messages.push({ text: messageText, user: author, added: today.toLocaleDateString('en-En') });
    res.redirect("/")
})

router.get("/message/:id", (req, res) => {
    const id = req.params.id;

    const message = messages[id];

    res.render("message", {message});
});

module.exports = router;
