import express from 'express';
import { createServer  } from "http";
import { Server, Socket } from "socket.io";
import path from "path";


import "./database";
import {routes} from "./routes";

const app = express();
app.use(express.static(path.join(__dirname, "..","public")));
app.set("views", path.join(__dirname, "..","public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine","html");

app.get("/",(req,res)=>{
  return res.render("html/client.html");
})

const http = createServer(app); //Create protocol http
const io = new Server(http) //Create protocol ws

io.on("connection", (socket: Socket)=>{
  //console.log("Se conectou", socket.id);
})

app.use(express.json());
app.use(routes);

export {http, io}
