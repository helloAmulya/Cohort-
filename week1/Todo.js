/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
    constructor() {
        this.todos = [];
    }
    add(todo) {
        this.todos.push(todo);
    }

    remove(index) {
        if (index >= 0 && this.todos.length) {
            this.todos.splice(index, 1);
        }
        else {
            throw new Error("Invalid index")
        }

    }

    update(index, updatedTodo) {
        if (this.todos.length && index >= 0) {
            this.todos[index] = updatedTodo;
        }
        else {
            throw new Error("Invalid index");
        }
    }
    get(index) {
        if (this.todos.length && index >= 0) {
            return this.todos[index];
        }

        else {
            throw new Error("Invalid index");
        }
    }
    getAll() {
        return this.todos;
    }

    clear() {
        this.todos = []
    }

}

const task = new Todo();
task.add("JavaScript Revision")
task.add("Develop a landing page")
task.add("Docker Basics")
task.add("Post on twitter")
task.add("Gym")


task.update(1, "Read two books");
console.log(task.get(1));

task.remove(0);
console.log(task.getAll());

task.clear();
// console.log("Now all the todos are cleared ")
console.log(task.getAll());

export default Todo;




