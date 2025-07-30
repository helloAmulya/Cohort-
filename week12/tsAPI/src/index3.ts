
// type UsersAge = {
//     [key: string]: string;
// }
//  to reduce syntax, we use Record and map


// type Users  = Record <string,number>
type Users = Record<string, { age: number, name: string }>


const users: Users = {
    "erd1": { age: 21, name: "amulya" },
    "safd": { age: 31, name: "ratna" },

}
// console.log('users: ',users)

const users1 = new Map()

users1.set('adcdds', { age: 21, name: "amulya" })
users1.set('ddgd', { age: 31, name: "ratna" })

const user = users1.get("adcdds")
console.log(user)










// export const users = {
//     'erd1': {
//         id: 'erd1',
//         username: 'amulya'
//     },
//     'safd': {
//         id: 'safd',
//         username: 'ratna'
// }
//     },