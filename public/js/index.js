window.onload = () =>{
   initProducts()
};

async function initProducts() {
    const resp = await fetch("/products");
    const products = await resp.json();
  
    const productContainerEle = document.querySelector(".product-container");
    for (const product of products) {
      productContainerEle.innerHTML += `<div class="product card">
          <img 
          src="${product.image}"
           alt="Avatar"
           height:"400"
           width:"100%"
           
           />
          <div class="container">
            <h4><b>${product.title}</b></h4>
            <p>${product.description}</p>
          </div>
        </div>`;
    }
  }
  //1.Template
  //2.Select
  //3.From Submission

