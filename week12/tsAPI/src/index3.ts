
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


export type User = {
    name: string,
    age: number,
}

// const users1 = new Map() , or 
const users1 = new Map<string, User>()

users1.set('adcdds', { age: 21, name: "amulya" })
users1.set('ddgd', { age: 31, name: "ratna" })

const user = users1.get("adcdds")
console.log(user)




//  using Exclude, to exlude a value

type EventType = 'click' | 'scroll' | 'mousemove';
type ExcludeEvent = Exclude<EventType, 'scroll'>;

const handleEvent = (event: ExcludeEvent) => {
    console.log(`handling event : ${event}`)

}

handleEvent('click');










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