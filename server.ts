import express from "express";
// import { Request, Response } from "express";
import expressSession from "express-session";
import { converStr2Arr, readJsonfile } from "./utils";
import path from "path"
import { Product } from "./models";

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

// query

app.get("/products",async function(req,res){
  let products:Product[] = await readJsonfile(PRODUCT_JSON_PATH)
  const categories = converStr2Arr(req.query.category);
  if(categories){
    products = products.filter((product)=>categories.includes(product.category))
  }
  res.json(products)
})
//parameters localhost:8080/products/1
app.get("/products/:pid",async function(req,res){
   const pid = +req.params.pid
   const products:Product[] = await readJsonfile(PRODUCT_JSON_PATH )
  // const foundProduct = products.find((product)=>product.id===pid)
  const foundProduct = products.find((product)=>product.id===pid)
  if(!foundProduct){
    res.status(400).json({message:"product not found"});
    return;
  }
  res.json({product: foundProduct})
})

app.use(express.static(path.join(__dirname,"public")));
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
}); 