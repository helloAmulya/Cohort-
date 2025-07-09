

// importing and exporting
// follow ES6 syntax

// export const a = 1;
const a = 1
export default a
export const b = 2;

// then to import -> 
// import amulya, {b} from "./c.ts" ,, amulya is default and the b constant (like react)



// generics -> not complex just logical 

type Input = number | string

function firstEl<T>(arr: T[]): T {
    return arr[0]
}
const val = firstEl<string>(["amulya", "ratna"])
const val1 = firstEl<number>([3232, 354])
console.log("original arr[0] : ", val)
console.log(val.toUpperCase())
console.log(val1)


// ^ why we do this :
// function firstEl(arr: Input[]) {return arr[0]}
// just add  <T> after the function now it can accept both types 

// const value = firstEl(["amulya", "ratna", 12, 42, 2424 % 1])
// console.log(value)

// console.log(value.toUpperCase()) this will return error 
//  we can either make it as an string or number array, both type arguments cannot be passed at once, 
//  and also toUpperCase() does not exist in ts, so we cannot to this.

// we can do, <T> in the function , then specify the type like <string> or <number> after function
// const value = firstEl(["amulya", "ratna", 12, 42, 2424 % 1])




// enums -> more useful/readable, most used in express status code naming 

enum Direction {
    up,
    down,
    right,
    left

    // up = "up",
    // down = "down",
    // right= "right",
    // left = "left"
    //  if we dont want them to be printed as 0,1,2,3 means do the ts development, but the clg msg/output should be string
    // then we do the above, but if u gave any one as string u have to give it to all
    //  similarly ,(special case) we can start from 1,2.. and not 0,1.. by giving only the first one as -> up = 1 or 10 or etc.. , it will increment as given

}

// type KeyInput = "up" | "down" | "left" | "right"

// function anyFunc(keyPressed: KeyInput) {
// if (keyPressed == "up") {}
// }
// anyFunc("up")
// anyFunc("down")

function anyFunc(keyPressed: Direction) {
    if (keyPressed == Direction.up) { }
}

anyFunc(Direction.up)
anyFunc(Direction.down)





// my exploration. 
/*

type Input = number | string

function firstEl<T>(arr: T | Input[]) {

    // function firstEl(arr: Input[]) {
    // just add a <T> before the function now it can accept both types 
    return arr[0]
}

const value1 = firstEl(["amulya", "ratna", 12, 42, 2424 % 1])
console.log(value1)
// console.log(value.toUpperCase()) this will return error 
//  we can either make it as an string or number array, both type arguments cannot be passed at once, 
//  and also toUpperCase() does not exist in ts, so we cannot to this.


// we can do, <T> in the function , then specify the type like <string> or <number>
const val = firstEl<string>(["amulya"])
console.log(val.toUpperCase())
const val1 = firstEl<number>([10*3,"443223",22323])
// console.log(val1.value)
console.log(eval(val1))





function firstEl<T>(arr: T) {
    
// function firstEl(arr: Input[]) {
// just add a <T> before the function now it can accept both types 
    return arr[0]
}

const value = firstEl(["amulya", "ratna", 12, 42, 2424 % 1])
console.log(value)
// console.log(value.toUpperCase()) this will return error 
//  we can either make it as an string or number array, both type arguments cannot be passed at once, 
//  and also toUpperCase() does not exist in ts, so we cannot to this.


// we can do, <T> in the function , then specify the type like <string> or <number>
const val = firstEl<string[]>(["amulya"])
console.log(val.toUpperCase())


*/
