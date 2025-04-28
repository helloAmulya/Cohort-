const request = require('supertest');
const assert = require('assert');
const express = require('express');

const port = 3000;

const app = express();
let requestCount = 0;

app.use(express.json());



// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// maintain a count of the number of requests made to the server in the global
// requestCount variable

/* 

app.use(function (req, res, next) {
    requestCount++;
    next();
})

app.get('/user', function (req, res) {
    res.status(200).json({ name: 'john' });
});

app.post('/user', function (req, res) {
    res.status(200).json({ msg: 'created dummy user' });
});

app.get('/requestCount', function (req, res) {
    res.status(200).json({ requestCount });
    console.log(requestCount)
});

*/



// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// rate limit the requests from a user to only 5 request per second
// If a user sends more than 5 requests in a single second, the server
// should block them with a 404.
// User will be sending in their user id in the header as 'user-id'
// You have been given a numberOfRequestsForUser object to start off with which
// clears every one second

/* 
let numberOfRequestsForUser = {};
setInterval(() => {
    numberOfRequestsForUser = {};
}, 1000)

app.use(function (req, res, next) {
    const userId = req.header('user-id');
    
    if (!userId) {
        return res.status(400).send("user not found");
    }
    
    if (!numberOfRequestsForUser[userId]) {
        numberOfRequestsForUser[userId] = 1;
    } else {
        numberOfRequestsForUser[userId]++;
}

if (numberOfRequestsForUser[userId] > 5) {
    return res.status(404).send('Rate limit exceeded, You are blocked.');
}

next();
});


app.get('/user', function (req, res) {
    res.status(200).json({ name: 'john' });
});

app.post('/user', function (req, res) {
    res.status(200).json({ msg: 'created dummy user' });
});

*/



let errorCount = 0;

// You have been given an express server which has a few endpoints.
// Your task is to
// 1. Ensure that if there is ever an exception, the end user sees a status code of 404
// 2. Maintain the errorCount variable whose value should go up every time there is an exception in any endpoint



app.get('/user', function (req, res) {
    throw new Error("User not found");
    res.status(200).json({ name: 'john' });
});

app.post('/user', function (req, res) {
    res.status(200).json({ msg: 'created dummy user' });
});

app.get('/errorCount', function (req, res) {
    res.status(200).json({ errorCount });
    console.log(errorCount)
});

app.use(function (err,req, res, next ) {
    errorCount++;
    res.status(404).send("u mf doing naughty things here");
})



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})