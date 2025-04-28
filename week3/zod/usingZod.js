import express from 'express'
import { z } from "zod"
// zod is a schema declaration and validation library

const port = 3000;
const app = express();

// we can use 'z' or 'zod'
// const schema = z.array(z.number());


const schema = z.object({
    email: z.string(),
    password: z.string().min(6), // min(6) for at least 6 letters
    country: z.literal('IN').or(z.literal('US')),
    kidneys: z.array(z.number())
})

app.use(express.json())


app.post('/', function (req, res) {
    const kidneys = req.body.kidneys;
    /*     const kidneys = req.body.kidneys ,,, this line means that from the incoming json object from the client (postman)
    and set the kidneys value to kidneys
     */
    // const response = schema.safeParse(kidneys)
    const response = schema.safeParse(req.body)
    if (!response.success) {
        res.status(411).json({
            msg: "wrong inputs"
        })
    }
    else {
        res.send({
            response
        })
    }

})


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})