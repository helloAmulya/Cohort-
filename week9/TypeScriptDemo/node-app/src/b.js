function greet(id) { }
function greet(id) { }
// function greet (id:number){}
// ^ this solely will cause error, so we can use 
greet(1);
greet("1");
// // types
// type User = {
//     firstName: string,
//     lastName: string,
//     age: number
// }
// // types cannot be used to implement the class only the interfaces can 
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
