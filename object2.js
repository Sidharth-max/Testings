let obj={
    name:"John",
    age:30,
    city:"New York",
    salary: "500,000",
    disp:function(){
        return this.name+"---"+this.age
    },
    get getdata (){
        return this.city
    },
    set setdata (newcity){
        this.city=newcity
    },
    get getdat(){
        return this.salary
},
    set setdat (newsalary){
        this.salary=newsalary
    }
}
obj.setdata="Los Angeles"
obj.setdat="600,000"
console.log(obj)
console.log(obj.disp())
console.log(obj.getdata)
for(let key in obj){
    console.log(key+" : "+obj[key])

}
