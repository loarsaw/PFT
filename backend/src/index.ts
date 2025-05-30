import express, { json, Request, Response } from "express";
import dotenv from "dotenv";
import router from './routes'
import cors from "cors"
// configures dotenv to work in your application
dotenv.config();
const app = express();
app.use(json())
app.use(cors())
const PORT = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.json({ msg: "Active" })
})

app.use("/api", router)
app.listen(PORT, () => {
  console.log("Serever running at PORT: ", PORT);
}).on("error", (error) => {
  // gracefully handle error
  throw new Error(error.message);
});