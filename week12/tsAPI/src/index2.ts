
//  we can change the inside values in a array, will be allowed in ts and js but not the array itself


const a = [12, 242, 4]
a[0] = 343
console.log(a)

// to implement that nothing can be changed, no name,no value inside then we use 'readonly'

// readonly can be used to prevent updating api key

// just add a simple export in front of the type User, due to similar name declaration the typescript causes error

export type User = {
    readonly name: String;
    readonly age: number;
}
const user: User = {
    name: 'fdg',
    age: 21
}
// user.age = 22; this cannot be done now / readonly 

// const user: Readonly <User> = {
//     name: 'fdg',
//     age: 21
// } 
// we can make whole function as readonly 
