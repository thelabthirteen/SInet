import express from "express";
import http from "http"
import cors from "cors"
import dotenv from "dotenv";
import path from "path";


dotenv.config();

const mainRouter = express();
const server = http.createServer(mainRouter);

mainRouter.use(cors())
mainRouter.use(express.json())
mainRouter.use(express.urlencoded({ extended: true }));

let PORT = process.env.PORT

// server.listen(PORT, () => {
//   console.log(`listening on port ${PORT}`)
// })

export default mainRouter
