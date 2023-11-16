import express from "express";
// import { Request, Response } from "express";
import expressSession from "express-session";
import { converStr2Arr, readJsonfile, writeJsonfile } from "./utils";
import path from "path"
import { Product, Student } from "./models";

const app = express();

app.use(express.json())


const PRODUCT_JSON_PATH = path.join(__dirname,"data","products.json")
const STUDENT_JSON_PATH = path.join(__dirname,"data","students.json")
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

app.post("/students",async(req,res)=>{
  const {name, age} = req.body;
  const students: Student[] =await readJsonfile(STUDENT_JSON_PATH)
  students.push({
    id:(students.at(-1)?.id?? 0)+1,
    name,
    age,
  });
  await writeJsonfile(STUDENT_JSON_PATH, students);
  res.json({message:"success"})
 
})


app.use(express.static(path.join(__dirname,"public")));
const PORT = 8090;

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
}); 