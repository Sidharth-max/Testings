let userdata=[
    
]
const savedata = document.getElementById("name").value;
const age = document.getElementById("age").value;
const email = document.getElementById("email").value;
const salary = document.getElementById("salary").value;

let obj = {
    name: savedata,
    age: age,
    email: email,
    salary: salary
};
userdata.push(obj);
localStorage.setItem("userdata", JSON.stringify(userdata));
alert("Data added successfully!");
