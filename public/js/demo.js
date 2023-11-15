//configure form in html 
// add event listener
// get data from form
// build form object 
// fetch()-> request
// response 

window.onload =()=>{
     initStudentForm()
};

function initStudentForm(){
    const form = document.querySelector("#student-form");
    form.addEventListener("submit", async (e)=>{
     e.preventDefault();
     const form = e.target;
     const formObject ={
          name:form.name.value,
          age:+form.age.value,
     };
    const resp = await fetch("/students",{
          method:"POST",
          headers:{
               "Content-Type":"application/json",
          },
          body:JSON.stringify(formObject)
     })
     console.log(resp.status)
     // console.log(this)
     // console.log(e.target)
     //    console.log(form.name.value)
    })
}

