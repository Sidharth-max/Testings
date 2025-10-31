class abc{
    constructor(){
        this.name = "abc";
        this.age = 22;
    }
    display(){
        console.log(this.name);
        console.log(this.age);
    }
}
class xyz extends abc{
    constructor(){
        super(); // Call parent constructor
        this.x = 20;
    }
    cube(){
        console.log(this.x*this.x*this.x);
    }
}
let e1 = new xyz()
console.log(e1.cube());
e1.display();

// Demonstration
const obj = new xyz();
obj.display(); // Should print name and age from abc
obj.cube();