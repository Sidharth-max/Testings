let no=4522
let count=0
let sum=0
let m=1
while(no>0)




{
    let r = no % 100;
    no = Math.floor(no / 100);
    count++;
    sum = sum + r;
    m = m * r;
    console.log(count);
    console.log(sum);
    console.log(m);
}
