import express from 'express';
import { z } from 'zod';

const app = express();
const PORT = 3000
app.use(express.json())

//  for the zod , we define the schema 2 times, one we define , then we again give the updated body and many more time

// for this we can use type inference in the zod 


const userProfileSchema = z.object({
    name: z.string().min(1, { message: "Name cannot be empty" }),
    email: z.string().email({ message: "Invalid email" }),
    age: z.number().min(18).optional(),
})

type SchemaZodType = z.infer<typeof userProfileSchema>

app.post('/user', (req, res) => {
    const result = userProfileSchema.safeParse(req.body);
    // const updateBody = req.body

    if (!result.success) {
        res.status(411).json({
            msg: "user not added",
            errors: result.error
        });
        return
    }
    const updateBody: SchemaZodType = result.data
    res.json({
        message: "User Updated",
        data: updateBody
    })
})

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})