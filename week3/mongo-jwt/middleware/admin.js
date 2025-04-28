import pkg from 'jsonwebtoken';
const { verify } = pkg;
import { JWT_SECRET } from "../config.js";

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    const token = req.headers.authorization; // bearer token
    const words = token.split(" "); // ["Bearer", "token"]
    const jwtToken = words[1]; // token
    try {
        const decodedValue = verify(jwtToken, JWT_SECRET);
        if (decodedValue.username) {
            next();
        } else {
            res.status(403).json({
                msg: "You are not authenticated"
            })
        }
    } catch (e) {
        res.json({
            msg: "Incorrect inputs"
        })
    }

}

export default adminMiddleware;


// {
//     "title": "authAdmin course mongo",
//     "description": "somethgidnfndfdfddfgdf one",
//     "imageLink": "https://randomImage.com/",
//     "price": "200"
// }