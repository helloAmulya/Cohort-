// import { createContext, useMemo } from "react";
// import { atom, selector } from "recoil";

// export const countAtom = atom({
//     key: "countAtom",
//     default: 0
// });

// export const evenSelector = selector({
//     key: "evenSelector",
//     get: ({get}) => {
//         const count = get(countAtom);
//         return count % 2;
//     }
// });


import { createContext } from "react";
import { atom, selector } from 'recoil'

export const countAtom = atom({
    key: 'countAtom',
    default: 0
});


export const verEven = selector({
    key: 'verEven',
    get: ({ get }) => {
        const count = get(countAtom);
        return count % 2
        
    }
});






// const todoAtom = atom({
//     key:'todoAtom',
//     default:0
// });
