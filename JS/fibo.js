let i=1
let a =0
let b=1
let count=0

while (count < i ){
    console.log(a);
    let next=a+b
    a=b;
    b=next;
    count++
}