// const arr = [1, 2, 3, 4, 5]
// function transform(i) {
//     return i * 2;
// }

// // const ans = arr.map(transform); 
// const ans = arr.map(val => val * 2)
// console.log(ans)

// // 1. get all input values from an Array (this can be done using map, but filter is the right way)

const narr = [2, 7, 31, 4, 67, 18, 7, 343, 20,5, 53, 434, 9, 978]  


function filterLogic(n){
    if(n%2 ===0){
        return true;
    }
    else return false
}
const ans = narr.filter(filterLogic)
console.log(ans)

