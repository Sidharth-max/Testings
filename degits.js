let no=452
let count=0
let sum=0
let m=1
while(no>0)




{
    let r = no % 10;
    no = Math.floor(no / 10);
    count++;
    sum = sum + r;
    m = m * r;
    console.log(count);
    console.log(sum);
    console.log(m);
}