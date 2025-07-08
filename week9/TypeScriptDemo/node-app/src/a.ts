

// taking function as a input and returning a function

function mainFunc(fn:()=> number){
   setTimeout(fn,1000)
}
 mainFunc(function(){
    console.log("Hi there")
    return 300;
})






// function isLegal (age:number):boolean{
//     if(age>18){
// return true
//     }
//     else{
//         return false
//     }
// }

// let x = isLegal(34)


// function sum(a:number,b:number):number{
//     // ts has type Inference, but we can give it explicitly
//     // it only verify the type, not the code logic
//   return a+b
// }
// const value = sum(13,1);
// console.log(value)

// function sum(a:number,b:number){
    
//     const vol =  a+b
//     if(vol >= 34){
//         return "Hello User"
//     }
//     return "hello"+vol

// }


// const x: number = 1;
// console.log(x)

// let x1 = "harkirat"
// console.log(x1)



//  a greet function in js , convert in ts
// function greetUser() {
//     let firstname = prompt("What's your name? ");
//     console.log("Hello, " + firstname);
// }
// greetUser();

// function greetUser(firstname: string) {
//     console.log("Hello, " + firstname)

// }

// greetUser("Amulya")
