import express from 'express'

const port = 3000;
const app = express();
app.use(express.json())

// when writing backend, we should check all the edge cases else the code will be exposed
app.post('/', function (req, res) {
    const kidneys = req.body.kidneys;
    const kidneylength = kidneys.length;
    if (!kidneys) {
        res.json({
            msg: "wrong inputs"
        })
    }
    else {
        res.send("your kidney is " + kidneylength);
    }
})



// global catches , " an error handling middleware"
// if we define here a function with 4 inputs, and any thing goes wrong, any Exception,  in the above i.e the app.get('/'....)
//  this will be called and we can handle errors here easily

app.use(function (err, req, res, next) {
    res.json({
        msg: "u mf doing naughty things here"
    })
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})