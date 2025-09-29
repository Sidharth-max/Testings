let arr =[1,2,3,4,5,6,7,8,9,10]
let ans =arr.map((i,index)=>{return i*2}
)
console.log(ans)
let res =arr.filter(i => i!==0)
console.log(res)
//find - search data in array
let r =arr.find(i => i>5)
console.log(r)
//reduce - sum of array
let sum = arr.reduce((acc, curr) => acc + curr, 0);
console.log(sum);
//forEach - print each element
arr.forEach(i => console.log(i))
//some - check if any element is greater than 5
