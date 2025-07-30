"use strict";
const users = {
    "erd1": { age: 21, name: "amulya" },
    "safd": { age: 31, name: "ratna" },
};
const users1 = new Map();
users1.set('adcdds', { age: 21, name: "amulya" });
users1.set('ddgd', { age: 31, name: "ratna" });
const user = users1.get("adcdds");
console.log(user);
console.log('users1: ', users1);
