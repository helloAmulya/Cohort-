
/* 1. Anagram */
// function isAnagram(str1, str2) {

//     if (str1.length !== str2.length) {
//         return false;

//     }
//     return str1.split('').sort().join('') === str2.split('').sort().join('')
// }
// console.log(isAnagram('spar', 'rasp'));
// console.log(isAnagram('listen', 'lentils'))

// module.exports = isAnagram;


/* 2. Expenditure Analysis */

// function calculateTotalSpentByCategory(transactions) {

//     const categoryMap = {};

//     transactions.forEach(transaction => {
//         const { category, price } = transaction;

//         if (categoryMap[category]) {
//             categoryMap[category] += price;
//         }
//         else {
//             categoryMap[category] = price;
//         }


//     });

//     return Object.keys(categoryMap).map(category => ({
//         category: category,
//         totalSpent: categoryMap[category]
//     }));

//     // return ["category : " + transactions.category, "totalSpent : " + transactions.price];
//     // or
//     // return Object.entries(categoryMap).map(([category, totalSpent]) => ({ category, totalSpent }));



// }
// const transactions = [
//     { id: 1, timestamp: 1656076800000, price: 10, category: 'Food', itemName: 'Pizza' },
//     { id: 2, timestamp: 1656076810000, price: 15, category: 'Food', itemName: 'Burger' },
//     { id: 3, timestamp: 1656076820000, price: 20, category: 'Electronics', itemName: 'Mouse' },
//     { id: 4, timestamp: 1656076830000, price: 25, category: 'Clothing', itemName: 'T-shirt' },
//     { id: 5, timestamp: 1656076840000, price: 30, category: 'Electronics', itemName: 'Keyboard' }
// ]

// console.log(calculateTotalSpentByCategory(transactions))


/* 3. findLargestElement  */

function findLargestElement(arr) {
    if (arr.length === 0) {
        // === (triple equals) compares values and types.
        return -1;
    }
    return Math.max(...arr)
    // doing (...arr) spreads the array as individual number and then checks it

    // we simply not do sorting and return the last element because -> Sorting is O(n log n), while Math.max() is O(n). 
}

const arr = [3, 7, -5, -10, 234, 65512.3424, 0, 2];
console.log("largest element in", arr, "->", findLargestElement(arr))


/* 4. Vowel finding  */

// function countVowels(str) {
//     const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
//     let count = 0;
//     if (str.length === 0) {
//         return 0;
//     }
//     for (let char of str.toLowerCase()) {
//         if (vowels.has(char)) {
//             count++;
//         }
//     }
//     return count;

// }

// const str1 = "aMuLyA";
// console.log("Number of vowels in ", str1, "->", countVowels(str1));


/* 5. Time computation */


// function calculateTime(n) {
//     let startTime = new Date().getTime(); // Record start time in milliseconds

//     let sum = 0;
//     for (let i = 1; i <= n; i++) {
//         sum += i;
//     }

//     let endTime = new Date().getTime(); // Record end time in milliseconds

//     let timeTaken = (endTime - startTime) / 1000; // Convert milliseconds to seconds
//     return timeTaken;
// }



// or
// O(1) time complexity

// function calculateTime(n) {
//     let startTime = new Date().getTime();

//     let sum = (n * (n + 1)) / 2;

//     let endTime = new Date().getTime();

//     return (endTime - startTime) / 1000;
// }


// // Test the function
// console.log("Time taken for sum 1-100:", calculateTime(100), "seconds");
// console.log("Time taken for sum 1-100000:", calculateTime(100000), "seconds");
// console.log("Time taken for sum 1-1000000000:", calculateTime(1000000000), "seconds");

