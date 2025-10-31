/*
let arr = [50,45,87,96,74];
let arr2 = [59,43,19,59,45];
// ...
let mega_arr=[...arr,...arr2,89,100,200];
console.log(mega_arr);
//destructuring
const [a,w,e,r,v] = arr;
console.log(a);
console.log(w);
console.log(e);
console.log(r);
console.log(v);
//destructuring with rest operator
const [x,y,...z] = mega_arr;
console.log(x);
console.log(y);
console.log(z);
//object destructuring
*/

let obj = {
    name: "John",
    age: 30,
    city: "New York",
    position: "CEO",
    salary: "23K",
}
const{name,salary} = obj;
console.log(name);
console.log(salary);