import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });


import express from 'express'
// import jwt from 'jsonwebtoken'
import bcrypt, { hash } from 'bcrypt'
import { z } from 'zod'
import mongoose from 'mongoose'

const JWTPASS = 'hardcodedPass2'

const PORT = 3002
const app = express()
app.use(express.json())

// connecting with mongoDB
mongoose.connect( `${process.env.MONGO_URI}${process.env.MONGO_DB_REV}`)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(" MongoDB connection error:", err));



// defininng the schema with zod 
const userSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    countryCode: z.number()
})

//defining the mongoDB storage of the data

const UserDB = mongoose.model('Users', {
    name: String,
    email: String,
    password: String,
    countryCode: Number,
})

app.post('/signin', async function (req, res) {
    const result = userSchema.safeParse(req.body)
    if (!result.success) {
        return res.status(400).json({ error: result.error.issues })
    }

    const { name, email, countryCode, password } = result.data

    const userExists = await UserDB.findOne({ email: email })
    if (userExists) {
        return res.status(400).json({ msg: "user already exists" })
    }

    // hashing the password, use compare to match the stored pass
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new UserDB({ name, email, countryCode, password: hashedPassword })
    await user.save();
    // no need of jwt here, useless
    // const token = jwt.sign({ email }, JWTPASS, { expiresIn: '1h' })
    res.status(200).json({
        msg: "user created successfully",
        // token: token
    })
})




app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
