//high order function
const iseven=(num)=>{
    return num%2===0;
}
const hof=(func,no)=>
{
    let res=func(no);
    if (res){
        console.log("even number");
    }
    else
    {
        console.log("odd number");
    }
}
hof(iseven,45);
hof(iseven,96);