import express from "express";
import cors from'cors';


const server = express();
server.use(cors({
    origin:process.env.CORS_ORIGIN,
    Credential:true
}));
server.use(
    express.urlencoded({ extended: true })
);
server.use(express.json());





server.get('/', (req, res) => {
    return res.send("Server is fired successfully :---:)");
});




export  {server};