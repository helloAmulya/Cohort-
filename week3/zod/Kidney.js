import express from 'express'
import { start } from 'repl';

const port = 3000
const app = express();

// middlewares
// const uname = "amulya";
// const pwd = "pass";
// const kidneyId = 1;

// function userMid(req, res, next) {
//     if (uname != 'amulya' && pwd != "pass") {
//         res.status(403).json({
//             msg: "INcorrect i/p"
//         });
//     } else {
//         next();
//     }
// }

// function kMid(req, res, next) {
//     if (kidneyId != 1 && kidneyId != 2) {
//         res.status(403).json({
//             msg: "INcorrect kidneys"
//         });
//     } else {
//         next();
//     }
// }

// app.get('/health', userMid, kMid, function (req, res) {
//     res.send("You're health is fine")
// })

// app.get('/kidney-health', userMid, kMid, function (req, res) {
//     res.send("Your kidneys are fine")
// })

let numberOfrequests = 0;
function calcReq(req, res, next) {
    /*  rate-limiting */
    numberOfrequests++;
    console.log(`Request #${numberOfrequests}`);
    next();
}

function timeofReq(req, res, next) {
    const start = Date.now();
    req.requestTime = new Date();

    res.on('finish', () => {
        const end = Date.now();
        const timetaken = end - start;
        console.log(`Incoming ${req.method} request at ${req.requestTime}`);
        console.log(`Total time taken for the request :: ${timetaken}ms`);
    });

    next();
}

// the next means the next function in the same route will work


app.use(express.json());
app.use(calcReq);
app.use(timeofReq);

// app.get('/rate-check', calcReq, function (req, res) {
//     // we can pass the calcReq or use it as a middleware directly
// });

app.get('/rate-check', function (req, res) {
    setTimeout(() => {
        res.send(`Request received at: ${req.requestTime}`);
    }, 100);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
});
