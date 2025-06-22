import express from "express"
import { readdir, readFile } from "fs"

const app = express()
const PORT = 3000

app.use(express.json())


app.get('/files', (req, res) => {
    const filepath = `./files`

    readdir(filepath, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to read files directory' });
        }

        res.status(200).json(files);
    });
});

app.get('/files:filename',(req,res)=>{
    const filename = req.params.filename
    const filepath = `./files/${filename}`


    readFile(filepath,'utf-8',(err,data)=>{
        if(err){
            return res.status(500).json({error:'file not found'})
        }
        res.status(200).json(data)
    })
})




app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})

export default app