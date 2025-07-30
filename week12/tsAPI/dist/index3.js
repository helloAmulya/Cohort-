"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users = {
    "erd1": { age: 21, name: "amulya" },
    "safd": { age: 31, name: "ratna" },
};
const users1 = new Map();
users1.set('adcdds', { age: 21, name: "amulya" });
users1.set('ddgd', { age: 31, name: "ratna" });
const user = users1.get("adcdds");
console.log(user);
const handleEvent = (event) => {
    console.log(`handling event : ${event}`);
};
handleEvent('click');
