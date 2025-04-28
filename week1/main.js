const objr = [
    {
        name: "Amulya",
        gender: "male"
    },
    {
        name: "regal",
        gender: "female"
    },
    {
        name: "kratos",
        gender: "male"
    },

]
// passing objects in an array and taking output, 
// I figured this myself

for (let i = 0; i < objr.length; i++) {
    // if (objr[i]["gender"] == "male") {
    //     console.log(objr[i]["name"])
    // } both of these do the same thing
    if (objr[i].gender == "male") {
        console.log(objr[i].name)
    }
}




function sum(num1, num2, fnTocall) {
    let result = num1 + num2;
    // displayResult(result);
    fnTocall(result);
}
// calling below two functions using a single function

function displayResult(data) {
    console.log("Result of the data is: " + data);
}
function displayResultPassive(data) {
    console.log("Sum's result is : " + data);
}

const ans1 = sum(10, 20, displayResultPassive)
