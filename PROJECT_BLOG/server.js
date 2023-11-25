import express from "express";
import router from "./router.js"; 
import dotenv from "dotenv";
import conn from "./connection.js";
import cors from "cors";
dotenv.config();

const server = express();

server.use(express.json());

server.use(express.urlencoded({ extended: true }));

server.use(cors());
server.use("/", express.static("./static"));

server.use("/api", router);


conn().then(()=>{
   server.listen(process.env.PORT, (error) => {
      if(error) {
         console.log(error);
         return;
      }
      console.log(`Server started on port http://localhost:${process.env.PORT}`);
   });

})
.catch(error=>{
   console.log(error);
})

