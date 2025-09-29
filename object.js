let user={
    "name":"john",
    "age":30,
    "salary":50000,

    disp:function(){
        return this.name+"---"+this.age
    },
    get dispsal(){
        return this.salary
    },
    set changesalary(newSalary){
        this.salary=newSalary
    }
}

user.changesalary = 35000
console.log(user)

// insert new key value pair
user.lastname= "smith"
console.log(user)
// update existing key value pair
user.age=31
console.log(user)
//delete key value pair
delete user.salary
console.log(user)
//access key value pair
console.log(user.name)
console.log(user["age"])
//access method
console.log(user.disp())
//access getter
console.log(user.dispsal)
//access setter
user.changesalary=60000
console.log(user.dispsal)
// for in loop

