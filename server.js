const express = require("express");

const db = require("./data/dbConfig.js");

const accountRouter = require("./resources/accountRouter");

const server = express();
server.use(express.json());
server.use("/api/accounts", accountRouter);

server.use(express.json());

module.exports = server;
