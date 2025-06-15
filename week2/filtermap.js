// const arr = [1, 2, 3, 4, 5]
// function transform(i) {
//     return i * 2;
// }

// // const ans = arr.map(transform); 
// const ans = arr.map(val => val * 2)
// console.log(ans)

// // 1. get all input values from an Array (this can be done using map, but filter is the right way)

const narr = [2, 7, 31, 8, 77, 4, 67, 20, 5, 53, 434, 9, 978]

function getEven(n) {
    if (n % 2 === 0) {
        return true;
    }
    return false

}
console.log((narr.filter(getEven)))

