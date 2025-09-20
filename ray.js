let no=342
let rev =0
let f=no
while(no>0){
    let r=no%10
    rev=(rev*10)+r
    no=Math.floor(no/10)
}
console.log(rev)
if(rev==0){
    console.log(f+" is a palindrome")
}
else{
    console.log(f+" is not a palindrome")
}