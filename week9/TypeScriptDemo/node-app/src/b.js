//  diff b/w types and interfaces, 
// 1. types cannot be used to implement the class only the interfaces can 
// 2. types can be used for intersection/umions etc. 
// 3. array implementation etc, can be done in types only
// enums
// function example
function anyDFunc(cb1) {
    var x = cb1("12434", 2);
    return "545";
}
var result = anyDFunc(function (s, n) {
    return "Got string: ".concat(s, " and number: ").concat(n);
});
console.log(result);
function maxVal(arr) {
    for (var i = 0; i < arr.length; i++) {
        console.log(arr[i]);
    }
    //   ........
}
var t = {
    name: "amulya",
    startDate: new Date(),
    department: "arteere"
};
console.log(t);
function greet1(id) { }
function greet2(id) { }
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
