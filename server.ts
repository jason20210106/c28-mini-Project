import express from "express";
import { Request, Response } from "express";
import expressSession from "express-session";
import { readJsonfile } from "./utils";
import path from "path"

const app = express();
const PRODUCT_JSON_PATH = path.join(__dirname,"data","products.json")
// Add this line
app.use(
  expressSession({
    secret: "Tecky Academy teaches typescript",
    resave: true,
    saveUninitialized: true,
  })
);

declare module "express-session" {
  interface SessionData {
    name?: string;
  }
}


app.get("/products", async function (req: Request, res: Response) {
   const products = await readJsonfile(PRODUCT_JSON_PATH)
   res.json(products)
});
app.use(express.static("public"));
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
}); 