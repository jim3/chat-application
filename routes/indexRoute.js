import express from "express";
const router = express.Router();

// router.get("/", (req, res) => res.render("index"));

// use res.locals.io to access the io object, which is passed from index.js
router.get("/", (req, res) => {
    res.render("index");
});

router.get("/chat", (req, res) => {
    res.render("chat");
});

// router.post("/chat", (req, res) => {
//     const io = res.locals.io; // get the io object from res.locals
//     io.emit("chat message", req.body.message); // emit the event to all connected clients
    // res.redirect("/chat"); // redirect to the chat page
    // res.send("message sent");
    // res.render("chat", { message: req.body.message });
// });

export default router;
