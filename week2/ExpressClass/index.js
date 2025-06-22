// // const express = require('express')
// import express from 'express';

// const app = express();
// const port = 3000;

// // function sum(n) {
// //     let num = 0;
// //     for (let i = 1; i <=n; i++) {
// //         num = num + i;
// //     }
// //     return num;
// // }



// app.get('/', function(req, res) {
//     // request 1
//     // res.send('Hello Amulya sir, fuck yeah')
//     // u can access this on your phone, just search the ipconfig / ifconfig in your window/mac and in phone paste -> yourIP:yourPort
//     // 192.xx.x.xx:3000 
//     // const n = req.query.n;
//     // const pnum = sum(n);
//     // res.send('Hello Amulya sir\n'+", High your answer is : "+ pnum);

//     throw new Error("asdsdsf")

// })
// app.listen(port, () => [
//     console.log(`Server is running on port http://localhost:${port}`)
// ])




import express from 'express'
const app = express();

const port = 3000;


const users = [{
    name: "Amulya",
    kidney: [{
        healthy: true,
        structure: 'adaptive',
    }],
    name: "John",
    kidney: [{
        healthy: false,
        structure: 'adaptive',

    }],
    name: "Doe",
    kidney: [{
        healthy: true,
        structure: 'stagnant',
    }]

}]

app.use(express.json());

app.get('/', function (req, res) {
    const userkidney = users[0].kidney;
    const TotalKidney = userkidney.length;
    let healythKidneys = 0;
    let structKid = 0;
    let unstructuredKidney = 0

    for (let i = 0; i < userkidney.length; i++) {
        if (userkidney[i].healthy) {
            healythKidneys = healythKidneys + 1;

            if(userkidney[i].structure == 'adaptive') {
                structKid = structKid + 1
            }
            else {
                unstructuredKidney = unstructuredKidney + 1;
            }
        }
    }


    const unhealtykidneys = TotalKidney - healythKidneys;

res.json({
    TotalKidney,
    healythKidneys,
    unhealtykidneys,
    structKid,
    unstructuredKidney,

})

})

app.post('/', function (req, res) {
    const isHealthy = req.body.isHealthy;
    users[0].kidney.push({
        healthy: isHealthy
    })
    res.json({
        msg: "done",
    })

})

app.put('/', function (req, res) {
    for (let i = 0; i < users[0].kidney.length; i++) {
        users[0].kidney[i].healthy = true;
    }
    res.json({})
})

// delete unhealthy kidney
app.delete('/', function (req, res) {

    let atleastOneUn = false;
    for (let i = 0; i < users[0].kidney.length; i++) {
        if (!users[0].kidney[i].healthy) {
            atleastOneUn = true;
        }
    }

    if (atleastOneUn) {
        const newKids = [];
        for (let i = 0; i < users[0].kidney.length; i++) {
            if (users[0].kidney[i].healthy) {
                newKids.push({
                    healthy: true
                })
            }

        }
        users[0].kidney = newKids;
        res.json({
            msg: "deleted "
        })
    }
    else {
        res.status(400).json({
            msg: "are u moron, all kidneys deleted",
        })
    }


})
app.listen(port, () => [
    console.log(`Server is running on port http://localhost:${port}`)
])




