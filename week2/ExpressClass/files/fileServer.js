/**
 You need to create an express HTTP server in Node.js which will handle the logic of a file server.
- Use built in Node.js `fs` module
The expected API endpoints are defined below,
1. GET /files - Returns a list of files present in `./files/` directory
Response: 200 OK with an array of file names in JSON format.
Example: GET http://localhost:3000/files
2. GET /file/:filename - Returns content of given file by name
    Description: Use the filename from the request path parameter to read the file from `./files/` directory
    Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
    Example: GET http://localhost:3000/file/example.txt
- For any other route not defined in the server return 404
Testing the server - run `npm run test-fileServer` command in terminal
*/

// import express from 'express';
// import { readdir, readFile } from 'fs';

import express from 'express';
import { readdir, readFile } from 'fs';

const app = express();
const PORT = 3000;


// to get all files
app.get('/files', (req, res) => {
    readdir('./files', (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to read files directory' });
        }

        res.status(200).json(files);
    });
});

//  to get specific file data
app.get('/files/:filename', (req, res) => {
    const filename = req.params.filename
    const filepath = `./files/${filename}`

    readFile(filepath, "utf-8", (err, data) => {
        if (err) {
            return res.status(404).send('File not found');;
        }
        res.status(200).send(data);

        // if (filename.endsWith('.json')) {
        //     try {
        //         const parsed = JSON.parse(data);
        //         return res.status(200).json(parsed);
        //     } catch (error) {
        //         return res.status(500).json({ error: 'Invalid JSON file format' });

        //     }
        // }
        // else{
        //     res.status(200).json({
        //         data
        //     })
        // }

    });
});


app.use((req, res) => {
    res.status(404).send('Route not found');
});


    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });


export default app;
