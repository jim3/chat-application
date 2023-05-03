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
    socket.on("chat message", (msg) => {
        console.log("message: " + msg);
    });
});

app.use((req, res, next) => {
    res.locals.io = io;
    next();
});

server.listen(3000, () => {
    console.log("listening on *:3000");
});

