//  diff b/w types and interfaces, 

// 1. types cannot be used to implement the class only the interfaces can 
// 2. types can be used for intersection/umions etc. 



// intersection
// basically we can use interfaces and types together

type Employee = {
    name: string,
    startDate: Date,
}
interface Manager {
    name: string,
    department: string,
}

type Techlead = Employee & Manager;

const t: Techlead = {
    name: "amulya",
    startDate: new Date(),
    department: "arteere"
}

console.log(t)



function greet1(id: (number | string)) { }
// or
type GreetArg = number | string;

function greet2(id: GreetArg) { }


// greet(1)
// greet("1")

// function greet (id:number){}
// ^ this solely will cause error, so we can use 



// // types
// type User = {
//     firstName: string,
//     lastName: string,
//     age: number
// }





// // implementing interfaces
// interface Person {
//     name: string;
//     age: number;
//     greet(phrase: string): void
// }



// class Employee implements Person {
//     name: string;
//     age: number;

//     constructor(n: string, a: number) {
//         this.name = n
//         this.age = a;
//     }
//     greet(phrase: string) {
//         console.log(`${phrase} ${this.name}`)
//     }
// }

// const e = new Employee("Amulya", 20)
// console.log(e.name)
