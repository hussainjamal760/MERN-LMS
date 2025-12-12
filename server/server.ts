import {app} from './app';
import { initSocketServer } from './socketServer';
require("dotenv").config();
import connectDB from './utils/db'
import {v2 as cloudinary} from 'cloudinary'
import http from "http"
const server = http.createServer(app)

initSocketServer(server);

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_SECRET_KEY
})

server.listen(process.env.PORT , ()=>{
    console.log(`Server running at PORT : ${process.env.PORT}`);
    connectDB();
}
)