/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/

class Calculator {

    constructor() {
        this.result = 0;
    }

    add(num) {
        this.result += num;
        return this.result;
    }
    sub(num) {
        this.result -= num;
        return this.result;
    }
    mult(num) {
        this.result *= num;
        return this.result;
    }
    div(num) {
        if (num === 0) {
            throw new Error("Cannot divide by zero");
        }
        this.result /= num;
        return this.result;
    }

    clear() {
        this.result = 0;
    }
    getResult() {
        return this.result;
    }

    calculate(exp) {
        try {

            const perfectExp = exp.replace(/\s+/g, ''); // using regex to remove extra spaces

            if (!/^[\d+\-*/().]+$/.test(perfectExp)) {
                // regex validation to have only suitable characters (numbers and arithmetic symbols)
                throw new Error("Invalid characters in expression");
            }


            // this.result = Function(`"use strict"; return (${perfectExp})`)(); //below also good
            this.result = eval(perfectExp);



        }
        catch {
            throw new Error("Invalid mathematical expression");

        }
    }

}

const calc = new Calculator();

calc.add(10);
console.log(calc.getResult());

calc.sub(5);
console.log(calc.getResult());

calc.mult(3);
console.log(calc.getResult());

calc.div(5);
console.log(calc.getResult());

calc.clear();
console.log(calc.getResult());

calc.calculate("10 +   2 *    (   6 - (4 + 1) / 2) + 7");
console.log(calc.getResult());

module.exports = Calculator;