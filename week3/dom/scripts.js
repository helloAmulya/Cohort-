let globalId = 1;


function markAsDone(todoId) {
    const parent = document.getElementById(todoId);
    parent.children[0].innerHTML = "Done";
}

function createChild(title, description, id) {
    const child = document.createElement("div");
    const firstGparent = document.createElement("div")
    const secondGparent = document.createElement("div")
    const thirdGparent = document.createElement("button")

    firstGparent.innerHTML = title;
    secondGparent.innerHTML = description;
    thirdGparent.innerHTML = "Mark as done";


    thirdGparent.setAttribute("onClick", `markAsDone(${id})`);
    child.appendChild(firstGparent);
    child.appendChild(secondGparent);
    child.appendChild(thirdGparent);
    child.setAttribute("id", id);
    return child;
}


function updateDomAcc(state) {
    const parent = document.getElementById("container");
    parent.innerHTML = "";
    for (let i = 0; i < state.length; i++) {
        const child = createChild(state[i].title, state[i].description, state[i].id);
        parent.appendChild(child);
    }

}
// updateDomAcc([{
//     title: "Todo 1",
//     description: "Description 1",
//     id: globalId++,
// },
// {
//     title: "Todo 2",
//     description: "Description 2",
//     id: globalId++,
// },

// ]);


window.setInterval(async function () {
    const res = await fetch("http://localhost:3000/todos")
    const json = await res.json();
    updateDomAcc(json.todos)
}, 5000)




function addTodo() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const parent = document.getElementById("todos");

    parent.appendChild(title, description, globalId++);
}

// function addTodo() {
//     const title = document.getElementById("title").value;
//     const description = document.getElementById("description").value;
//     const parent = document.getElementById("todos");

//     const todoElement = createChild(title, description, globalId++);
//     parent.appendChild(todoElement);
// }
