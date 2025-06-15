// function calculateAr(a, b, type) {

//     if (type == "sum") {
//         return sum(a, b);
//     }

//     if (type == "sub") {
//         return sub(a, b);
//     }
// }


// function sum(a, b) {
//     return console.log(a + b);
// }
// function sub(a, b) {
//     return console.log(a - b);
// }

// const value = calculateAr(5, 10, "sum")



/*  Callback function or  higher-order functions in JavaScript. */




function greet() {
    console.log('hello ')
}
// setTimeout(greet, 2000);

// setInterval(greet, 1000) // this will keep executing the function after every 1 second (kind of inifinite loop)

function calcAt(a, b, atf) {
    const ans = atf(a, b);
    return ans;
}

function sum(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

const value = calcAt(10, 17, sub);
console.log(value)
