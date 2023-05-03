import express from "express";
import path from "path";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "public")));

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

app.get("/", (req, res) => {
    res.render("index");
});

io.on("connection", (socket) => {
    // emits the "user connected" event 
    socket.broadcast.emit("user connected", `${socket.id} has joined the chat`); // all *except* the sender

    socket.on("chat message", (msg) => {
        console.log("message: " + msg);
        io.emit("chat message", msg);
    });

    // emits the "user disconnected" events
    socket.on("disconnect", () => {
        io.emit("user disconnected", `${socket.id} has left the chat`); // all *including* the sender
    });
});

server.listen(3000, () => {
    console.log("listening on *:3000");
});
