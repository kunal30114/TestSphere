import { dbConnnect } from "./db/index.db.js";
import dotenv from "dotenv";
import {app} from "./app.js";
dotenv.config();

dbConnnect().then(
  ()=>{

  }
).catch(
  (err)=>{
      process.exit(1);
  }
)

  app.listen(process.env.PORT , ()=>{

    console.log(`Server is listening on PORT = ${process.env.PORT}`);

  })